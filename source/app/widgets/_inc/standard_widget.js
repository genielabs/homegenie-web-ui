// BEGIN standard_widget.js
    /** @member {ContextController} cp */
    let headerBar;
    let activityLed;
    let updateStatusInterval;

    function initWidget() {
        zuix.using('script', '{{app.urlRoot}}js/widgets.js');
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
            if (window.dayjs != null && dayjs().fromNow != null) {
                if (field.timestamp == null) field.timestamp = new Date().getTime();
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
