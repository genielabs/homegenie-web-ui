'use strict';
zuix.controller((cp) => {
    cp.create = () => {
        // TODO: ...
        cp.view().on('click', () => {
            console.log('Tapped!');
        });
    };
    // cp.destroy = () => console.log('DISPOSED', cp.context);
});
