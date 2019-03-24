'use strict';
zuix.controller((cp) => {
    let displayLevel = 0; let actualLevel = 0.4;

    // ui fields
    let controlOn;
    let controlOff;
    let controlLevel;
    let controlToggle;
    let statusLed;
    let statusBar;
    let levelView;

    // {ContextControllerHandler} interface methods
    cp.init = () => {
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
        exposePublicMethods();
    };
    cp.create = () => {
        controlOn = cp.field('control.on');
        controlOff = cp.field('control.off');
        controlLevel = cp.field('control.level');
        controlToggle = cp.field('control.toggle');
        statusLed = cp.field('status-led');
        statusBar = cp.field('status-bar');
        levelView = cp.field('level-view');
        // TODO: use `CMD.` enums
        controlOn.on('click', ()=>{
            displayLevel = actualLevel;
            cp.update();
            command('Control.On');
        });
        controlOff.on('click', ()=>{
            displayLevel = 0;
            cp.update();
            command('Control.Off');
        });
        controlLevel.on('click', (e, el)=>{
            const p = el.position();
            let barWidth = e.clientX - p.x;
            let level = Math.round((100 / p.rect.width) * barWidth);
            level = (level - (level % 5)) / 100;
            displayLevel = actualLevel = level;
            cp.update();
            command('Control.Level/'+(Math.round(actualLevel * 100)));
        });
        controlToggle.on('click', (e, el)=>{
            displayLevel = (displayLevel === 0 ? actualLevel : 0);
            cp.update();
            command('Control.Toggle');
        });
        cp.field('menu').on('click', ()=>{
            zuix.context('main-options-menu').show();
        });
        cp.update();
    };

    cp.update = () => {
        if (displayLevel === 0) {
            if (statusBar.hasClass('status-on')) {
                statusBar
                    .removeClass('status-on')
                    .addClass('status-off');
            }
            cp.field('level-bar')
                .css('width', '0');
        } else {
            if (statusBar.hasClass('status-off')) {
                statusBar
                    .removeClass('status-off')
                    .addClass('status-on');
            }
            const barWidth = controlLevel.position().rect.width * actualLevel;
            cp.field('level-bar')
                .css('width', barWidth + 'px');
        }
        if (cp.model() != null && cp.model().type != null) {
            setType(cp.model().type);
        }
    };

    // private methods
    function command(apiCommand, options) {
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options);
        }
    }
    function setType(type) {
        let typeIcon = 'images/devices/bulb.png';
        switch (type.toLowerCase()) {
            case 'switch':
                typeIcon = 'images/devices/socket.png';
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
        displayLevel = actualLevel = parseFloat(level);
        cp.update();
        return cp.context;
    }
    function exposePublicMethods() {
        cp.expose('setType', setType)
          .expose('setLevel', setLevel)
          .expose('blink', ()=>{
              statusLed.addClass('led-on');
              setTimeout(()=>{
                  statusLed.removeClass('led-on');
              }, 200);
          });
    }
});
