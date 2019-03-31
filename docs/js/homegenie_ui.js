(function(window){
    'use strict';
    function HGUI() {
        let adapters = [];
        let groups = [];
        let modules = [];
        let listener;
        const _hgui = {
            addAdapter: (adapter) => {
                adapters[adapter.id()] = adapter;
            },
            addGroup: (name) => {
                // TODO: maybe some other useful methods can be attached to the group object
                const group = {};
                group.name = name;
                group.modules = [];
                group.putModule = (m) => {
                    const moduleReference = {
                        moduleId: m.id
                    };
                    // TODO: create widget as well
                    const options = {
                        lazyLoad: true,
                        // data-bind model to view fields
                        model: m,
                        // this gets called from the widget when a command is performed
                        control: (command)=>{
                            adapters[m.adapter].control(m, command);
                        }
                    };
                    // TODO: add utility function to get the widget from the module type
                    const widgetId = 'components/switch';
                    // call global function `addWidget` to create a new widget
                    moduleReference.widget = addWidget(widgetId, options);
                    group.modules.push(moduleReference);
                    if (listener != null) {
                        listener.onGroupModuleAdded(group, moduleReference);
                    }
                };
                groups.push(group);
                if (listener != null) {
                    listener.onGroupAdded(group);
                }
                return group;
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
                // TODO: should attach observable interface to the module before adding it
                module.fields = [];
                module.observers = [];
                module.update = (key, value, timestamp) => {
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
                    module.observers.map((observer) => observer.update(field, old));
                };
                module.observe = (o) => {
                    // TODO: do not push if already present
                    module.observers.push(o);
                };
                module.unobserve = () => { };
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
            hasModule: (moduleId, adapter) => {
                return _hgui.getModule(moduleId, adapter) != null;
            },
            /**
             * Get a module
             * @param moduleId {string} Module unique identifier
             * @param adapter {string} Adapter identifier
             * @return {*}
             */
            getModule: (moduleId, adapter) => {
                return modules.find((item) => item.id === moduleId && item.adapter === adapter);
            },
            setListener: (l) => listener = l
        };
        return _hgui;
    }
    if (typeof(window.hgui) === 'undefined'){
        window.hgui = new HGUI();
    }
})(window);
