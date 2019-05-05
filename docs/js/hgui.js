(function(window) {
    'use strict';
    function HGUI() {
        let adapters = [];
        let observers = [];
        let groups = [];
        let modules = [];
        let _configRevision;
        let currentGroup = 0;
        let listener;
        // Data persistence: PouchDB
        let db;
        const dbConfigurationId = 'hgui:configuration';
        zuix.using('script', 'js/pouchdb-7.0.0.min.js', ()=>{
            db = new PouchDB('hgui_data');
        });
        // hgui object
        const _hgui = {
            load: (callback) => {
                db.get(dbConfigurationId)
                .then((config) => {
                    if (config != null) {
                        _configRevision = config._rev;
                        groups = config.groups;
                        modules = config.modules;
                        modules.map((m) => {
                            if (listener != null) listener.onModuleAdded(m);
                        });
                        groups.map((g) => {
                            if (listener != null) listener.onGroupAdded(g);
                            g.modules.map((mr) => {
                                if (listener != null) {
                                    listener.onGroupModuleAdded(g, modules.find((m) => m.id === mr.moduleId));
                                }
                            });
                        });
                    }
                    // Connect adapters
                    config.adapters.map((ac) => {
                        _hgui.showLoader();
                        _hgui.getAdapter(ac.adapterId, ac.componentId, (adapter) => {
                            adapter.options().config = ac.config;
                            adapter.connect(()=>{
                                // TODO: implement and handle connection errors
                                _hgui.hideLoader();
                            });
                            if (listener != null) {
                                listener.onAdapterAdded(adapter);
                            }
                        });
                    });
                    callback(config);
                }).catch((err) => {
                    callback(null, err);
                });
            },
            save: () => {
                const adaptersConfig = [];
                adapters.map((adapter) => {
                    const ac = {
                        adapterId: adapter.id(),
                        componentId: adapter.componentId,
                        config: adapter.options().config
                    };
                    adaptersConfig.push(ac);
                });
                const config = {
                    _id: dbConfigurationId,
                    _rev: _configRevision,
                    groups: groups,
                    modules: modules,
                    adapters: adaptersConfig,
                    timestamp: new Date().getTime()
                };
                db.put(config).then((response)=>{
                    if (!response.ok) {
                        console.log('Error saving configuration.', response);
                        return;
                    }
                    _configRevision = response.rev;
                    console.log('Configuration saved.', _configRevision);
                });
            },
            addAdapter: (adapter) => {
                if (adapters.find((a) => a.id() === adapter.id()) != null) {
                    return false;
                }
                adapters.push(adapter);
                if (listener != null) {
                    listener.onAdapterAdded(adapter);
                }
                return true;
            },
            getAdapter: (adapterId, componentId, callback) => {
                let adapter = adapters.find((a) => a.id() === adapterId);
                if (componentId == null && callback == null) return adapter;
                // create a new instance if not found
                if (adapter == null) {
                    zuix.load(componentId, {
                        // this is a controller-only component with no view
                        view: '',
                        // add the adapter to HGUI once it is loaded and ready
                        ready: (ctx) => {
                            _hgui.addAdapter(ctx);
                            callback(ctx);
                        }
                    });
                } else callback(adapter);
            },
            getAdapters: () => adapters,
            getCurrentGroup: () => groups[currentGroup],
            setCurrentGroup: (groupIndex) => {
                currentGroup = groupIndex;
            },
            addGroup: (name) => {
                let group = _hgui.getGroup(name);
                if (group != null) return group;
                group = {};
                group.name = name;
                group.modules = [];
                groups.push(group);
                if (listener != null) {
                    listener.onGroupAdded(group);
                }
                return group;
            },
            addGroupModule: (group, m) => {
                if (group.modules.find((em) => em.moduleId === m.id) != null) {
                    // module already added
                    return false;
                }
                const moduleReference = {
                    moduleId: m.id,
                    adapterId: m.adapterId
                };
                group.modules.push(moduleReference);
                if (listener != null) {
                    listener.onGroupModuleAdded(group, m);
                }
                return true;
            },
            removeGroup: (name) => {
                const group = groups.find((g) => g.name === name);
                if (group != null) {
                    groups = groups.filter((item) => item.name !== name);
                    if (listener != null) {
                        listener.onGroupRemoved(group);
                    }
                    return true;
                }
                return false;
            },
            hasGroup: (name) => {
                return _hgui.getGroup(name) != null;
            },
            getGroup: (name) => {
                return groups.find((item) => item.name === name);
            },
            addModule: (module) => {
                const m = _hgui.getModule(module.id, module.adapterId);
                if (m != null) return m;
                modules.push(module);
                if (listener != null) {
                    listener.onModuleAdded(module);
                }
                return module;
            },
            removeModule: (module) => {
                modules = modules.filter((item) => item !== module);
                if (listener != null) {
                    listener.onModuleRemoved(module);
                }
            },
            /**
             * Check if a module exists
             * @param moduleId {string} Module unique identifier
             * @param adapter {string} Adapter identifier
             * @return {boolean}
             */
            hasModule: (moduleId, adapterId) => {
                return _hgui.getModule(moduleId, adapterId) != null;
            },
            /**
             * Get a module
             * @param moduleId {string} Module unique identifier
             * @param adapterId {string} Adapter identifier
             * @return {*}
             */
            getModule: (moduleId, adapterId) => {
                return modules.find((item) => item.id === moduleId && item.adapterId === adapterId);
            },
            getModules: () => modules,
            observeModule: (module, observer) => {
                // TODO: do not push if already present
                observers[module.id] = observers[module.id] || [];
                observers[module.id].push(observer);
            },
            getObservers: () => observers,
            getModuleField: (module, key) => {
                if (module.fields == null) return null;
                return module.fields.find((f) => f.key === key);
            },
            updateModuleField: (module, key, value, timestamp) => {
                if (module.fields == null) module.fields = [];
                let field = module.fields.find((f) => f.key === key);
                if (field != null && field.timestamp === timestamp) {
                    return;
                } else if (field == null) {
                    field = {key: key};
                    module.fields.push(field);
                }
                const old = {
                    key: field.key,
                    value: field.value,
                    timestamp: field.timestamp
                };
                field.value = value;
                field.timestamp = timestamp;
                // Signal to all observers
                if (observers[module.id]) {
                    observers[module.id].map((observer) => observer.update(field, old));
                }
            },
            setListener: (l) => listener = l,
            showLoader: (overlay) => {
                if (overlay) splashScreen.css('background', 'rgba(255,255,255,0.25)');
                else splashScreen.css('background', '');
                splashScreen.animateCss('fadeIn').show();
            },
            hideLoader: () => {
                splashScreen.animateCss('fadeOut', () => {
                    splashScreen.hide();
                });
            }
        };
        return _hgui;
    }

    if (typeof(window.hgui) === 'undefined') {
        window.hgui = new HGUI();
    }
})(window);
