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
                , url: ''
                , target: null
                , className: null
                , parentNodeSpace: 0
                , parentNodeTop: 0
                , topGap: 10
            }, opt);

            /**
             * 获取一行能放多少个
             * @param parentNodeSpace  父元素的padding或者margin
             * @param width 图片宽度
             * @returns {number}
             */
            function getCount(parentNodeSpace, width) {
                return Math.floor(($(doc).width() - parentNodeSpace * 2) / width);
            }

            /**
             * 模拟JQuery GET获取数据
             * @param url 请求地址
             * @param param 请求参数
             * @param fn 回调函数
             */
            function getData(url, param, fn) {
                param.pageNumber = param.pageNumber || 1;
                var i = 0;
                var arr = [];
                while (i <= param.count) {
                    i++;
                    arr.push(url + i + '.jpg');
                }
                fn && fn({
                    imgSrcArray: arr,
                    pageNumber: ++param.pageNumber
                });
            }

            //存放图片高度的数组
            var _imgArr = [];
            //渲染
            function render() {
                var count = getCount(opt.parentNodeSpace, opt.width);
                $('[data-img]').each(function (index) {
                    var height = $(this).height();
                    if (index < count) {
                        _imgArr[index] = height;
                    } else {
                        var minHeight = Math.min.apply(null, _imgArr);
                        var minIndex = $.inArray(minHeight, _imgArr);
                        $(this).css({
                            "position": "absolute",
                            "top": minHeight + opt.parentNodeTop + opt.topGap,
                            "left": $('[data-img]').eq(minIndex).position().left
                        });
                        _imgArr[minIndex] += $(this).height() + opt.topGap;
                    }
                });
            }

            /**
             * 页面初始化
             * @param fn 回调
             */
            function show(fn) {
                getData(opt.url, {
                    count: getCount(opt.parentNodeSpace, opt.width)
                }, function (data) {
                    $(opt.target).append($.map(data.imgSrcArray, function (item) {
                        return '<img data-img class="' + opt.className + '" src="' + item + '" width="' + opt.width + '" />';
                    }));
                    fn && fn();
                });

                setTimeout(function () {
                    if (Math.max.apply(null, _imgArr) < innerHeight) {
                        show(render);
                    }
                }, 500);
            }

            show(function () {
                $(window).load(function () {
                    render();
                });
            });

            return {
                load: function () {
                    show(render);
                }
            };
        }
    });
})(jQuery, document);