$(function () {

    /**
     * ajax的基本设置
     */
    $.ajaxSetup({
        beforeSend: function () {
            $('body').append('<div class="spinner"></div>');
        },
        complete: function () {
            $('.spinner').remove();
        }
    });

    var app = {
        addModal: $('#addModal'),
        left: $('#accordion').find('[data-type]'),
        title: $('#pageTitle'),
        main: $('#main'),
        template: $('#template'),
        currentPage: 0,
        type: 0,
        /**
         * 初始化
         */
        init: function () {
            this._leftHandler();
            this._setPageTitle();
        },
        /**
         * 设置主内容标题
         */
        _setPageTitle: function () {
            this.title.html(this.left.siblings('.active').data('text'));
        },
        /**
         * 左菜单点击事件处理
         */
        _leftHandler: function () {
            var that = this;
            this.left.click(function () {
                $(this).addClass('active').siblings('.active').removeClass('active');
                that._setPageTitle();
                that.load($(this).data('type'), 0);
            });
            this.left.siblings('.active').trigger('click');
        },
        /**
         * 编译模板
         * @param data
         */
        _render: function (data) {
            this.main.html(Handlebars.compile(this.template.html())(data));
        },
        /**
         * 加载数据
         * @param type
         * @param pageNumber
         */
        load: function (type, pageNumber) {

            this.currentPage = (typeof pageNumber === 'undefined') ? ++this.currentPage : pageNumber;
            this.type = (typeof type === 'undefined') ? this.type : type;
            var that = this;

            $.get('../server/queryData.php', {
                type: this.type,
                pageNumber: this.currentPage
            }).done(function (data) {

                data.currentPage = that.currentPage;
                data.totalPage = new Array(data.totalPage);

                that._render(data);
                that.textHidden();

            }).fail(function (err) {
                console.log(err);
            });
        },
        /**
         * 设置td的长度
         */
        textHidden: function () {
            var width = parseInt($('table').width() / 10 * 3);
            $('[data-text-hidden]').each(
                function () {
                    $(this).width(width);
                }
            );
        },
        /**
         * 检验form输入合法性
         * @param form
         */
        validate: function (form) {

            return Array.prototype.slice.call(form.find('input')).every(function (item) {
                var that = $(item);
                if (that.val() === '') {
                    that.next().show();
                    return false;
                }
                that.next().hide();
                return true;
            });
        }
    };

    /**
     * 页面操作初始化
     */
    app.init();

    /*
     * 窗口尺寸监听
     * */
    $(window).resize(throttle(function () {
        app.textHidden();
    }));

    /**
     * 获取序号
     */
    Handlebars.registerHelper("index", function (index, currentPage, options) {
        return parseInt(index) + 1 + currentPage * 10;
    });

    /**
     * 加1
     */
    Handlebars.registerHelper("addOne", function (index, options) {
        return parseInt(index) + 1;
    });

    /**
     * 减一
     */
    Handlebars.registerHelper("reduceOne", function (index, options) {
        return parseInt(index) - 1;
    });

    /**
     * 根据条件返回bool
     */
    Handlebars.registerHelper('bool', function (v1, v2, options) {

        if (v2 === 'length') {
            v2 = options.data.root.totalPage.length - 1;
        }

        if (v1 === v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    /**
     * 分页操作
     */
    $('body').on('click', '[data-page]', function () {
        app.load(app.type, $(this).data('page'));
    });

    $('#addSave').click(function () {
        var form = $('form');
        if (app.validate(form)) {
            $.post('../server/add.php', form.serialize() + '&type=' + app.type).done(function (data) {
                if (data === true) {
                    form[0].reset();
                    app.addModal.modal('hide');
                    app.load(app.type, 0);
                    alert('添加成功!');
                }
            }).fail(function (err) {
                console.log(err);
            });
        }
    });
});