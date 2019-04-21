'use strict';
zuix.controller((cp) => {
    let displayLevel = 0; let actualLevel = 0.4;

    // these variable are used to store a reference to UI fields
    let controlOn;
    let controlOff;
    let controlLevel;
    let controlToggle;
    let statusLed;
    let levelBar;
    let levelView;

    // {ContextControllerHandler} interface methods
    cp.init = () => {
        cp.expose('setLevel', setLevel);
    };
    cp.create = () => {
        // get a reference to the UI fields of the view
        initWidget();
        controlOn = cp.field('control.on');
        controlOff = cp.field('control.off');
        controlLevel = cp.field('control.level');
        controlToggle = cp.field('control.toggle');
        statusLed = cp.field('status-led');
        levelBar = cp.field('level-bar');
        levelView = cp.field('level-view');
        // UI events listeners
        headerBar.on('click', () => {
            command(CMD.Options.Show, {view: cp.view()});
        });
        // actions to perform upon user interaction on UI fields
        controlOn.on('click', ()=>{
            if (actualLevel === 0) actualLevel = 1;
            setLevel(actualLevel);
            command(CMD.Control.On);
        });
        controlOff.on('click', ()=>{
            setLevel(0);
            command(CMD.Control.Off);
        });
        controlLevel.on('click', levelChangeHandler);
        controlToggle.on('click', (e, el)=>{
            if (actualLevel === 0) actualLevel = 1;
            displayLevel = (displayLevel === 0 ? actualLevel : 0);
            setLevel(displayLevel);
            command(CMD.Control.Toggle);
        });
        /*
        // show options menu by clicking on the icon image
        cp.field('icon').on('click', ()=>{
            const optionsMenu = zuix.context('main-options-menu');
            const view = zuix.field('menu', optionsMenu.view());
            cp.field('menu-title')
                .html(module.name.toUpperCase());
            const menuHtml = cp.field('context-menu-view').html();
            view.field('menu')
                .css('max-width', '300px')
                .html(menuHtml);
            optionsMenu.show();
        });
        */
        // update aspect of this widget according to the module type (switch, light or dimmer)
        if (cp.model() != null && cp.model().type != null) {
            setType(cp.model().type);
        }
        // this delay is due to the animation, we must wait the animation
        // to end in order to measure the level bar width consistently
        setTimeout(cp.update, 500);
    };
    cp.update = (field, oldValue) => {
        // TODO: handle other fields like 'Meter.Watts' and most recent fields 'timestamp'
        if (field != null) {
            // console.log(field, field.key, field.value);
            blink();
            switch (field.key) {
                case FLD.Status.Level:
                    actualLevel = parseFloat(field.value);
                    setLevel(actualLevel);
                    showUpdateTime(field);
                    break;
                case FLD.Meter.Watts:
                    let watt = parseFloat(field.value);
                    watt = Math.round(watt * 10) / 10;
                    cp.field('meter-watts').html(watt > 0 ? watt+' W' : '');
                    break;
            }
            return;
        }
        // if no field is given then update all fields bound to the view
        const module = cp.model();
        if (module.fields != null) {
            const level = module.fields.find((f) => f.key === FLD.Status.Level);
            if (level != null) {
                actualLevel = parseFloat(level.value);
                setLevel(actualLevel);
                showUpdateTime(level);
            }
        }
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


    function setType(type) {
        let typeIcon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/bulb.png';
        switch (type.toLowerCase()) {
            case 'switch':
                typeIcon = 'https://genielabs.github.io/homegenie-web-ui/images/widgets/socket.png';
            case 'light':
                levelView.hide();
                break;
            default:
                levelView.show();
        }
        cp.field('icon').attr('src', typeIcon);
        return cp.context;
    }
    function setLevel(level) {
        displayLevel = parseFloat(level);
        showUpdateTime({key: FLD.Status.Level, value: displayLevel});
        if (displayLevel === 0) {
            toggleClass(statusLed, 'off', 'on');
            cp.field('level-bar')
                .css('width', '0');
        } else {
            toggleClass(statusLed, 'on', 'off');
            const barWidth = controlLevel.position().rect.width * actualLevel;
            levelBar.css('width', barWidth + 'px');
            // show actual level
            const stopIndex = actualLevel * controlLevel.children().length();
            controlLevel.children().each((i, el, zel)=>{
                (i <= stopIndex) ? zel.addClass('on') : zel.removeClass('on');
                return true;
            });
        }
        return cp.context;
    }
    function levelChangeHandler(e, el) {
        const p = el.position();
        let barWidth = e.clientX - p.x + 12;
        let level = Math.round((100 / p.rect.width) * barWidth);
        level = (level - (level % 5)) / 100;
        displayLevel = actualLevel = level;
        setLevel(displayLevel);
        command(CMD.Control.Level + '/' + (Math.round(actualLevel * 100)));
    }
});
