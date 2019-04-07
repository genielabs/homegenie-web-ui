/* global zuix */
'use strict';

/*
zuix.store('config', {
    resourcePath: '/app/'
});
*/
// Set lazy-loading threshold
zuix.lazyLoad(true, -20);
// Turn off debug output
window.zuixNoConsoleOutput = true;
// This is sort of forward declaration to prevent errors while AnimateCSS extension is not yet ready
zuix.$.ZxQuery.prototype.animateCss = (animationName, param1, param2) => {};

const splashScreen = zuix.field('splash-screen');
let configLoadTimeout = null; let initialized = false;
zuix.hook('componentize:end', ()=>{
    if (initialized) return;
    // load config
    if (configLoadTimeout != null) clearTimeout(configLoadTimeout);
    configLoadTimeout = configLoadTimeout = setTimeout(()=>{
        initialized = true;
        hgui.load((config)=>{
            // TODO: name pages with constants instead of numbers
            (config != null) ? showPage(0) : showPage(2);
            hgui.hideLoader();
        });
    }, 1000);
});
showPage(2);

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
function showSetupPage() {
    zuix.field('page-adapters').show();
    zuix.field('page-homegenie-adapter').hide();
    showPage(2);
}
// Utility Functions

function toggleClass(element, statusIn, statusOut) {
    if (element.hasClass(statusOut)) {
        element
            .removeClass(statusOut)
            .addClass(statusIn);
    }
}
