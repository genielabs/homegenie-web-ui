'use strict';
zuix.controller((cp) => {
    const EnableWebsocketStream = true;
    const ImplementedWidgets = ['Dimmer', 'Switch', 'Light', 'Siren', 'Program', 'Sensor', 'DoorWindow'];
    let eventSource;
    let webSocket;
    let moduleList = []; let groupList = []; let programsList = [];
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
        let address = '0.0.0.0';
        const cfg = cp.options().config;
        if (cfg != null && cfg.connection != null) {
            address = cfg.connection.address + ':' + cfg.connection.port;
        }
        return address;
    }

    function connect(callback) {
        apiCall('HomeAutomation.HomeGenie/Config/Modules.List', (status, mods)=>{
            if (status == 200) {
                // filter out unsupported modules
                mods.map((m) => {
                    if (ImplementedWidgets.includes(m.DeviceType)) {
                        m.adapterId = id();
                        m.DomainShort = m.Domain.substring(m.Domain.lastIndexOf('.') + 1);
                        if (m.Name == '') m.Name = m.DomainShort + ' ' + m.Address;
                        moduleList.push(m);
                        // update fields of associated HGUI module
                        m.Properties.map((p) => {
                            const moduleId = m.Domain + '/' + m.Address;
                            module = hgui.getModule(moduleId, m.adapterId);
                            if (module != null) {
                                hgui.updateModuleField(module, p.Name, p.Value, p.UpdateTime);
                            }
                        });
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
        const o = cp.options().config.connection;
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
    function control(m, command, options, callback) {
        const moduleDetailDialog = zuix.context('module-detail');
        // adapter-specific implementation
        if (command === CMD.Options.Show) {
            if (moduleDetailDialog.isOpen()) {
                moduleDetailDialog.close();
                return;
            }
            hgui.showLoader(true);
            let module = moduleList.filter((i)=>i.Domain+'/'+i.Address === m.id);
            if (module.length === 1) module = module[0];
            apiCall('HomeAutomation.HomeGenie/Automation/Programs.List', (status, res)=>{
                programsList = res;
                res.map((p) => {
                    if (p.IsEnabled && p.Features != null) {
                        for (let i = 0; i < p.Features.length; i++) {
                            const f = p.Features[i];
                            f.ForTypes = f.ForTypes.replace('|', ',');
                            f.ForDomains = f.ForDomains.replace('|', ',');
                            let matchFeature = (f.ForTypes.length === 0 || (','+f.ForTypes+',').indexOf(','+module.DeviceType+',') >= 0);
                            matchFeature = matchFeature && (f.ForDomains.length === 0 || (','+f.ForDomains+',').indexOf(','+module.Domain+',') >= 0);
                            if (matchFeature) {
                                zuix.load('adapters/homegenie/options_view', {
                                    model: {
                                        name: p.Name,
                                        description: p.Description
                                    },
                                    ready: (ctx) => {
                                        zuix.context('module-detail').addOptionsView(ctx.view());
                                    }
                                });
                                break;
                            }
                        }
                    }
                    hgui.hideLoader();
                });
                // show module options and statistics page
                zuix.context('module-detail')
                    .open(options.view);
                if (callback) callback();
            });
            return;
        }
        if (m.type === 'program') {
            const programAddress = m.id.substring(m.id.lastIndexOf('/') + 1);
            options = programAddress + '/' + options;
            apiCall('HomeAutomation.HomeGenie/Automation/' + command + '/' + options, (code, res)=>{
                cp.log.info(code, res);
                if (callback) callback();
            });
        } else {
            apiCall(m.id + '/' + command + '/' + options, (code, res)=>{
                cp.log.info(code, res);
                if (callback) callback();
            });
        }
    }
    function getBaseUrl() {
        const oc = cp.options().config.connection;
        if (oc == null) {
            // TODO: report 'connector not configured' error and exit
            return;
        }
        return 'http://' + oc.address + ':' + oc.port + '/';
    }
    function apiCall(apiMethod, callback) {
        const oc = cp.options().config.connection;
        if (oc == null) return;
        const url = getBaseUrl() + 'api/' + apiMethod;
        cp.log.info(url);
        zuix.$.ajax({
            url: url,
            beforeSend: (xhr) => {
                xhr.withCredentials = (oc.credentials === true);
            },
            success: (res) => {
                if (res != null && res !== '') res = JSON.parse(res);
                callback(200, res);
            },
            error: (err) => {
                callback(500, err);
            }
        });
    }

    function processEvent(event) {
        const moduleId = event.Domain + '/' + event.Source;
        const m = hgui.getModule(moduleId, id());
        if (m != null) {
            hgui.updateModuleField(m, event.Property, event.Value, event.UnixTimestamp);
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
