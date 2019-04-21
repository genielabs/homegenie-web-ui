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

// // BEGIN standard_widget.js
    /** @member {ContextController} cp */
    let headerBar;
    let activityLed;
    let updateStatusInterval;

    function initWidget() {
        zuix.using('script', 'https://genielabs.github.io/homegenie-web-ui/js/widgets.js');
        zuix.using('script', '@cdnjs/dayjs/1.8.12/dayjs.min.js', ()=>{
            zuix.using('script', '@cdnjs/dayjs/1.8.12/plugin/relativeTime.js', ()=>{
                // wait until dayjs is ready
                const extend = () => {
                    if (dayjs) dayjs.extend(dayjs_plugin_relativeTime);
                    else setTimeout(extend, 100);
                };
                setTimeout(extend, 100);
            });
        });
        zuix.using('style', '@cdnjs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        if (zuix.$.ZxQuery.prototype.animateCss == null) {
            // This is sort of forward declaration to prevent errors while AnimateCSS extension is not yet ready
            zuix.$.ZxQuery.prototype.animateCss = function(animationName, param1, param2) { return this; };
        }
        zuix.using('component', '@lib/extensions/animate_css');
        // listen for model updates
        if (window.hgui) {
            hgui.observeModule(cp.model(), cp.context);
        }
        //
        activityLed = cp.field('activity-led');
        headerBar = cp.view().find('header');
        exposePublicMethods();
    }

    function disposeWidget() {
        if (updateStatusInterval != null) {
            clearInterval(updateStatusInterval);
        }
    }

    function blink() {
        activityLed.addClass('on');
        setTimeout(()=>{
            activityLed.removeClass('on');
        }, 200);
    }
    function showUpdateTime(field) {
        const u = () => {
            // dayjs might not be yet loaded at startup
            if (window.dayjs != null) {
                const relativeDate = dayjs(field.timestamp).fromNow();
                cp.field('status-message').html(relativeDate);
            }
        };
        u();
        if (updateStatusInterval != null) clearInterval(updateStatusInterval);
        updateStatusInterval = setInterval(u, 30000);
    }
    function toggleClass(element, statusIn, statusOut) {
        if (element.hasClass(statusOut)) {
            element
                .removeClass(statusOut)
                .addClass(statusIn);
        }
    }

    // HGUI widget interface methods

    function command(apiCommand, options, callback) {
        blink();
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options, callback);
        }
    }
    function exposePublicMethods() {
        cp.expose('blink', blink)
            .expose('command', command)
            // Observable interface method
            .expose('update', (field, oldValue) => cp.update(field, oldValue));
    }
// // END standard_widget.js


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
        let icon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/empty.svg';
        switch (field.key) {
            case FLD.Sensor.Temperature:
                icon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/temperature.png';
                break;
            case FLD.Sensor.Luminance:
                icon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/sun.png';
                break;
            case FLD.Sensor.Humidity:
                icon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/drop.png';
                break;
        }
        el.field('icon').attr('src', icon).show();
        el.field('value').html(field.value);
        el.field('label').html(field.key.replace('Sensor.', ''));
    }
});
