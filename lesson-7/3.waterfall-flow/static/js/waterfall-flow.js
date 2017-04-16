$(function () {
    /*
     * 背景动画启动
     * */
    $("#html5_3d_animation").html5_3d_animation({
        window_width: innerWidth - 17,
        window_height: innerHeight,
        window_background: '#00113F',
        star_count: '1000',
        star_color: '#FBFFAF',
        star_depth: '100'
    });

    /*
     * jQuery图片瀑布流启动
     * */
    var waterFallFlow = $.waterFallFlow({
        url: 'static/img/'
        , target: '#imgWrap'
        , className: 'item'
        , parentNodeSpace: 74
        , parentNodeTop: 30
        , marginLeft: 10
    });

    /*
     * 滚动监听
     * */
    $(window).scroll(throttle(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            waterFallFlow.load();
        }
    }));

    /*
     * 窗口尺寸监听
     * */
    $(window).resize(debounce(function () {
        waterFallFlow.load();
        /*
         * 背景动画启动
         * */
        $("#html5_3d_animation").html5_3d_animation({
            window_width: innerWidth - 17,
            window_height: innerHeight,
            window_background: '#00113F',
            star_count: '1000',
            star_color: '#FBFFAF',
            star_depth: '100'
        });
    }));
});