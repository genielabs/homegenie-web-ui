'use strict';
'use strict';
zuix.controller((cp) => {
    let moduleList = []; let groupList = [];
    // this interval is used to simulate device events
    // such as 'Meter.Watts' and other sensors events
    let eventGeneratorInterval;
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods required for implementing the HGUI Adapter interface
        cp.expose('id', id)
            .expose('modules', () => moduleList)
            .expose('groups', () => groupList)
            .expose('connect', connect)
            .expose('control', control);
        eventGeneratorInterval = setInterval(generateEvents, 10000);
    };
    cp.destroy = ()=> {
        // TODO: disconnect/dispose objects
        if (eventGeneratorInterval != null) {
            clearInterval(eventGeneratorInterval);
        }
    };

    // private members

    function id() {
        return 'demo-adapter';
    }

    function connect(callback) {
        const handleError = (err) => {
            if (callback) callback(500, err);
        };
        zuix.$.ajax({
            url: 'app/adapters/demo/data.modules.json',
            success: (mods) => {
                moduleList = JSON.parse(mods);
                moduleList.map((m) => {
                    m.adapterId = id();
                    // generate random stats for the last 24 hrs
                    addStatsValue(m, 'Meter.Watts', 0);
                });
                zuix.$.ajax({
                    url: 'app/adapters/demo/data.groups.json',
                    success: (grps) => {
                        groupList = JSON.parse(grps);
                        groupList.map((g) => g.modules.map((mr) => mr.adapterId = id()));
                        if (callback) callback(200);
                    },
                    error: handleError
                });
            },
            error: handleError
        });
    }
    function control(m, command, options, callback) {
        // adapter-specific implementation
        if (command === CMD.Options.Show) {
            // show module options and statistics page
            zuix.context('module-detail')
                .open(options.view);
            if (callback) callback();
            return;
        }
        if (m.type === 'program') {
            hgui.updateModuleField(m, FLD.Program.Status, 'Running', new Date().getTime());
            const currentGroup = hgui.getCurrentGroup();
            switch (m.id) {
                case 'p:lights-on':
                    currentGroup.modules.map((mr) => {
                        const mod = hgui.getModule(mr.moduleId, mr.adapterId);
                        if (mod != null && (mod.type === 'light' || mod.type === 'dimmer')) {
                            moduleOn(mod);
                        }
                    });
                    break;
                case 'p:lights-off':
                    currentGroup.modules.map((mr) => {
                        const mod = hgui.getModule(mr.moduleId, mr.adapterId);
                        if (mod != null && (mod.type === 'light' || mod.type === 'dimmer')) {
                            moduleOff(mod);
                        }
                    });
                    break;
            }
            setTimeout(
                ()=> hgui.updateModuleField(m, FLD.Program.Status, 'Idle', new Date().getTime()),
                150
            );
        } else if (m.type === 'light' || m.type === 'dimmer' || m.type === 'switch') {
            let args; const si = command.indexOf('/');
            if (si > 0) {
                args = command.substring(si + 1);
                command = command.substring(0, si);
            }
            switch (command) {
                case CMD.Control.On:
                    moduleOn(m);
                    break;
                case CMD.Control.Off:
                    moduleOff(m);
                    break;
                case CMD.Control.Level:
                    const level = (parseFloat(args) / 100.0);
                    moduleLevel(m, level);
                    break;
                case CMD.Control.Toggle:
                    moduleToggle(m);
                    break;
            }
        }
        if (command === 'GetStats') {
            // TODO:
            const module = moduleList.find((mod) => mod.id === m.id);
            if (module != null && module.stats) {
                const data = module.stats[FLD.Meter.Watts] || [];
                if (callback) callback(data);
                return;
            }
        }
        if (callback) callback();
    }

    // common device commands and events simulation

    function moduleOn(module) {
        const lastLevelField = hgui.getModuleField(module, FLD.Status.Level+'.Last');
        const lastLevel = lastLevelField != null ? lastLevelField.value : 1;
        hgui.updateModuleField(module, FLD.Status.Level, lastLevel, new Date().getTime());
    }
    function moduleOff(module) {
        hgui.updateModuleField(module, FLD.Status.Level, 0, new Date().getTime());
    }
    function moduleLevel(module, level) {
        hgui.updateModuleField(module, FLD.Status.Level, level, new Date().getTime());
        if (level > 0) {
            hgui.updateModuleField(module, FLD.Status.Level+'.Last', level, new Date().getTime());
        }
    }
    function moduleToggle(module) {
        const lastLevelField = hgui.getModuleField(module, FLD.Status.Level+'.Last');
        const lastLevel = (lastLevelField != null ? lastLevelField.value : 1);
        const levelField = hgui.getModuleField(module, FLD.Status.Level);
        if (levelField != null && levelField.value === 0) {
            hgui.updateModuleField(module, FLD.Status.Level, lastLevel, new Date().getTime());
        } else {
            hgui.updateModuleField(module, FLD.Status.Level, 0, new Date().getTime());
        }
    }

    function generateEvents() {
        moduleList.map((m) => {
            const module = hgui.getModule(m.id, id());
            if (module != null) {
                // Generate new Meter.Watts event
                let maxWatt = hgui.getModuleField(module, 'Properties.Meter.Watts.Max');
                if (maxWatt != null) {
                    maxWatt = parseFloat(maxWatt.value);
                    let level = hgui.getModuleField(module, FLD.Status.Level);
                    if (level != null) {
                        level = parseFloat(level.value);
                        const watt = (level * maxWatt) + (Math.random() * 1.5) * level;
                        hgui.updateModuleField(module, FLD.Meter.Watts, watt, new Date().getTime());
                        addStatsValue(m, FLD.Meter.Watts, watt);
                    }
                }
                // TODO: generate other sensor values
            }
        });
    }

    function addStatsValue(module, fieldName, value) {
        module.stats = module.stats || [];
        module.stats[fieldName] = module.stats[fieldName] || [];
        const stats = module.stats[fieldName];
        const now = new Date();
        if (stats.length === 0) {
            // initialize with random-generated data for last 24hrs
            let maxWatt = hgui.getModuleField(module, 'Properties.'+fieldName+'.Max');
            (maxWatt != null) ? maxWatt = parseFloat(maxWatt.value) : 0;
            // subtract 1 day to now
            let d = new Date(); d = d.setDate(d.getDate() - 1);
            const samplesCount = 200;
            let v = Math.random() * maxWatt;
            for (let i = 0; i < samplesCount; i++) {
                if (i % 20 === 0) {
                    v = Math.random() * 20;
                }
                const cd = new Date(d+(i*(1440/samplesCount)*60*1000));
                stats[i] = {x: cd.getTime(), y: (Math.random() * 1.5) + v};
            }
        }
        stats.splice(0, 1);
        stats.push({ x: now.getTime(), y: value});
    }
});
