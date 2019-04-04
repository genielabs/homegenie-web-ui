(function(window) {
    'use strict';
    function HGUI() {
        let adapters = [];
        let observers = [];
        let groups = [];
        let modules = [];
        let listener;
        const db = new PouchDB('hgui_data');
        const dbConfigurationId = 'hgui:configuration';
        const _hgui = {
            load: (callback) => {
                db.get(dbConfigurationId)
                .then((config)=>{
                    if (config != null) {
                        groups = config.groups;
                        modules = config.modules;
                        modules.map((m) => {
                            if (listener != null) listener.onModuleAdded(m);
                        });
                        groups.map((g) => {
                            if (listener != null) listener.onGroupAdded(g);
                            g.modules.map((mr)=> {
                                if (listener != null) {
                                    listener.onGroupModuleAdded(g, modules.find((m) => m.id === mr.moduleId));
                                }
                            });
                        });
                    }
                    // Connect adapters
                    config.adapters.map((ac) => {
                        if (adapters[ac.adapterId] != null) {
                            _hgui.showLoader();
                            adapters[ac.adapterId].options().connection = ac.connection;
                            adapters[ac.adapterId].connect(()=>{
                                // TODO: implement and handle connection errors
                                _hgui.hideLoader();
                            });
                        }
                    });
                    callback(config);
                }).catch((err) => {
                    callback(null, err);
                });
            },
            save: () => {
                const adaptersConfig = [];
                Object.keys(adapters).map((k) => {
                    const adapter = adapters[k];
                    const ac = {
                        adapterId: adapter.id(),
                        connection: adapter.options().connection
                    };
                    adaptersConfig.push(ac);
                });
                const config = {
                    _id: dbConfigurationId,
                    groups: groups,
                    modules: modules,
                    adapters: adaptersConfig,
                    timestamp: new Date().getTime()
                };
                db.put(config).then(()=>{
                    console.log('configuration saved');
                });
            },
            addAdapter: (adapter) => {
                adapters[adapter.id()] = adapter;
            },
            getAdapter: (adapterId) => {
                return adapters[adapterId];
            },
            addGroup: (name) => {
                const group = {};
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
                    return;
                }
                const moduleReference = {
                    moduleId: m.id
                };
                group.modules.push(moduleReference);
                if (listener != null) {
                    listener.onGroupModuleAdded(group, m);
                }
            },
            removeGroup: (name) => {
                const group = groups.find((g) => g.name === name);
                if (group != null) {
                    groups = groups.filter((item) => item.name !== name);
                    if (listener != null) {
                        listener.onGroupRemoved(group);
                    }
                }
            },
            hasGroup: (name) => {
                return _hgui.getGroup(name) != null;
            },
            getGroup: (name) => {
                return groups.find((item) => item.name === name);
            },
            addModule: (module) => {
                module.fields = [];
                modules.push(module);
                if (listener != null) {
                    listener.onModuleAdded(module);
                }
                return module;
            },
            observeModule: (module, observer) => {
                // TODO: do not push if already present
                observers[module.id] = observers[module.id] || [];
                observers[module.id].push(observer);
            },
            getObservers: () => observers,
            updateModule: (module, key, value, timestamp) => {
                if (module.fields[key] != null && module.fields[key].timestamp === timestamp) {
                    return;
                }
                let field = module.fields[key];
                const old = field;
                module.fields[key] = field = {
                    key: key,
                    value: value,
                    timestamp: timestamp
                };
                // Signal to all observers
                if (observers[module.id]) {
                    observers[module.id].map((observer) => observer.update(field, old));
                }
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
            hasModule: (moduleId, adapter) => {
                return _hgui.getModule(moduleId, adapter) != null;
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
            setListener: (l) => listener = l,
            showLoader: () => {
                console.log('show loader');
                splashScreen.animateCss('fadeIn').show();
            },
            hideLoader: () => {
                console.log('hide loader');
                splashScreen.animateCss('fadeOut', {delay: '.5s'}, () => {
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
