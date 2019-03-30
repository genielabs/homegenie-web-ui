'use strict';

zuix.controller(function(cp) {
    cp.init = function() {
        // TODO: add 'using' parse to task/zuix-build-tools
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
    };
    cp.create = function() {
        console.log('created!');
        cp.field('btn-close')
            .on('click', ()=>{
                showPage(0); // TODO: use enums instead of page numbers
            });
        cp.field('server-address')
            .on('change', (e, el)=>{
                let address = el.value();
                const port = address.substr(address.indexOf(':') + 1);
                address = address.substr(0, address.indexOf(':'));
                homegenieAdapter.options().connection = {
                    address: address,
                    port: port
                };
                homegenieAdapter.connect();
                console.log(e, el);
                homegenieAdapter.getModules((status, modules)=>{
                    console.log(status, modules);
                    homegenieAdapter.getGroups((status, groups)=>{
                        console.log(status, groups);
                        zuix.context('module-list', (listView)=>{
                            listView.model({
                                itemList: modules,
                                getItem: function(index, item) {
                                    // Return the item data. Each item could also be rendered with a different template,
                                    // in this case all items are using the 'card-template' which is defined
                                    // inline in the same page. For further information about ZUIX templates referer
                                    // to the documentation http://genielabs.github.io/zuix/#/docs .
                                    item.Domain = item.Domain.substring(item.Domain.lastIndexOf('.') + 1);
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
                                    }
                                }
                            });
                        });
                    });
                });
            });
    };
});
