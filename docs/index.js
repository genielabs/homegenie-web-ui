/* global zuix */

let drawerLayout;
let viewPager;
let groupIndicator;
/*
zuix.store('config', {
    resourcePath: '/app/'
});
*/
// zuix.using('script', './service-worker.js');
zuix.using('style', '//zuixjs.github.io/zkit/css/flex-layout-attribute.min.css');
zuix.using('style', './index.css');

zuix.$.ZxQuery.prototype.animateCss = function(animationName, param1, param2) { return this; }; // forward declaration (sort of)

zuix.$.find('.profile').on('click', function() {
    if (drawerLayout) drawerLayout.open();
});

window.options = {
    drawerLayout: {
        autoHideWidth: -1,
        drawerWidth: 280,
        ready: (ctx) => {
            drawerLayout = ctx; ctx.close();
        }
    },
    headerBar: {
        ready: (ctx) => {
            const view = zuix.$(ctx.view());
            // open drawer when the profile icon is clicked
            view.find('.profile').on('click', () => {
                if (drawerLayout) drawerLayout.open();
            });
        }
    },
    viewPager: {
        enablePaging: true,
        startGap: 36,
        on: {
            'page:change': (e, page) => {
                syncPageIndicator(page);
                // show header/footer
                /*
                if (viewPager) {
                    const p = viewPager.get(page.in);
                    zuix.context(p).show();
                }
                */
                zuix.context('button-menu').showButton();
            }
        },
        ready: (ctx) => {
            viewPager = ctx;
        }
    },
    groupIndicator: {
        enablePaging: true,
        startGap: 36,
        ready: (ctx) => {
            groupIndicator = ctx;
        }
    },
    autoHidingBars: {
        header: 'header-bar',
        footer: 'footer-bar',
        height: 56,
        on: {
            'page:scroll': (e, data) => {
                const menu = zuix.context('button-menu');
                zuix.componentize();
                if (data.info.shift.y < 0) {
                    if (menu.showing()) menu.hideButton();
                } else {
                    if (!menu.showing()) menu.showButton();
                }
            }
        }
    },
    content: {
        css: false
    }
};

// Turn off debug output
window.zuixNoConsoleOutput = true;
zuix.lazyLoad(true, -48);

showPage(2);

hgui.setListener({
    onGroupAdded: (g) => {
        console.log('group added', g);
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
        // store a reference to the listview of this group for using it later for adding module widgets
        g._viewList = ld.find('[data-ui-field=list]');
    },
    onGroupRemoved: (g) => {
//        console.log('group removed', g);
    },
    onGroupModuleAdded: (g, mr) => {
        console.log('added module to group', g, mr, g._view);
        g._viewList.append(mr.widget);
    },
    onModuleAdded: (m) => {
//        console.log('module added', m);
    },
    onModuleRemoved: (m) => {
//        console.log('module removed', m);
    }
});

/*
// Load Demo adapter
const demoAdapter = zuix.load('adapters/demo', {
    // this is a controller-only component, no view, no css
    view: '',
    // HomeGenie server connection data
    connection: {
        address: 'localhost',
        port: 80
    },
    // once the adapter is ready add widgets
    ready: (adapter) => {
        // wait until main-page is loaded, then add items to the main-list
        zuix.context('main-page', (ctx)=>{
            // manual adding of widgets to page 0 (groupId = 0)
            // this is just for testing purpose
            const groupId = 0;
            const mainList = getPage(0).find('[data-ui-field=list]').eq(groupId);
            mainList.append(adapter.getWidget(groupId, 'light-1'));
            mainList.append(adapter.getWidget(groupId, 'light-2'));
            mainList.append(adapter.getWidget(groupId, 'dimmer-1'));
            mainList.append(adapter.getWidget(groupId, 'dimmer-2'));
            mainList.append(adapter.getWidget(groupId, 'sensor-1'));
            mainList.append(adapter.getWidget(groupId, 'scenari192.168.2.235:80o-1'));
        });
    }
});
*/

// Load HomeGenie adapter
const homegenieAdapter = zuix.load('adapters/homegenie', {
    // this is a controller-only component, no view, no css
    view: '',
    // add the adapter to HGUI once it is loaded and ready
    ready: (ctx) => hgui.addAdapter(ctx)
});

function syncPageIndicator(page) {
    const groupButtons = zuix.$(groupIndicator.view()).children();
    if (groupButtons) {
        groupButtons.eq(page.out).removeClass('active');
        groupButtons.eq(page.in).addClass('active');
    }
    if (groupIndicator) groupIndicator.page(page.in);
}

function showPage(i) {
    // show page
    zuix.field('pages')
        .children().hide()
        .eq(i).show();
    if (viewPager) viewPager.refresh();
}
function getPage(i) {
    return zuix.field('pages').children().eq(i);
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
    zuix.$(el).addClass('container-height-160');
    el.setAttribute('layout', 'column stretch-center');
    if (targetElement != null) zuix.$(targetElement).append(el);
    return el;
}
