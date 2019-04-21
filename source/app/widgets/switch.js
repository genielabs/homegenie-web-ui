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
        cp.expose('setLevel', setLevel)
          .expose('setType', setType);
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
        blink();
        if (field != null && FLD != null) {
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

// {% include "_inc/standard_widget.js" %}

    function setType(type) {
        let typeIcon = '{{app.urlRoot}}images/widgets/bulb.png';
        switch (type.toLowerCase()) {
            case 'switch':
                typeIcon = '{{app.urlRoot}}images/widgets/socket.png';
            case 'light':
                controlOn.parent().addClass('switch');
                levelView.hide();
                break;
            default:
                controlOn.parent().removeClass('switch');
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
