$(function () {

    /*
     * 滚动到一定位置固定搜索框
     * */
    (function () {
        var box = $('#searchWrap');
        $(window).scroll(throttle(function () {
            if ($(this).scrollTop() >= 210) {
                box.addClass('active');
            } else {
                box.removeClass('active');
            }
        }, 66));
    })();

    /*
     * 回到顶部
     */
    (function () {
        var top = $('#goTop');
        top.hide();
        $(window).scroll(throttle(function () {
            if ($(this).scrollTop() <= 10) {
                top.fadeOut(500);
            } else {
                top.fadeIn(500);
            }
        }));
        top.click(function () {
            if ($(window).scrollTop() <= 10) {
                return false;
            }
            $("body,html").animate({
                scrollTop: 0
            }, 200);
            return false;
        });
    })();

    /*
     * 皮肤相关操作
     * */
    (function (doc) {
        var skin = $('#skin');
        var skins = $('#skins');
        var imgs = $('[data-skin-img]');
        var opacity = $('#opacity');
        var skinPreviewImg = $('#skinPreviewImg');
        var skinPreview = $('#skinPreview');
        var skinBg = $('#skinBg');

        //加载上一次的皮肤设置
        (function () {
            var src = getStorage('baidu_skin_src');
            var item = null;
            if (src) {
                item = src.split('=');
                skinBg.css('background-image', "url(" + item[0] + ")");
                skinPreview.css('background-position', '0 0');
                var selected = $(imgs[item[1]]);
                skinPreviewImg.attr('src', selected.attr('src'));
                selected.parent().addClass('selected');
                opacity.css('visibility', 'visible');
                $('body').addClass('set-skin');
            }
        })();

        //点击图片效果
        imgs.click(function () {
            opacity.css('visibility', 'visible');
            skinPreviewImg.attr('src', $(this).attr('src'));
            var src = $(this).data('src');
            skinBg.css('background-image', "url(" + src + ")");
            skins.find('.selected').removeClass('selected');
            $(this).parent().addClass('selected');
            $('body').addClass('set-skin');
            setStorage('baidu_skin_src', src + '=' + $(this).parent().index());
        }).hover(function () {
            skinPreviewImg.attr('src', $(this).attr('src'));
            skinPreview.css('background-position', '0 0');
        }, function () {
            var selected = skins.find('.selected');
            if (selected.length > 0) {
                skinPreviewImg.attr('src', selected.find('img').attr('src'));
                skinPreview.css('background-position', '0 0');
            } else {
                skinPreviewImg.attr('src', '');
                skinPreview.css('background-position', '-275px 0');
            }
        });

        //取消皮肤
        $('#closeSkin').click(function () {
            skinBg.css('background-image', "url()");
            skinPreviewImg.attr('src', '');
            skins.find('.selected').removeClass('selected');
            skinPreview.css('background-position', '-275px 0');
            setStorage('baidu_skin_src', '');
            setStorage('baidu_opacity', 80);
            $('#main').css('background-color', 'rgba(255,255,255,1)');
            $('#opacityVal').html('100%');
            $('#opacitySlide').css('left', 80);
            $('body').removeClass('set-skin');
        });

        //开启皮肤
        $('#showSkin').click(function (e) {
            skin.css('top', 0);
            e.preventDefault();
            e.stopPropagation();
        });
        //收起皮肤
        $('#skinClose').click(function (e) {
            skin.css('top', -500);
            e.preventDefault();
        });

        //透明度设置
        (function () {
            //设置初始函数
            var scale = function (btn, bar, title, option) {
                this.btn = document.getElementById(btn);
                this.bar = document.getElementById(bar);
                this.title = document.getElementById(title);
                this.fn = option.fn || function () {
                        console.log('您没有传入回调函数！')
                    };
                if (option.scroll) {
                    this.step = document.getElementById(option.scroll);
                }
                this.max = option.max || 0;
                if (option.value == '') {
                    this.value = option.max;
                } else {
                    this.value = (option.value > option.max ? option.max : option.value) || 0;
                }

                option.init && option.init(this.value);

                this.init();
            };
            //设置鼠标函数
            scale.prototype = {
                init: function () {
                    var f = this, g = document, b = window, m = Math;

                    f.btn.style.left = f.value - 7 + 'px';
                    f.title.innerHTML = parseInt(f.value / 80 * 100) + '%';

                    f.btn.onmousedown = function (e) {
                        var x = (e || b.event).clientX;
                        var l = this.offsetLeft;
                        var max = f.bar.offsetWidth - this.offsetWidth;
                        g.onmousemove = function (e) {
                            var thisX = (e || b.event).clientX;
                            var to = m.min(max, m.max(-2, l + (thisX - x)));
                            f.btn.style.left = to + 'px';
                            f.ondrag(m.round(m.max(0, to / max) * f.max), to);
                            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                        };
                        g.onmouseup = function () {
                            this.onmousemove = null;
                        };
                    };
                },
                ondrag: function (pos, x) {
                    this.step && (this.step.style.width = Math.max(0, x) + 'px');
                    this.title.innerHTML = parseInt(pos / 80 * 100) + '%';
                    this.fn(pos);
                    setStorage('baidu_opacity', pos);
                }
            };
            //调用
            new scale('opacitySlide', 'opacityLine', 'opacityVal', {
                scroll: 'opacityScroll'
                , value: getStorage('baidu_opacity')
                , max: 80
                , fn: function (pos) {
                    $('#main').css('background-color', 'rgba(255,255,255,' + pos / 80 + ')');
                }
                , init: function (pos) {
                    $('#main').css('background-color', 'rgba(255,255,255,' + pos / 80 + ')');
                }
            });
        })();

        //自动收起
        $(doc).click(function (e) {
            if ($(e.target).parents('#skin').length === 0) {
                skin.css('top', -500);
            }
        });
    })(document);

    /*
     * tab切换
     * */
    (function () {
        var more = $('#loadMore');
        $('[data-tab]').click(function (e) {
            var old = $(this).siblings('.active');
            old.removeClass('active');
            $(old.data('tab')).removeClass('active');
            $(this).addClass('active');
            $($(this).data('tab')).addClass('active');
            setStorage('baidu_tab', '[data-tab=' + $(this).data('tab') + ']');

            var tab = $(this).data('tab');
            if (tab != '#myNav' && tab != '#myFocus') {
                more.fadeIn();
            } else {
                more.hide();
            }

        });

        var tab = getStorage('baidu_tab');
        if (tab) {
            $(tab).trigger('click');
        }
    })();

    /*
     * 我的关注隐藏显示
     * */
    $('#myFocusSwitch').click(function () {
        $(this).parent().toggleClass('close');
    });

    /*
     * 滚动加载更多
     * */
    (function () {
        function load() {
            var tab = $('[data-tab]').parent().find('.active').data('tab');
            if (tab != '#myNav' && tab != '#myFocus') {
                var jquery_tab = $(tab);
                if (tab == '#myIntro') {
                    jquery_tab.find('.tips-list').append(jquery_tab.find('[data-content]').first().html());
                } else if (tab == '#myVideo') {
                    jquery_tab.find('.my-video').append(jquery_tab.find('[data-content]').first().html());
                } else {
                    jquery_tab.find('.my-buy').append(jquery_tab.find('[data-content]').first().html());
                }
            }
        }

        $('#loadMore').click(load);

        /*
         * 滚动监听
         * */
        $(window).scroll(throttle(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight) {
                load();
            }
        }));
    })();
});