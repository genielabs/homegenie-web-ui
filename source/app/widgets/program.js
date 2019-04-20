'use strict';
zuix.controller((cp) => {
    cp.create = () => {
        const module = cp.model();
        hgui.observeModule(module, cp.context); // listen for model updates
        cp.expose('update', cp.update);
        // register UI event handlers
        cp.view().on('click', () => {
            command(CMD.Programs.Toggle, hgui.getCurrentGroup().name);
        }).on('mouseup touchend', () => {
            cp.view().removeClass('pressed');
        }).on('mousedown touchstart', () => {
            cp.view().addClass('pressed');
        });
    };
    cp.update = (field, oldValue) => {
        if (field.key === FLD.Program.Status) {
            const led = cp.field('status-led')
                .removeClass('on off idle disabled error');
            switch (field.value) {
                case 'Running':
                    led.addClass('on');
                    break;
                case 'Idle':
                    led.addClass('idle');
                    break;
                case 'Enabled':
                    led.addClass('off');
                    break;
                case 'Disabled':
                    led.addClass('disabled');
                    break;
                case 'Interrupted':
                case 'Error':
                    led.addClass('error');
                    break;
            }
        }
    };
    function command(apiCommand, options, callback) {
        const control = cp.options().control;
        if (control != null) {
            control(apiCommand, options, callback);
        }
    }
});
