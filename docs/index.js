/* global zuix */

let drawerLayout;
let viewPager;
let groupIndicator;
let groupButtons;
/*
zuix.store('config', {
    resourcePath: '/app/'
});
*/
// zuix.using('script', './service-worker.js');
zuix.using('style', '//zuixjs.github.io/zkit/css/flex-layout-attribute.min.css');
zuix.using('style', './index.css');

zuix.$.find('.profile').on('click', function() {
    if (drawerLayout) drawerLayout.open();
});

window.options = {
    drawerLayout: {
        autoHideWidth: -1,
        drawerWidth: 280,
        ready: function() {
            drawerLayout = this; this.close();
        }
    },
    headerBar: {
        ready: function() {
            const view = zuix.$(this.view());
            // handle 'topic' buttons click (goto clicked topic page)
            groupButtons = view.find('.topics').children().each(function(i, el) {
                this.on('click', function(e) {
                    if (viewPager) viewPager.page(i);
                });
            });
            // open drawer when the profile icon is clicked
            view.find('.profile').on('click', function() {
                if (drawerLayout) drawerLayout.open();
            });
        }
    },
    viewPager: {
        enablePaging: true,
        startGap: 36,
        on: {
            'page:change': function(e, page) {
                syncPageIndicator(page);
                // show header/footer
                if (viewPager) {
                    const p = viewPager.get(page.in);
                    zuix.context(p).show();
                }
                zuix.context('button-menu').showButton();
            }
        },
        ready: function() {
            viewPager = this;
        }
    },
    groupIndicator: {
        enablePaging: true,
        startGap: 36,
        ready: function() {
            groupIndicator = this;
        }
    },
    autoHidingBars: {
        header: 'header-bar',
        footer: 'footer-bar',
        height: 56,
        on: {
            'page:scroll': function(e, data) {
                zuix.componentize();
                if (data.info.shift.y < 0) {
                    zuix.context('button-menu').hideButton();
                } else {
                    zuix.context('button-menu').showButton();
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

showPage(0);

// Load Demo adapter
const demoAdapter = zuix.load('adapters/demo', {
    // this is a controller-only component, no view, no css
    view: '',
    // HomeGenie server connection data
    connection: {
        address: 'localhost',
        port: 80,
        username: 'demo',
        password: 'demo'
    },
    // event listeners
    on: {
        'status:change': function() {
            // TODO: ...
        }
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
            mainList.append(adapter.getWidget(groupId, 'scenario-1'));
        });
    }
});
// Load HomeGenie adapter
const homegenieAdapter = zuix.load('adapters/homegenie', {
    // this is a controller-only component, no view, no css
    view: '',
    // HomeGenie server connection data
    connection: {
        address: '192.168.2.235',
        port: 80,
        username: 'admin',
        password: 'testt'
    },
    // event listeners
    on: {
        'status:change': function() {
            // TODO: ...
        }
    },
    // once the adapter is ready add widgets
    ready: (adapter) => {
        // wait until main-page is loaded, then add items to the main-list
        zuix.context('main-page', (ctx)=>{
            // manual adding of widgets to page 0 and 1 (groupId = 0 and 1)
            // this is just for testing purpose
            let groupId = 1;
            let mainList = getPage(0).find('[data-ui-field=list]').eq(groupId);
            mainList.append(adapter.getWidget(groupId, 'HomeAutomation.X10/C7'));
            mainList.append(adapter.getWidget(groupId, 'HomeAutomation.ZWave/4'));
            groupId = 0;
            mainList = getPage(0).find('[data-ui-field=list]').eq(groupId);
            mainList.append(adapter.getWidget(groupId, 'HomeAutomation.X10/C7'));
            mainList.append(adapter.getWidget(groupId, 'HomeAutomation.ZWave/4'));
        });
    }
});

function syncPageIndicator(page) {
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
    el.setAttribute('layout', 'column stretch-center');
    if (targetElement != null) zuix.$(targetElement).append(el);
    return el;
}
