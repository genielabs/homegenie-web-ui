'use strict';
'use strict';
zuix.controller((cp) => {
    let moduleList = []; let groupList = [];
    // TODO: this is just a demo so the list is static
    //       in a normal scenario the list is built out
    //       of a webservice call or similar API
    groupList.push({
        name: 'Dashboard',
        modules: [
            { moduleId: 'light-1' },
            { moduleId: 'light-2' },
            { moduleId: 'dimmer-1' },
            { moduleId: 'dimmer-2' },
            { moduleId: 'sensor-1' },
            { moduleId: 'scenario-1' }
        ]
    });
    moduleList.push({
        id: 'light-1',
        name: 'Bedroom',
        type: 'light',
        widgetId: 'components/switch'
    });
    moduleList.push({
        id: 'light-2',
        name: 'Lamp',
        type: 'light',
        widgetId: 'components/switch'
    });
    moduleList.push({
        id: 'dimmer-1',
        name: 'Sofa',
        type: 'dimmer',
        widgetId: 'components/switch'
    });
    moduleList.push({
        id: 'dimmer-2',
        name: 'Kitchen',
        type: 'dimmer',
        widgetId: 'components/switch'
    });
    moduleList.push({
        id: 'sensor-1',
        name: 'Multi-sensor',
        type: 'sensor',
        widgetId: 'components/switch'
    });
    moduleList.push({
        id: 'scenario-1',
        name: 'Scenario Arm Away',
        type: 'program',
        widgetId: 'components/program'
    });
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
        if (callback) callback(200);
    }
    function control(m, command, options, callback) {
        // adapter-specific implementation
        console.log(m, command, options, callback);
        if (callback) callback();
    }

    function processEvent(event) {
        const moduleId = event.Domain + '/' + event.Source;
        const m = hgui.getModule(moduleId, id());
        if (m != null) {
            hgui.updateModule(m, event.Property, event.Value, event.UnixTimestamp);
        }
    }
});
