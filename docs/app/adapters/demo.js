'use strict';
zuix.controller((cp) => {
    const modules = [];
    // TODO: this is just a demo so the list is static
    //       in a normal scenario the list is built out
    //       of a webservice call or similar API
    modules['HomeAutomation.X10/A1'] = {
        Domain: 'HomeAutomation.X10',
        Address: 'A1',
        Name: 'Bedroom',
        DeviceType: 'Light'
    };
    modules['HomeAutomation.X10/A2'] = {
        Domain: 'HomeAutomation.X10',
        Address: 'A2',
        Name: 'Lamp',
        DeviceType: 'Light'
    };
    modules['HomeAutomation.X10/A3'] = {
        Domain: 'HomeAutomation.X10',
        Address: 'A3',
        Name: 'Sofa',
        DeviceType: 'Dimmer'
    };
    modules['HomeAutomation.ZWave/1'] = {
        Domain: 'HomeAutomation.ZWave',
        Address: '1',
        Name: 'Kitchen 1',
        DeviceType: 'Dimmer'
    };
    modules['HomeAutomation.ZWave/2'] = {
        Domain: 'HomeAutomation.ZWave',
        Address: '2',
        Name: 'Kitchen 2',
        DeviceType: 'Dimmer'
    };
    // this method is called when the component is ready
    cp.create = function() {
        // expose public methods
        cp.expose('getWidget', (moduleId, options)=>{
            const m = modules[moduleId];
            // return null if no module with the given `moduleId` is found
            if (m == null) return m;
            // create widget if not already present
            if (m.widget == null)
            {
                const widgetId = getWidgetIdFor(m);
                const options = {
                    lazyLoad: true,
                    // data-bind model to view fields
                    model: {
                        title: m.Name
                    },
                    // this gets called from the widget when a command is performed
                    control: (command)=>{
                        // adapter-specific implementation
                        control(m, command);
                    }
                };
                // call global function `addWidget` to create a new widget
                m.widget = addWidget(widgetId, options);
            }
            return m.widget;
        });
    };
    // private members
    function control(m, command, options) {
        cp.log.info('demo', m, command, options);
    }
    function getWidgetIdFor(module) {
        // TODO: return different widget path based on DeviceType and Widget.DisplayModule
        return 'components/switch';
    }
});
