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
        const credentials = cp.field('server-credentials').checked();
        const port = address.substr(address.indexOf(':') + 1);
        address = address.substr(0, address.indexOf(':'));
        // allocate HomeGenie adapter
        const adapterId = address + ':' + port;
        // Load HomeGenie adapter
        hgui.getAdapter(adapterId, 'adapters/homegenie', (homegenieAdapter) => {
            homegenieAdapter.options().config = {
                connection: {
                    address: address,
                    port: port,
                    credentials: credentials
                }
            };
            homegenieAdapter.connect(()=> {
                // get modules and groups list
                homegenieAdapter.groups().map((g) => {
                    // add group to HGUI
                    const hguiGroup = hgui.addGroup(g.Name);
                    // add modules and groups to HGUI
                    g.Modules.map((moduleLink) => {
                        // in HomeGenie Server group modules are just links, so we need to get the module instance from `moduleList`
                        const module = homegenieAdapter.modules().find((m) => m.Domain == moduleLink.Domain && m.Address == moduleLink.Address);
                        // if the module type is not supported it won't be found in the modules list
                        if (module == null) return;
                        const moduleId = module.Domain + '/' + module.Address;
                        const adapterId = homegenieAdapter.id();
                        const hguiModule = hgui.addModule({
                            id: moduleId,
                            adapterId: adapterId,
                            type: module.DeviceType.toLowerCase(),
                            name: module.Name,
                            description: module.Description,
                            fields: []
                        });
                        // Update modules fields (hgui fields = hg Properties)
                        module.Properties.map((p) => {
                            hgui.updateModuleField(hguiModule, p.Name, p.Value, p.UpdateTime);
                        });
                        hgui.addGroupModule(hguiGroup, hguiModule);
                    });
                });
                hgui.save();
                showPage(0);
                hgui.hideLoader();
            });
        });
    }
});
