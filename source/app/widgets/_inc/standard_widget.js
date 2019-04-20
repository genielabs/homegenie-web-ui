// BEGIN standard_widget.js
    /** @member {ContextController} cp */
    let headerBar;
    let activityLed;
    let updateStatusInterval;

    function initWidget() {
        zuix.using('script', 'js/widgets.js');
        zuix.using('script', '@cdnjs/dayjs/1.8.12/dayjs.min.js', ()=>{
            zuix.using('script', '@cdnjs/dayjs/1.8.12/plugin/relativeTime.js', ()=>{
                dayjs.extend(dayjs_plugin_relativeTime);
            });
        });
        zuix.using('style', '@cdnjs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', '@cdnjs/animate.css/3.7.0/animate.min.css');
        //
        if (window.hgui) {
            hgui.observeModule(cp.model(), cp.context); // listen for model updates
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
            const relativeDate = dayjs(field.timestamp).fromNow();
            cp.field('status-message').html(relativeDate);
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
