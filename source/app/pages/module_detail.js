'use strict';
zuix.controller((cp) => {
    // TODO: ...
    let detailPage;
    let placeHolder;
    let targetView;
    let oldPosition;
    let newPosition;
    let isOpen;
    let chartView;

    cp.create = () => {
        // TODO: implement widgets.commonIncludes() (with all common zuix.using ...)
        detailPage = cp.field('detail-page');
        placeHolder = zuix.$(document.createElement('div'));
        cp.expose('open', open)
          .expose('close', close);
        setInterval(()=>{
            if (chartView != null) chartView.update();
        } ,5000);
        cp.view().on('keydown', (e) => {
            if (!isOpen) return;
            if (e.keyCode === 27) {
                close();
            }
        });
        cp.field('btn-back')
          .on('click', close);
    };

    function open(view) {
        if (isOpen) {
            close();
            return;
        }
        isOpen = true;
        cp.view().get().focus();
        targetView = view;
        oldPosition = targetView.position();
        const parent = targetView.parent();
        // give placeHolder same size as targetView
        const style = targetView.get().currentStyle || window.getComputedStyle(targetView.get());
        placeHolder.css({
            'margin-left': style.marginLeft,
            'margin-top': style.marginTop,
            'margin-right': style.marginRight,
            'margin-bottom': style.marginBottom,
            'width': oldPosition.rect.width+'px',
            'height': oldPosition.rect.height+'px'
        }).detach();
        // detach the targetView and put a placeholder in place of it
        targetView.detach();
        // TODO: think about something to avoid the use of zuix's internal variables
        parent.insert(targetView.get().__zuix_oldIndex, placeHolder.get());
        // attach the targetView to its new parent
        const detailPage = zuix.field('detail-page');
        detailPage.insert(0, targetView.get());
        // show this page with a fade-in effect
        cp.view().display('block')
            .animateCss('fadeIn', {duration: '0.25s'});
        // animate the targetView with a translate transform from old location to the new location
        newPosition = targetView.position();
        removeTransition(targetView);
        // old position
        targetView.css('transform', 'translate('+(oldPosition.x-newPosition.x)+'px,'+(oldPosition.y-newPosition.y)+'px)');
        setTimeout(()=>{
            addTransition(targetView);
            // new position
            targetView.css('transform', 'translate(0,0)');
        });
        updateChart();
    }
    function close() {
        isOpen = false;
        // detach placeHolder and reattach targetView to the original parent
        placeHolder.detach();
        detailPage.insert(0, placeHolder.get());
        targetView.attach();
        // animate targetView to the original position
        removeTransition();
        // current position
        targetView.css('transform', 'translate('+(-oldPosition.x+newPosition.x)+'px,'+(-oldPosition.y+newPosition.y)+'px)');
        cp.view().animateCss('fadeOut', {duration: '0.25s'}, ()=> {
            cp.view().hide();
            targetView.css('z-index', 0);
        });
        setTimeout(()=>{
            addTransition();
            // original position
            targetView.css('transform', 'translate(0,0)');
        }, 50);
        if (chartView != null) {
            chartView.detach();
            chartView = null;
        }
    }
    function addTransition() {
        // TODO: should restore original css states on close
        targetView.css({
            '-webkit-transition': 'all .2s',
            '-moz-transition': 'all .2s',
            '-ms-transition': 'all .2s',
            '-o-transition': 'all .2s',
            'transition:': 'all .2s'
        });
    }
    function removeTransition() {
        // TODO: should restore original css states on close
        targetView.css({
            'z-index': 1000,
            '-webkit-transition': 'none',
            '-moz-transition': 'none',
            '-ms-transition': 'none',
            '-o-transition': 'none',
            'transition:': 'none',
        });
    }

    function updateChart() {
        zuix.context(targetView).
        command('GetStats', null, (data) => {
            if (data != null) {
                chartView = new Chartist.Line(cp.field('chart').get(), {
                    series: [
                        data
                    ]
                }, {
                    showPoint: false,
                    showLine: true,
                    showArea: false,
                    fullWidth: true,
                    showLabel: true,
                    lineSmooth: true,
                    axisX: {
                        showGrid: true,
                        showLabel: true,
                        type: Chartist.FixedScaleAxis,
                        divisor: 12,
                        labelInterpolationFnc: function(value) {
                            return dayjs(value).format('DD / HH');
                        }
                    }, /*
                    axisY: {
                        showGrid: false,
                        showLabel: false,
                        offset: 0
                    },*/
                    chartPadding: {
                        right: 8
                    }
                });
            }
        });
    }
});
