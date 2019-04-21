'use strict';
zuix.controller((cp) => {
    // ui fields
    let alternate = false;
    let alternateTimeout;
    let currentIndex = 0;
    let p1;
    let p2;

    // BEGIN {ContextControllerHandler} interface methods
    cp.create = () => {
        // get a reference to the UI fields of the view
        initWidget();
        // UI events listeners
        headerBar.on('click', () => {
            command(CMD.Options.Show, {view: cp.view()});
        });
        p1 = cp.field('field-a');
        p2 = cp.field('field-b');
        cp.view('.debossed').on('click', showNext);
        cp.update();
        showNext();
    };
    cp.update = (field, oldValue) => {
        blink();
        if (field == null) showNext();
    };
    cp.destroy = () => {
        disposeWidget();
    };

    // private methods

// {% include "_inc/standard_widget.js" %}

    function showNext() {
        const module = cp.model();
        if (module.fields == null || module.fields.length === 0) {
            p1.hide(); p2.hide();
            module.fields = [];
        }
        const sensorFields = module.fields.filter((f) => f.key.startsWith('Sensor.'));
        if (sensorFields.length <= 1) {
            if (sensorFields.length === 0) p1.hide();
            else updateField(p1, sensorFields[0]);
            p2.hide();
        } else {
            if (alternate) {
                updateField(p1, sensorFields[currentIndex]);
                p1.show().animateCss('fadeOutUp', function() {
                    // animation ended
                    this.hide();
                });
                currentIndex++; if (currentIndex >= sensorFields.length) currentIndex = 0;
                updateField(p2, sensorFields[currentIndex]);
                p2.animateCss('fadeInUp').show();
            } else {
                updateField(p2, sensorFields[currentIndex]);
                p2.show().animateCss('fadeOutUp', function() {
                    // animation ended
                    this.hide();
                });
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
        let icon = '{{app.urlRoot}}images/widgets/empty.svg';
        switch (field.key) {
            case FLD.Sensor.Temperature:
                icon = '{{app.urlRoot}}images/widgets/temperature.png';
                break;
            case FLD.Sensor.Luminance:
                icon = '{{app.urlRoot}}images/widgets/sun.png';
                break;
            case FLD.Sensor.Humidity:
                icon = '{{app.urlRoot}}images/widgets/drop.png';
                break;
        }
        el.field('icon').attr('src', icon).show();
        el.field('value').html(field.value);
        el.field('label').html(field.key.replace('Sensor.', ''));
    }
});
