'use strict';
zuix.controller((cp) => {
    // ui fields
    let statusLed;
    let headerBar;
    let alternate = false;
    let alternateTimeout;
    let currentIndex = 0;
    let p1;
    let p2;

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
        p1 = cp.field('field-a');
        p2 = cp.field('field-b');
        cp.view('.debossed').on('click', showNext);
        showNext();
        cp.update();
    };

    cp.update = (field, oldValue) => {
        setType('sensor');
        blink();
    };

    // private methods

// {% include "_inc/standard_widget.js" %}

    function showNext() {
        const module = cp.model();
        const sensorFields = module.fields.filter((f) => f.key.startsWith('Sensor.'));
        if (sensorFields.length <= 1) {
            if (sensorFields.length === 0) p1.hide();
            else updateField(p1, sensorFields[0]);
            p2.hide();
        } else {
            if (alternate) {
                updateField(p1, sensorFields[currentIndex]);
                p1.show().animateCss('fadeOutUp', function(){ this.hide(); });
                currentIndex++; if (currentIndex >= sensorFields.length) currentIndex = 0;
                updateField(p2, sensorFields[currentIndex]);
                p2.animateCss('fadeInUp').show();
            } else {
                updateField(p2, sensorFields[currentIndex]);
                p2.show().animateCss('fadeOutUp', function(){ this.hide(); });
                currentIndex++; if (currentIndex >= sensorFields.length) currentIndex = 0;
                updateField(p1, sensorFields[currentIndex]);
                p1.animateCss('fadeInUp').show();
            }
            alternate = !alternate;
        }
        if (alternateTimeout != null) {
            clearTimeout(alternateTimeout);
        }
        alternateTimeout = setTimeout(showNext, 5000);
    }

    function updateField(el, field) {
        let icon = 'images/widgets/empty.svg';
        switch (field.key) {
            case FLD.Sensor.Temperature:
                icon = 'images/widgets/temperature.png';
                break;
            case FLD.Sensor.Luminance:
                icon = 'images/widgets/sun.png';
                break;
            case FLD.Sensor.Humidity:
                icon = 'images/widgets/drop.png';
                break;
        }
        el.field('icon').attr('src', icon).show();
        el.field('value').html(field.value);
        el.field('label').html(field.key.replace('Sensor.', ''));
    }

    function command(apiCommand, options, callback) {
        blink();
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options, callback);
        }
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
