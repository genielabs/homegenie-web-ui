'use strict';

zuix.controller(function(cp) {
    cp.init = function() {
        // TODO: add 'using' parse to task/zuix-build-tools
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
    };
    cp.create = function() {
        cp.field('btn-close')
            .on('click', ()=>{
                showPage(0); // TODO: use enums instead of page numbers
            });
        cp.field('btn-connect').on('click', connect);
        // cp.field('server-address')
        //    .on('change', (e, el)=>{ });
        /*
        // populate wizard modules list
        zuix.context('module-list', (listView)=>{
            const mods = [];
            Object.keys(modules).map((k)=>{
                mods.push(modules[k]);
            });
            listView.model({
                itemList: mods,
                getItem: function(index, item) {
                    // Return the item data. Each item could also be rendered with a different template,
                    // in this case all items are using the 'card-template' which is defined
                    // inline in the same page. For further information about ZUIX templates referer
                    // to the documentation http://genielabs.github.io/zuix/#/docs .
                    return {
                        itemId: index,
                        componentId: 'pages/setup/module_item',
                        options: {
                            //lazyLoad: true,
                            controller: ()=>{},
                            className: 'container-height-80',
                            model: item // ,
                            // css: false
                        }
                    };
                }
            });
        });
        */
    };

    function connect() {
        hgui.showLoader();
        let address = cp.field('server-address').value();
        const port = address.substr(address.indexOf(':') + 1);
        address = address.substr(0, address.indexOf(':'));
        homegenieAdapter.options().connection = {
            address: address,
            port: port
        };
        homegenieAdapter.connect(()=> {
            // get modules and groups list
            homegenieAdapter.groups().map((g) => {
                // add group to HGUI
                let hguiGroup;
                if (hgui.hasGroup(g.Name)) {
                    hguiGroup = hgui.getGroup(g.Name);
                } else {
                    hguiGroup = hgui.addGroup(g.Name);
                }
                // add modules and groups to HGUI
                g.Modules.map((moduleLink) => {
                    // in HomeGenie Server group modules are just links, so we need to get the module instance from `moduleList`
                    const module = homegenieAdapter.modules().find((m) => m.Domain == moduleLink.Domain && m.Address == moduleLink.Address);
                    // if the module type is not supported it won't be found in the modules list
                    if (module == null) return;
                    const moduleId = module.Domain + '/' + module.Address;
                    const adapterId = homegenieAdapter.id();
                    let hguiModule;
                    if (hgui.hasModule(moduleId, adapterId)) {
                        // Update the hgui module
                        hguiModule = hgui.getModule(moduleId, adapterId);
                    } else {
                        hguiModule = hgui.addModule({
                            id: moduleId,
                            type: module.DeviceType,
                            name: module.Name,
                            description: module.Description,
                            adapterId: adapterId
                        });
                    }
                    hgui.addGroupModule(hguiGroup, hguiModule);
                    module.Properties.map((p) => {
                        // TODO: should check update time before updating the property
                        hgui.updateModule(hguiModule, p.Name, p.Value, p.UpdateTime);
                    });
                });
            });
            hgui.save();
            showPage(0);
            hgui.hideLoader();
        });
    }
});
