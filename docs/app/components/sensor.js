'use strict';
zuix.controller((cp) => {
    // ui fields
    let statusLed;
    let headerBar;
    let alternate = false;
    let alternateTimeout;
    let p1;
    let p2;
    let p3; let currentIndex = 0;
    let container;

    // {ContextControllerHandler} interface methods
    cp.init = () => {
        hgui.widgetIncludes();
        exposePublicMethods();
    };
    cp.create = () => {
        const module = cp.model();
        hgui.observeModule(module, cp.context); // listen for model updates
        // get a reference to the UI fields of the view
        statusLed = cp.field('status-led');
        headerBar = cp.view().find('header');
        // UI events listeners
        headerBar.on('click', () => {
            zuix.context('module-detail')
                .open(cp.view());
        });
        container = cp.view('.debossed');
        p1 = cp.field('field-a');
        p2 = cp.field('field-b');
        p3 = cp.field('field-c');
        container.on('click', showNext);
        showNext();
        cp.update();
    };

    cp.update = (field, oldValue) => {
        blink();
    };

    // private methods

    function showNext() {
        const parameters = container.children();
        parameters.hide();
        parameters.eq(currentIndex).show().animateCss('fadeOutUp', function(){ this.hide(); });
        currentIndex++; if (currentIndex == 3) currentIndex = 0;
        parameters.eq(currentIndex).animateCss('fadeInUp').show();
        /*
        if (alternate) {
            p1.show().animateCss('fadeOutUp', function(){ this.hide(); });
            p2.animateCss('fadeInUp').show();
        } else {
            p2.show().animateCss('fadeOutUp', function(){ this.hide(); });
            p1.animateCss('fadeInUp').show();
        }
        alternate = !alternate;
        */
        if (alternateTimeout != null) {
            clearTimeout(alternateTimeout);
        }
        alternateTimeout = setTimeout(showNext, 5000);
    }

    function command(apiCommand, options, callback) {
        blink();
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options, callback);
        }
    }
    function setType(type) {
        let typeIcon = 'images/widgets/sensor.png';
        cp.field('icon').attr('src', typeIcon);
        return cp.context;
    }
    function blink() {
        statusLed.addClass('on');
        setTimeout(()=>{
            statusLed.removeClass('on');
        }, 200);
    }
    function exposePublicMethods() {
        cp.expose('blink', blink)
          .expose('command', ()=>{})
          // Observable interface method
          .expose('update', (field, oldValue) => cp.update(field, oldValue));
    }
});
