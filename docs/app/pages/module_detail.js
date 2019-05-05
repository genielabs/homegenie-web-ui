'use strict';
zuix.controller(function(cp) {
    let detailPage;
    let placeHolder;
    let targetView;
    let oldPosition;
    let newPosition;
    let isOpen;
    let chartView;
    let chartUpdateInterval;
    let headerAutoHide;
    let optionsContainer;

    cp.init = () => {
        // Chartist.js
        zuix.using('style', 'js/chartist/chartist.min.css');
        zuix.using('script', 'js/chartist/chartist.min.js');
    };
    cp.create = () => {
        detailPage = cp.field('detail-page');
        placeHolder = zuix.$(document.createElement('div'));
        optionsContainer = cp.field('options');
        // UI event handlers
        cp.view().on('keydown', (e) => {
            if (!isOpen) return;
            if (e.keyCode === 27) {
                close();
            }
        });
        cp.field('btn-back')
          .on('click', close);
        // load header-auto-hide controller
        headerAutoHide = zuix.load('@lib/controllers/header_auto_hide', {
            view: cp.view(),
            css: false,
            header: 'module-detail-header',
            height: '56px'
        });
        // Expose public methods
        cp.expose('open', open)
          .expose('close', close)
          .expose('toggle', toggle)
          .expose('isOpen', () => isOpen)
          .expose('addOptionsView', addOptionsView);
    };
    cp.destroy = () => {
        stopUpdateInterval();
    };

    function toggle(view) {
        if (isOpen) close();
        else open(view);
        return isOpen;
    }

    function open(view) {
        if (isOpen) return;
        isOpen = true;
        // this setTimeout is needed otherwise the enclosed code will have no effect
        setTimeout(()=>{
            cp.view().get().focus();
            cp.view().get().scrollTop = 0;
        });
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
        targetView.addClass('box-shadow-heavy')
            .detach();
        // TODO: think about something to avoid the use of zuix's internal variables
        parent.insert(targetView.get().__zuix_oldIndex, placeHolder.get());
        // attach the targetView to its new parent
        const detailPage = zuix.field('detail-page');
        detailPage.insert(0, targetView.get());
        // show this page with a fade-in effect
        cp.view().display('block')
            .animateCss('fadeIn', {duration: '0.5s'});
        // animate the targetView with a translate transform from old location to the new location
        newPosition = targetView.position();
        removeTransition(targetView);
        // old position
        targetView.css('transform', 'translate('+(oldPosition.rect.x-newPosition.rect.x)+'px,'+(oldPosition.rect.y-newPosition.rect.y)+'px)');
        setTimeout(()=>{
            addTransition(targetView);
            // new position
            targetView.css('transform', 'translate(0,0)');
        });
        updateInfo();
        updateChart();
    }
    function close() {
        if (!isOpen) return;
        isOpen = false;
        setTimeout(reset, 500);
        // detach placeHolder and reattach targetView to the original parent
        placeHolder.detach();
        detailPage.insert(0, placeHolder.get());
        targetView.attach();
        // animate targetView to the original position
        removeTransition();
        // current position
        targetView // .removeClass('box-shadow-heavy')
            .css('transform', 'translate('+(newPosition.rect.x-oldPosition.rect.x)+'px,'+(newPosition.rect.y-oldPosition.rect.y)+'px)');
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
            stopUpdateInterval();
            chartView.detach();
            chartView = null;
        }
    }

    function addOptionsView(view) {
        optionsContainer.append(view);
        zuix.$(view).attr('self', 'size-1of2 sm-full');
    }

    function reset() {
        optionsContainer.children().each((i, el, $el) => {
            const ctx = zuix.context(el);
            zuix.unload(ctx);
        });
        headerAutoHide.show();
    }

    function addTransition() {
        // TODO: should restore original css states on close
        targetView.css({
            '-webkit-transition': 'all .3s',
            '-moz-transition': 'all .3s',
            '-ms-transition': 'all .3s',
            '-o-transition': 'all .3s',
            'transition:': 'all .3s'
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
            'transition:': 'none'
        });
    }

    function updateInfo() {
        const module = zuix.context(targetView).model();
        if (module.id) {
            cp.field('info-id').html(module.id);
            cp.field('info-type').html(module.type);
            cp.field('info-adapter').html(module.adapterId);
        }
    }

    function updateChart() {
        zuix.context(targetView).
        command('GetStats', null, (data) => {
            if (data != null) {
                let previousDayLabel;
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
                            const d = dayjs(value);
                            const day = d.format('DD');
                            let format = 'HH (ddd DD)';
                            if (previousDayLabel === day) format = 'HH';
                            previousDayLabel = day;
                            return d.format(format);
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
                startUpdateInterval();
            }
        });
    }
    function startUpdateInterval() {
        stopUpdateInterval();
        // refresh chart data ever second
        chartUpdateInterval = setInterval(()=>{
            if (chartView != null) chartView.update();
        }, 1000);
    }
    function stopUpdateInterval() {
        if (chartUpdateInterval != null) {
            clearInterval(chartUpdateInterval);
        }
    }
});
