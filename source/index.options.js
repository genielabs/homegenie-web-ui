'use strict';

let drawerLayout;
let viewPager;
let groupIndicator;

// The 'options' object mainly holds configuration options
// used for loading zuix components and set with the
// 'data-ui-options' element attribute
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
            view.find('.logo').on('click', function() {
                if (drawerLayout) drawerLayout.open();
            });
        }
    },
    viewPager: {
        enablePaging: true,
        startGap: 36,
        on: {
            'page:change': (e, page) => {
                hgui.setCurrentGroup(page.in);
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
