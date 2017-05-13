$(function () {

    /**
     * 单例模式
     * 原因：统一管理变量存储和函数调用
     * 优点：缓存变量加快访问速度，降低函数调用复杂度
     */
    var app = {
        searchWrap: $('#searchWrap')
        , win: $(window)
        , doc: $(document)
        , body: $('body')
        , top: $('#goTop')
        , focus: $('#myFocusSwitch')
        , dataTab: $('[data-tab]')
        , loadMore: $('#loadMore')
        , main: $('#main')
        , searchInit: function () {
            /*
             * 滚动到一定位置固定搜索框
             * */
            app._scroll(function () {
                if ($(this).scrollTop() >= 210) {
                    app.searchWrap.addClass('active');
                } else {
                    app.searchWrap.removeClass('active');
                }
            });
        }
        , toTopInit: function () {
            /*
             * 回到顶部
             */
            app.top.hide();
            app._scroll(function () {
                if ($(this).scrollTop() <= 10) {
                    app.top.fadeOut(500);
                } else {
                    app.top.fadeIn(500);
                }
            });
            app.top.click(function () {
                if (app.win.scrollTop() <= 10) {
                    return false;
                }
                app.body.animate({
                    scrollTop: 0
                }, 200);
                return false;
            });
        }
        , focusNavInit: function () {
            /*
             * 我的关注隐藏显示
             * */
            app.focus.click(function () {
                $(this).parent().toggleClass('close');
            });
        }
        , loadMoreInit: function () {
            /*
             * 滚动加载更多
             * */
            function load() {
                var tab = app.dataTab.parent().find('.active').data('tab');
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

            /*
             *  点击加载更多
             * */
            app.loadMore.click(load);

            /*
             * 滚动加载更多
             * */
            app._scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {
                    load();
                }
            });
        }
        , tabInit: function () {
            /*
             * tab切换
             * */
            app.dataTab.click(function () {
                var old = $(this).siblings('.active');
                old.removeClass('active');
                $(old.data('tab')).removeClass('active');
                $(this).addClass('active');
                $($(this).data('tab')).addClass('active');
                setStorage('baidu_tab', '[data-tab=' + $(this).data('tab') + ']');

                var tab = $(this).data('tab');
                if (tab != '#myNav' && tab != '#myFocus') {
                    app.loadMore.fadeIn();
                } else {
                    app.loadMore.hide();
                }
            });
            /**
             * 读取历史操作
             */
            var tab = getStorage('baidu_tab');
            if (tab) {
                $(tab).trigger('click');
            }
            app.main.css('visibility', 'visible');
        }
        /**
         * 皮肤相关操作
         */
        , skin: {
            skin: $('#skin')
            , skins: $('#skins')
            , imgs: $('[data-skin-img]')
            , opacity: $('#opacity')
            , skinPreviewImg: $('#skinPreviewImg')
            , skinPreview: $('#skinPreview')
            , skinBg: $('#skinBg')
            , show: $('#showSkin')
            , hide: $('#skinClose')
            , opacityVal: $('#opacityVal')
            , opacitySlide: $('#opacitySlide')
            , closeSkin: $('#closeSkin')
            , showHideClick: function () {

                var _this = this;

                //开启皮肤
                _this.show.click(function (e) {
                    _this.skin.css('top', 0);
                    e.preventDefault();
                    e.stopPropagation();
                });
                //收起皮肤
                _this.hide.click(function (e) {
                    _this.skin.css('top', -500);
                    e.preventDefault();
                });

                //自动收起
                app.doc.click(function (e) {
                    if ($(e.target).parents('#skin').length === 0) {
                        _this.skin.css('top', -500);
                    }
                });
            }
            , loadInit: function () {
                var src = getStorage('baidu_skin_src');
                var item = null;
                if (src) {
                    item = src.split('=');
                    this.skinBg.css('background-image', "url(" + item[0] + ")");
                    this.skinPreview.css('background-position', '0 0');
                    var selected = $(this.imgs[item[1]]);
                    this.skinPreviewImg.attr('src', selected.attr('src'));
                    selected.parent().addClass('selected');
                    this.opacity.css('visibility', 'visible');
                    app.body.addClass('set-skin');
                }
            }
            , imgHandleClick: function () {
                var _this = this;
                this.imgs.click(function () {
                    _this.opacity.css('visibility', 'visible');
                    _this.skinPreviewImg.attr('src', $(this).attr('src'));
                    var src = $(this).data('src');
                    _this.skinBg.css('background-image', "url(" + src + ")");
                    _this.skins.find('.selected').removeClass('selected');
                    $(this).parent().addClass('selected');
                    app.body.addClass('set-skin');
                    setStorage('baidu_skin_src', src + '=' + $(this).parent().index());
                }).hover(function () {
                    _this.skinPreviewImg.attr('src', $(this).attr('src'));
                    _this.skinPreview.css('background-position', '0 0');
                }, function () {
                    var selected = _this.skins.find('.selected');
                    if (selected.length > 0) {
                        _this.skinPreviewImg.attr('src', selected.find('img').attr('src'));
                        _this.skinPreview.css('background-position', '0 0');
                    } else {
                        _this.skinPreviewImg.attr('src', '');
                        _this.skinPreview.css('background-position', '-275px 0');
                    }
                });
            }
            , resetSkin: function () {
                var _this = this;
                this.closeSkin.click(function () {
                    _this.skinBg.css('background-image', "url()");
                    _this.skinPreviewImg.attr('src', '');
                    _this.skins.find('.selected').removeClass('selected');
                    _this.skinPreview.css('background-position', '-275px 0');
                    setStorage('baidu_skin_src', '');
                    setStorage('baidu_opacity', 80);
                    app.main.css('background-color', 'rgba(255,255,255,1)');
                    _this.opacityVal.html('100%');
                    _this.opacitySlide.css('left', 80);
                    $('body').removeClass('set-skin');
                });
            }
            , opacityHandlerChange: function () {
                new scale('opacitySlide', 'opacityLine', 'opacityVal', {
                    scroll: 'opacityScroll'
                    , value: getStorage('baidu_opacity')
                    , max: 80
                    , fn: function (pos) {
                        app.main.css('background-color', 'rgba(255,255,255,' + pos / 80 + ')');
                        setStorage('baidu_opacity', pos);
                    }
                    , init: function (pos) {
                        app.main.css('background-color', 'rgba(255,255,255,' + pos / 80 + ')');
                    }
                });
            }
            /**
             * 外观模式
             * 原因：提供皮肤操作js函数调用的统一入口
             * 优点：页面功能一目了然，方便管理调度
             */
            , init: function () {
                /**
                 * 皮肤显示隐藏
                 */
                this.showHideClick();
                /**
                 * 加载上一次的皮肤设置
                 */
                this.loadInit();
                /**
                 * 点击图片的效果
                 */
                this.imgHandleClick();
                /**
                 * 取消皮肤事件绑定
                 */
                this.resetSkin();
                /**
                 * 初始化透明滑块
                 */
                this.opacityHandlerChange();
            }
        }
        /**
         * 外观模式
         * 原因：提供一个页面js函数调用的统一入口
         * 优点：页面功能一目了然，方便管理调度
         */
        , init: function () {
            /**
             * 页面tab组件初始化
             */
            this.tabInit();
            /**
             * 滚动时显示固定位置搜索框组件初始化
             */
            this.searchInit();
            /**
             * 回到顶部组件初始化
             */
            this.toTopInit();
            /**
             * 我的关注下面的我的导航显示隐藏事件绑定
             */
            this.focusNavInit();
            /**
             * 加载更多组件初始化
             */
            this.loadMoreInit();
            /**
             * 皮肤操作组件初始化
             */
            this.skin.init();
        }
        /**
         * 外观模式
         * 原因：页面滚动事件需要降频处理
         * 优点：在需要监听滚动时只需要按照jQuery的事件绑定写法来写即可
         */
        , _scroll: function (fn) {
            app.win.scroll(throttle(fn, 66));
        }
    };

    /**
     * 页面js代码运行总入口
     */
    app.init();
});