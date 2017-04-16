/*
 *
 * jQuery图片瀑布流插件
 * url 请求的地址
 * opt 默认选项
 *
 * */
;(function ($, doc) {
    $.extend({
        waterFallFlow: function (opt) {
            //设置默认值
            opt = $.extend({
                width: 190
                , url: ''//请求地址
                , target: null//图片容器
                , className: null//图片class
                , parentNodeSpace: 0//图片容器左右padding
                , parentNodeTop: 0//图片容器上下padding
                , topGap: 10//图片容器上padding
                , marginLeft: 0//图片的marginLeft
            }, opt);

            /**
             * 模拟JQuery GET获取数据
             * @param url 请求地址
             * @param param 请求参数
             * @param fn 回调函数
             */
            function getData(url, param, fn) {
                opt.pageNumber = param.pageNumber || 1;
                var i = 0;
                var arr = [];
                while (i <= param.count) {
                    i++;
                    arr.push(url + i + '.jpg');
                }
                fn && fn({
                    imgSrcArray: arr,
                    pageNumber: ++opt.pageNumber
                });
            }

            //存放图片高度的数组
            var _imgArr = [];

            /**
             * 计算图片位置
             */
            function render() {
                var count = Math.floor(($('body').width() - opt.parentNodeSpace * 2) / opt.width);
                _imgArr = [];
                for (var i = 0; i < count; i++) {
                    _imgArr.push(0);
                }
                $('[data-img]').each(function (index, item) {
                    var minHeight = Math.min.apply(null, _imgArr);
                    var minIndex = $.inArray(minHeight, _imgArr);
                    var left = 0;
                    var top = 0;

                    if (index === 0) {
                        top = opt.parentNodeTop + opt.topGap;
                        left = opt.parentNodeSpace;
                    } else if (index > 0 && index < count) {
                        top = opt.parentNodeTop + opt.topGap;
                        left = $('[data-img]').eq(index - 1).position().left + opt.marginLeft + opt.width;
                    } else {
                        top = minHeight + opt.parentNodeTop + opt.topGap;
                        left = $('[data-img]').eq(minIndex).position().left;
                    }
                    $(this).css({
                        "position": "absolute",
                        "top": top,
                        "left": left
                    });
                    _imgArr[minIndex] += $(item).height() + opt.topGap;
                });
            }

            /**
             * 获取数据并渲染图片
             */
            function show() {
                getData(opt.url, {
                    count: Math.floor(($(doc).width() - opt.parentNodeSpace * 2) / opt.width),
                    pageNumber: opt.pageNumber
                }, function (data) {
                    //把图片添加到页面上
                    $(opt.target).append($.map(data.imgSrcArray, function (item) {
                        return '<img data-img class="' + opt.className + '" src="' + item + '" width="' + opt.width + '" />';
                    }));
                    //开始计算图片位置
                    render()
                });

                /**
                 * 当图片不够一屏幕时继续获取数据并渲染图片
                 */
                setTimeout(function () {
                    if (Math.max.apply(null, _imgArr) < innerHeight) {
                        show();
                    }
                }, 500);
            }

            /**
             * 开始渲染
             */
            show();

            return {
                /**
                 * 用于外部连续加载图片
                 */
                load: function () {
                    show();
                }
            };
        }
    });
})(jQuery, document);