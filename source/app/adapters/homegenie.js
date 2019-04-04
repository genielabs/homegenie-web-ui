'use strict';
zuix.controller((cp) => {
    const adapterId = 'homegenie-server-adapter:1.0';
    const EnableWebsocketStream = true;
    const ImplementedWidgets = ['Dimmer', 'Switch', 'Light', 'Siren', 'Program'];
    let eventSource;
    let webSocket;
    let moduleList = []; let groupList = [];
    // this method is called when the component is ready
    cp.create = ()=> {
        // expose public methods required for implementing the HGUI Adapter interface
        cp.expose('id', () => adapterId)
          .expose('modules', () => moduleList)
          .expose('groups', () => groupList)
          .expose('connect', connect)
          .expose('control', control);
    };
    cp.destroy = ()=> {
        // TODO: disconnect/dispose objects
    };

    // private members

    function connect(callback) {
        apiCall('HomeAutomation.HomeGenie/Config/Modules.List', (status, mods)=>{
            if (status == 200) {
                // filter out unsupported modules
                mods.map((m) => {
                    if (ImplementedWidgets.includes(m.DeviceType)) {
                        m.adapterId = adapterId;
                        m.DomainShort = m.Domain.substring(m.Domain.lastIndexOf('.') + 1);
                        if (m.Name == '') m.Name = m.DomainShort + ' ' + m.Address;
                        moduleList.push(m);
                    }
                });
                apiCall('HomeAutomation.HomeGenie/Config/Groups.List', (status, groups)=>{
                    groupList = groups;
                    // finally connect to the real-time event stream
                    if (EnableWebsocketStream) {
                        connectWebSocket();
                    } else {
                        connectEventSource();
                    }
                    callback();
                });
            } else {
                callback(status);
            }
        });
    }

    function connectWebSocket() {
        if (webSocket != null) {
            webSocket.onclose = null;
            webSocket.onerror = null;
            webSocket.close();
        }
        const o = cp.options().connection;
        apiCall('HomeAutomation.HomeGenie/Config/WebSocket.GetToken', function(code, res) {
            const r = res;
            webSocket = new WebSocket('ws://' + o.address + ':8188/events?at=' + r.ResponseValue);
            webSocket.onopen = function(e) {
                cp.log.info('WebSocket connected.');
            };
            webSocket.onclose = function(e) {
                cp.log.error('WebSocket closed.', e);
                setTimeout(connectWebSocket, 1000);
            };
            webSocket.onmessage = function(e) {
                const event = JSON.parse(e.data);
                cp.log.info('WebSocket data', event);
                processEvent(event);
            };
            webSocket.onerror = function(e) {
                cp.log.error('WebSocket error.', e);
                setTimeout(connectWebSocket, 1000);
            };
        });
    }

    function connectEventSource() {
        let es = eventSource;
        if (es == null) {
            es = eventSource = new EventSource(getBaseUrl()+'events');
        } else {
            try {
                es.close();
                es = eventSource = null;
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
            es = eventSource = null;
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
        apiCall(m.id + '/' + command + '/' + options, (code, res)=>{
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
        if (oc == null) return;
        const url = getBaseUrl() + 'api/' + apiMethod;
        cp.log.info(url);
        zuix.$.ajax({
            url: url,
            beforeSend: (xhr) => {
                xhr.withCredentials = true;
            },
            success: function(res) {
                if (res != null) res = JSON.parse(res);
                callback(200, res);
            },
            error: function(err) {
                callback(500, err);
            }
        });
    }

    function processEvent(event) {
        // if (moduleList == null) return;
        // const m = moduleList[event.Domain + '/' + event.Source];
        const m = hgui.getModule(event.Domain + '/' + event.Source, adapterId);
        if (m != null) {
            hgui.updateModule(m, event.Property, event.Value, event.UnixTimestamp);
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
