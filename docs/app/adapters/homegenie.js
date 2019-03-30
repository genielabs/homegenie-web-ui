'use strict';
zuix.controller((cp) => {
    const EnableWebsocketStream = true;
    let _eventSource; let websocket;
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods
        cp.expose('getWidget', getWidget)
          .expose('getModules', (callback)=> {
              apiCall('HomeAutomation.HomeGenie/Config/Modules.List', callback);
          }).expose('getGroups', (callback)=>{
              apiCall('HomeAutomation.HomeGenie/Config/Groups.List', callback);
          }).expose('connect', connect);
    };
    cp.destroy = ()=> {
        // TODO: disconnect/dispose objects
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
        DeviceType: 'Switch'
    };
    modules['HomeAutomation.PhilipsHue/3'] = {
        Domain: 'HomeAutomation.PhilipsHue',
        Address: '3',
        Name: 'Color Light',
        DeviceType: 'Dimmer'
    };

    function getWidget(groupId, moduleId) {
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
                    title: m.Name,
                    type: m.DeviceType
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

    function connect() {
        if (EnableWebsocketStream) {
            connectWebSocket();
        } else {
            connectEventSource();
        }
    }

    function connectWebSocket() {
        if (websocket != null) {
            websocket.onclose = null;
            websocket.onerror = null;
            websocket.close();
        }
        const o = cp.options().connection;
        apiCall('HomeAutomation.HomeGenie/Config/WebSocket.GetToken', function(code, res) {
            const r = res;
            websocket = new WebSocket('ws://' + o.address + ':8188/events?at='+r.ResponseValue);
            websocket.onopen = function(e) {
                cp.log.info('WebSocket connected.');
            };
            websocket.onclose = function(e) {
                cp.log.error('WebSocket closed.', e);
                setTimeout(connectWebSocket, 1000);
            };
            websocket.onmessage = function(e) {
                const event = JSON.parse(e.data);
                cp.log.info('WebSocket data', event);
                processEvent(event);
            };
            websocket.onerror = function(e) {
                cp.log.error('WebSocket error.', e);
                setTimeout(connectWebSocket, 1000);
            };
        });
    }

    function connectEventSource() {
        let es = _eventSource;
        if (es == null) {
            es = _eventSource = new EventSource(getBaseUrl()+'events');
        } else {
            try {
                es.close();
                es = _eventSource = null;
            } catch (e) { }
            setTimeout(connectEventSource, 1000);
            cp.log.info('Reconnecting to HomeGenie SSE on ' + getBaseUrl());
        }
        es.onopen = function(e) {
            cp.log.info('SSE connect');
        };
        es.onerror = function(e) {
            cp.log.error('SSE error');
            es.close();
            es = _eventSource = null;
            setTimeout(connectEventSource, 1000);
        };
        es.onmessage = function(e) {
            const event = JSON.parse(e.data);
            cp.log.info('SSE data', event);
            processEvent(event);
        };
    }
    function control(m, command, options) {
        // adapter-specific implementation
        apiCall(m.Domain + '/' + m.Address + '/' + command + '/' + options, (code, res)=>{
            cp.log.info(code, res);
        });
    }
    function getBaseUrl() {
        const oc = cp.options().connection;
        if (oc == null) {
            // TODO: report 'connector not configured' error and exit
            return;
        }
        return 'http://' + oc.address + ':' + oc.port + '/';
    }
    function apiCall(apiMethod, callback) {
        const oc = cp.options().connection;
        const url = getBaseUrl() + 'api/' + apiMethod;
        cp.log.info(url);
        zuix.$.ajax({
            url: url,
            // TODO: this should be auto-detected
            withCredentials: true,
            success: function(res) {
                callback(200, JSON.parse(res));
            },
            error: function(err) {
                callback(500, err);
            }
        });
    }

    function processEvent(event) {
        const m = modules[event.Domain + '/' + event.Source];
        if (m != null) {
            // update level of all widgets instances of this module
            m.widget.map((w)=>{
                const ctx = zuix.context(w);
                if (ctx == null || !ctx.isReady) return;
                if (event.Property === 'Status.Level'){
                    ctx.setLevel(event.Value);
                }
                ctx.blink();
            });
        }
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
