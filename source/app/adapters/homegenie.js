'use strict';
zuix.controller((cp) => {
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods
        cp.expose('getWidget', getWidget);
    };

    // private members

    const modules = [];
    // TODO: this static list is for test-only purposes
    //       the actual modules list should be fetched
    //       via API call `HomeAutomation.HomeGenie/Config/Modules.List`
    modules['HomeAutomation.X10/C7'] = {
        Domain: 'HomeAutomation.X10',
        Address: 'C7',
        Name: 'Bedroom',
        DeviceType: 'Light'
    };
    modules['HomeAutomation.ZWave/4'] = {
        Domain: 'HomeAutomation.ZWave',
        Address: '4',
        Name: 'Soggiorno',
        DeviceType: 'Dimmer'
    };

    function getWidget(groupId, moduleId, options) {
        const m = modules[moduleId];
        // return null if no module with the given `moduleId` is found
        if (m == null) return m;
        if (m.widget == null) m.widget = [];
        // create widget if not already present
        if (m.widget[groupId] == null) {
            const widgetId = getWidgetIdFor(m);
            const options = {
                lazyLoad: true,
                // data-bind model to view fields
                model: {
                    title: m.Name
                },
                // this gets called from the widget when a command is performed
                control: (command)=>{
                    // bind to module `m`
                    control(m, command);
                }
            };
            // call global function `addWidget` to create a new widget
            m.widget[groupId] = addWidget(widgetId, options);
        }
        return m.widget[groupId];
    }
    function getWidgetIdFor(module) {
        // TODO: return different widget path based on DeviceType and Widget.DisplayModule
        return 'components/switch';
    }

    function control(m, command, options) {
        // adapter-specific implementation
        apiCall(m.Domain + '/' + m.Address + '/' + command + '/' + options, (code, res)=>{
            cp.log.info(code, res);
        });
    }
    function apiCall(apiMethod, callback) {
        const oc = cp.options().connection;
        if (oc == null) {
            // TODO: report 'connector not configured' error and exit
            return;
        }
        const serverAddress = 'http://' + oc.address + ':' + oc.port + '/';
        const url = serverAddress + 'api/' + apiMethod;
        cp.log.info(url);
        zuix.$.ajax({
            url: url,
            username: oc.username,
            password: oc.password,
            success: function(res) {
                callback(200, res);
            },
            error: function(err) {
                callback(500, err);
            }
        });
    }

    /**
     * Test method for Module object.
     * @param item {Module}
     */
    function testModule(item) {
        const deviceType = item.DeviceType;
        const widgetType = item.Properties.find((item) => item.Name === 'Widget.DisplayModule');
        if (widgetType != null) {
            if (widgetType.Value === 'homegenie/generic/program') {
                // ...
            }
        }
        console.log(deviceType, (widgetType != null) ? widgetType.Value : '-');
    }
});

// Types definitions

/**
 * The `ModuleParameter` object.
 *
 * @typedef {object} ModuleParameter
 * @property {string} Name
 * @property {string} Value
 * @property {Date} UpdateTime
 */

/**
 * The `Module` object.
 *
 * @typedef {object} Module
 * @property {string} Domain
 * @property {string} Address
 * @property {string} DeviceType
 * @property {Array<ModuleParameter>} Properties
 */
