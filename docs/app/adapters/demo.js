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
            const currentGroup = hgui.getCurrentGroup();
            switch (m.id) {
                case 'p:lights-on':
                    currentGroup.modules.map((mr) => {
                        const mod = hgui.getModule(mr.moduleId, mr.adapterId);
                        if (mod != null && (mod.type === 'light' || mod.type === 'dimmer')) {
                            hgui.updateModuleField(mod, 'Status.Level', '1.0', new Date().getTime());
                        }
                    });
                    break;
                case 'p:lights-off':
                    currentGroup.modules.map((mr) => {
                        const mod = hgui.getModule(mr.moduleId, mr.adapterId);
                        if (mod != null && (mod.type === 'light' || mod.type === 'dimmer')) {
                            hgui.updateModuleField(mod, 'Status.Level', '0', new Date().getTime());
                        }
                    });
                    break;
            }
        } else if (m.type === 'light' || m.type === 'dimmer' || m.type === 'switch') {
            console.log(command, options);
            let args; const si = command.indexOf('/');
            if (si > 0) {
                args = command.substring(si + 1);
                command = command.substring(0, si);
            }
            console.log(command, args, options);
            switch(command) {
                case 'Control.On':
                    hgui.updateModuleField(m, 'Status.Level', 1, new Date().getTime());
                    break;
                case 'Control.Off':
                    hgui.updateModuleField(m, 'Status.Level', 0, new Date().getTime());
                    break;
                case 'Control.Level':
                    hgui.updateModuleField(m, 'Status.Level', (parseFloat(args) / 100.0), new Date().getTime());
                    break;
            }
        }
        console.log(m, command, options, callback);
        if (callback) callback();
    }

    function processEvent(event) {
        const moduleId = event.Domain + '/' + event.Source;
        const m = hgui.getModule(moduleId, id());
        if (m != null) {
            hgui.updateModuleField(m, event.Property, event.Value, event.UnixTimestamp);
        }
    }
});
