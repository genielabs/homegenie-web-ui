'use strict';
zuix.controller((cp) => {
    // ui fields
    let statusLed;

    // {ContextControllerHandler} interface methods
    cp.init = () => {
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
        exposePublicMethods();
    };
    cp.create = () => {
        const module = cp.model();
        hgui.observeModule(module, cp.context); // listen for model updates
        statusLed = cp.field('status-led');
        cp.update();
    };

    cp.update = (field, oldValue) => {
        blink();
    };

    // private methods
    function command(apiCommand, options) {
        blink();
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options);
        }
    }
    function setType(type) {
        let typeIcon = 'images/devices/sensor.png';
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
            // Observable interface method
            .expose('update', (field, oldValue) => cp.update(field, oldValue));
    }
});
