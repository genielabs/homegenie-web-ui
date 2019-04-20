// BEGIN common_header.js
    function setType(type) {
        let typeIcon = 'images/widgets/sensor.png';
        // TODO: select different sensor icons based on 'type'
        cp.field('icon').attr('src', typeIcon);
        return cp.context;
    }
// // END common_header.js
