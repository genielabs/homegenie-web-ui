'use strict';
'use strict';
zuix.controller((cp) => {
    let moduleList = []; let groupList = [];
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods required for implementing the HGUI Adapter interface
        cp.expose('id', id)
            .expose('modules', () => moduleList)
            .expose('groups', () => groupList)
            .expose('connect', connect)
            .expose('control', control);
    };
    cp.destroy = ()=> {
        // TODO: disconnect/dispose objects
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
                moduleList.map((m) => m.adapterId = id());
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
            console.log(command, options);
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
        if (callback) callback();
    }

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
});
