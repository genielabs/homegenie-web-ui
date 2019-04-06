'use strict';
zuix.controller((cp) => {
    cp.create = () => {
        const module = cp.model();
        hgui.observeModule(module, cp.context); // listen for model updates
        cp.expose('update', cp.update);
        // register UI event handlers
        cp.view().on('click', () => {
            command('Programs.Toggle', hgui.getCurrentGroup().name);
        });
    };
    cp.update = (field, oldValue) => {
        if (field.key === 'Program.Status') {
            const led = cp.field('status-led')
                .removeClass('on off disabled error');
            switch (field.value) {
                case 'Running':
                    led.addClass('on');
                    break;
                case 'Enabled':
                case 'Idle':
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
    function command(apiCommand, options) {
        //blink();
        const handler = cp.options().control;
        if (handler != null) {
            handler(apiCommand, options);
        }
    }
});
