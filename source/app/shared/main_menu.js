'use strict'
zuix.controller((cp) => {
    cp.create = ()=>{
        cp.field('btn-settings')
            .on('click', (e, el)=>{
                drawerLayout.close();
                showPage(2);
            });
    };
});
