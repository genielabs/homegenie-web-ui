'use strict';
zuix.controller((cp) => {
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods
        cp.expose('getWidget', getWidget);
    };

    // private members

    const modules = [];
    // TODO: this is just a demo so the list is static
    //       in a normal scenario the list is built out
    //       of a webservice call or similar API
    modules['light-1'] = {
        name: 'Bedroom',
        type: 'light',
        widgetId: 'components/switch'
    };
    modules['light-2'] = {
        name: 'Lamp',
        type: 'light',
        widgetId: 'components/switch'
    };
    modules['dimmer-1'] = {
        name: 'Sofa',
        type: 'dimmer',
        widgetId: 'components/switch'
    };
    modules['dimmer-2'] = {
        name: 'Kitchen',
        type: 'dimmer',
        widgetId: 'components/switch'
    };
    modules['sensor-1'] = {
        name: 'Multi-sensor',
        type: 'sensor',
        widgetId: 'components/switch'
    };
    modules['scenario-1'] = {
        name: 'Scenario Arm Away',
        type: 'program',
        widgetId: 'components/program'
    };

    function getWidget(groupId, moduleId, options) {
        const m = modules[moduleId];
        // return null if no module with the given `moduleId` is found
        if (m == null) return m;
        if (m._widget == null) m._widget = [];
        // create widget if not already present
        if (m._widget[groupId] == null)
        {
            const widgetId = getWidgetIdFor(m);
            const options = {
                lazyLoad: true,
                // data-bind model to view fields
                model: {
                    title: m.name
                },
                // this gets called from the widget when a command is performed
                control: (command)=>{
                    // adapter-specific implementation
                    control(m, command);
                }
            };
            // call global function `addWidget` to create a new widget
            m._widget[groupId] = addWidget(widgetId, options);
        }
        return m._widget[groupId];
    }
    function getWidgetIdFor(module) {
        return module.widgetId;
    }

    function control(m, command, options) {
        cp.log.info('demo', m, command, options);
    }
});
