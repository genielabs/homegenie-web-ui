'use strict';

zuix.controller(function(cp) {
    cp.init = function() {
        // TODO: add 'using' parse to task/zuix-build-tools
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/flex-layout-attribute/1.0.3/css/flex-layout-attribute.min.css');
        zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
    };
    cp.create = function() {
        console.log('created!');
        cp.field('btn-close')
            .on('click', ()=>{
                showPage(0); // TODO: use enums instead of page numbers
            });
    };
});
