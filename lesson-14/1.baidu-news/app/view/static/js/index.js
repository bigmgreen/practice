$(function () {

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
     * 动态计算标签长度
     * */
    (function () {
        $('#navLinks').find('a').each(function () {
            if ($(this).html().length > 2) {
                $(this).parent().width((1 / 3 * 100) + '%');
            } else {
                $(this).parent().width((1 / 6 * 100) + '%');
            }
        });
    })();

    /**
     * ajax的基本设置
     */
    $.ajaxSetup({
        beforeSend: function () {
            $('body').append('<div class="spinner"></div>');
        },
        complete: function () {
            setTimeout(function () {
                $('.spinner').remove();
            }, 500);
        }
    });

    /*
     * 查询数据对象
     * */
    var QueryData = {
        INIT_PAGE: 0,
        currentPage: 0,
        type: 0,
        empty: null,
        target: $('#main'),
        load: function (type, pageNumber) {

            /**
             * 当某个列表数据没有数据时不再发起这个类别的请求
             */
            if (this.empty === type) {
                return;
            }

            this.currentPage = (typeof pageNumber === 'undefined') ? ++this.currentPage : pageNumber;
            this.type = (typeof type === 'undefined') ? this.type : type;
            var that = this;

            var currentPage = this.currentPage;

            $.get('/queryData', {
                type: this.type,
                pageNumber: this.currentPage
            }).done(function (data) {
                var empty = '<p class="empty">没有更多数据了！</p>';
                if (data.length === 0) {
                    that.empty = type;

                    if (currentPage ==0) {
                        that.target.html(empty);
                    } else {
                        that.target.append(empty);
                    }

                    return;
                }

                var html = that.render(data);

                if (data.length < 10) {
                    that.empty = type;
                    html.push(empty);
                }

                if (parseInt(pageNumber) === that.INIT_PAGE) {
                    that.target.html(html);
                } else {
                    that.target.append(html);
                }

            }).fail(function (err) {
                console.log(err);
            });
        },
        render: function (data) {
            return $.map(data, function (item) {
                var itemWrap = $('<div class="item"></div>');
                var img = $('<img class="item-img">').attr('src', item.imgSrc);
                var content = $('<div class="item-content"></div>');
                var h3 = $('<h3 class="item-title"></h3>').text(item.title);
                var foot = $('<div><span class="item-date">' + item.date + '</span><span class="item-from">' + item.from + '</span></div>');
                content.append(h3).append(foot);
                itemWrap.append(img).append(content);
                return itemWrap;
            });
        }
    };

    /*
     * 获取首屏数据
     * */
    QueryData.load(0, 0);

    /*
     * 查询对应新闻
     * */
    $('[data-type]').click(function () {
        $(this).addClass('active').siblings('.active').removeClass('active');
        QueryData.load($(this).data('type'), 0);
    });

    /*
     * 滚动监听
     * */
    $(window).scroll(throttle(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {
            QueryData.load(QueryData.type);
        }
    }));
});
