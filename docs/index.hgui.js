'use strict';

let _ui = {
    groups: [],
    modules: []
};
hgui.setListener({
    onGroupAdded: (g) => {
        // add the group to the viewpager's navigation tabs
        const index = zuix.field('header_groups').children().length();
        const d = zuix.$(document.createElement('div'));
        d.html(g.name)
        // TODO: deregister later
            .on('click', () => viewPager.page(index));
        zuix.field('header_groups').append(d.get());
        // add the group page to the viewpager, this will contain the module list
        const ld = zuix.$(document.createElement('div'));
        ld.html('<section class="content" data-ui-load="@lib/controllers/header_auto_hide" data-ui-options="options.autoHidingBars">\n' +
            '        <div data-ui-field="list" self="size-xxlarge center" layout="rows stretch-spread" class="main-list"></div>\n' +
            '    </section>');
        zuix.$(viewPager.view()).append(ld.get());
        // store a reference to the page associated to this group for using it later for adding module widgets
        _ui.groups[g] = _ui.groups[g] || {};
        _ui.groups[g].pageView = ld;
        _ui.groups[g].widgets = [];
    },
    onGroupRemoved: (g) => {
//        console.log('group removed', g);
    },
    onGroupModuleAdded: (g, m) => {
        // Create widget associated with this module
        const options = {
            lazyLoad: true,
            // data-bind model to view fields
            model: m,
            // this gets called from the widget when a command is performed
            control: (command, options, callback) => {
                hgui.getAdapter(m.adapterId).control(m, command, options, callback);
            }
        };
        // TODO: add utility function to get the widget from the module type
        let widgetId;
        switch (m.type) {
            case 'program':
                widgetId = 'components/program';
                break;
            case 'sensor':
            case 'doorwindow':
                widgetId = 'components/sensor';
                break;
            default:
                widgetId = 'components/switch';
                break;
        }
        // call global function `addWidget` to create a new widget
        const w = addWidget(widgetId, options);
        _ui.groups[g].widgets[m] = w;
        _ui.groups[g].pageView.find('[data-ui-field=list]').append(w);
    },
    onModuleAdded: (m) => {
//        console.log('module added', m);
    },
    onModuleRemoved: (m) => {
//        console.log('module removed', m);
    }
});

function initDemoAdapter() {
    // load demo adapter
    hgui.getAdapter('demo-adapter', 'adapters/demo', (adapter) => {
        adapter.options().config = {};
        adapter.connect(()=> {
            // get modules and groups list
            adapter.groups().map((g) => {
                // add group to HGUI
                let hguiGroup;
                if (hgui.hasGroup(g.name)) {
                    hguiGroup = hgui.getGroup(g.name);
                } else {
                    hguiGroup = hgui.addGroup(g.name);
                }
                // add modules and groups to HGUI
                g.modules.map((moduleLink) => {
                    // in HomeGenie Server group modules are just links, so we need to get the module instance from `moduleList`
                    const module = adapter.modules().find((m) => m.id == moduleLink.moduleId);
                    // if the module type is not supported it won't be found in the modules list
                    if (module == null) return;
                    const moduleId = module.id;
                    const adapterId = adapter.id();
                    let hguiModule;
                    if (hgui.hasModule(moduleId, adapterId)) {
                        // Update the hgui module
                        hguiModule = hgui.getModule(moduleId, adapterId);
                    } else {
                        hguiModule = hgui.addModule({
                            id: moduleId,
                            type: module.type,
                            name: module.name,
                            description: module.description,
                            adapterId: adapterId
                        });
                    }
                    hgui.addGroupModule(hguiGroup, hguiModule);
                    /*
                    module.Properties.map((p) => {
                        // TODO: should check update time before updating the property
                        hgui.updateModule(hguiModule, p.Name, p.Value, p.UpdateTime);
                    });
                    */
                });
            });
            hgui.save();
            showPage(0);
            hgui.hideLoader();
        });
    });
}

/**
 * Load and add a widget to a given container element
 * @param {string} componentId Path to the widget
 * @param {ContextOptions} options Options
 * @param {Element} targetElement If specified append the widget to this element
 * @return {Element}
 */
function addWidget(componentId, options, targetElement) {
    const el = zuix.createComponent(componentId, options).container();
    // center the list on wide screens
    zuix.$(el).addClass('-container-height-160 container-maxWidth-560');
    el.setAttribute('layout', 'column stretch-center');
    if (targetElement != null) zuix.$(targetElement).append(el);
    return el;
}
