$(function () {

    /**
     * ajax的基本设置
     */
    $.ajaxSetup({
        beforeSend: function () {
            app.body.append('<div class="spinner"></div>');
        },
        complete: function () {
            $('.spinner').remove();
        }
    });

    var app = {
        updateModalHtml: $('#modalTemplate').html(),
        cache: null,
        msg: $('#msg'),
        body: $('body'),
        addModal: $('#addModal'),
        delModal: $('#delModal'),
        onModal: $('#onModal'),
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
                setStorage(location.href +'_index', $(this).index());
                that._setPageTitle();
                that.load($(this).data('type'), 0);
            });

            var index = getStorage(location.href +'_index') || 0;
            $(this.left[index]).trigger('click');
        },
        /**
         * 编译模板
         * @param data
         */
        _render: function (data) {
            this.main.html(Handlebars.compile(this.template.html())(data));

            /**
             * 初始化泡泡
             */
            $('[data-del]').popover({
                title: '提示',
                trigger: 'hover',
                content: '删除后可在回收站恢复',
                placement: 'top'
            });
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
                that.cache = data.list;
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
                    that.focus();
                    that.next().show();
                    return false;
                }
                that.next().hide();
                return true;
            });
        },
        /**
         * 提示信息
         */
        msgFn: function (msg) {
            app.msg.find('strong').html(msg);
            app.msg.fadeIn();
            setTimeout(function () {
                app.msg.fadeOut();
            }, 2000);
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
     * 格式化年月日
     */
    Handlebars.registerHelper("formatDate", function (date, options) {
        return date && date.split(' ')[0];
    });

    /**
     * 根据条件返回bool
     */
    Handlebars.registerHelper('bool', function (v1, v2, options) {

        if (v2 === 'length') {
            v2 = options.data.root.totalPage.length - 1;
        }

        if (v1 == v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    /**
     * 分页操作
     */
    app.body.on('click', '[data-page]', function () {
        app.load(app.type, $(this).data('page'));
    });

    /**
     * 添加操作
     */
    $('#addSave').click(function () {
        var form = app.addModal.find('form');
        if (app.validate(form)) {
            $.post('../server/add.php', form.serialize() + '&type=' + app.type).done(function (data) {
                if (data === true) {
                    app.msgFn('添加成功');
                    form[0].reset();
                    app.addModal.modal('hide');
                    app.load(app.type, 0);
                }
            }).fail(function (err) {
                console.log(err);
            });
        }
    });

    /**
     * 修改操作
     */
    app.body.on('click', '[data-update]', function () {

        var id = $(this).data('id');
        var data = null;

        app.cache.every(function (item) {
            if (id == item.id) {
                data = item;
                return false;
            }
            return true;
        });

        app.body.append(Handlebars.compile(app.updateModalHtml)(data));

        var modal = app.body.find('[data-update-modal]');
        modal.modal();
        modal.on('hidden.bs.modal', function () {
            modal.remove();
            modal = null;
        });

        modal.find('[data-update-save]').click(function () {
            var form = modal.find('form');
            if (app.validate(form)) {
                $.post('../server/update.php', form.serialize() + '&type=' + app.type + '&id=' + id).done(function (data) {
                    if (data === true) {
                        app.msgFn('编辑成功');
                        form[0].reset();
                        modal.modal('hide');
                        app.load(app.type, 0);
                    }
                }).fail(function (err) {
                    console.log(err);
                });
            }
        });
    });

    /**
     * 删除操作
     */
    (function () {

        var id = null;

        app.body.on('click', '[data-del]', function () {
            id = $(this).data('id');
            app.delModal.modal();
        });

        $('#delSave').click(function () {
            $.post('../server/del.php', 'id=' + id).done(function (data) {
                if (data === true) {
                    app.msgFn('删除成功');
                    app.delModal.modal('hide');
                    app.load(app.type, 0);
                }
            }).fail(function (err) {
                console.log(err);
            });
        });

    })();

    /**
     * 恢复操作
     */
    (function () {

        var id = null;

        app.body.on('click', '[data-on]', function () {
            id = $(this).data('id');
            app.onModal.modal();
        });

        $('#onSave').click(function () {
            $.post('../server/recovery.php', 'id=' + id).done(function (data) {
                if (data === true) {
                    app.msgFn('恢复成功');
                    app.onModal.modal('hide');
                    app.load(app.type, 0);
                }
            }).fail(function (err) {
                console.log(err);
            });
        });

    })();
});