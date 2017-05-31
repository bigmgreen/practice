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

});

var app = angular.module('shopCart', []);

app.controller('shopCartController', function ($scope, $http) {
    //推荐列表
    $scope.recommendList = [];
    //购物车列表
    $scope.shopCart = [];
    //筛选初始文字
    $scope.selectText = '全部商品';
    //筛选初始文字显示
    $scope.selected = ['selected'];
    //tip提示是否显示
    $scope.isTipShow = false;
    //减法初始状态
    $scope.disabled_1 = 'disabled';
    //加法初始状态
    $scope.disabled_9999 = '';
    //颜色选中状态
    $scope.skuItemColorSelected = [' active '];
    //版本选中状态
    $scope.skuItemVersionSelected = [' active '];
    //tip文本
    $scope.cartMessage = '添加成功';
    //总价格
    $scope.totalPrice = 0;
    //筛选是否可用
    $scope.isSelectQueryEnable = true;
    //是否显示删除弹窗
    $scope.isDelShow = false;
    //购物车空空如也
    $scope.isDelEmptyShow = false;
    //是否显示没有选择弹窗
    $scope.isDelNullShow = false;
    //需要删除的id数组
    $scope.values = [];
    //当前选中商品总数
    $scope.selectGoodsTotal = 0;

    /**
     * 初始化页面数据
     */
    $http.get('/queryData').success(function (data) {
        $scope.shopCart = data.shopCart;
        $scope.recommendList = data.recommendList;
        $scope.isShow = false;
    });

    /**
     * 筛选
     * @param type 类别
     * @param text 文字显示
     */
    $scope.queryShopCart = function (type, text) {
        $scope.isShow = false;
        $scope.selectText = text;

        var arr = new Array(type + 1);
        arr[type] = 'selected';
        $scope.selected = arr;

        $http.get('/queryShopCart', {params: {type: type}}).success(function (data) {
            $scope.shopCart = data;
        });
    };

    /**
     * 显示添加购物车面板
     * @param shopId 店铺id
     * @param id 商品id
     * @param isUpdate 是否是编辑操作
     */
    $scope.showAddCart = function (shopId, id, isUpdate) {

        if (isUpdate) {
            $http.get('/queryUpdateCart', {params: {shopId: shopId, id: id}}).success(function (data) {
                $scope.addCartInfo = data;
                $scope.itemSelect('skuItemColorSelected', data.sku.color.select);
                $scope.itemSelect('skuItemVersionSelected', data.sku.version.select);
                $scope.isShowAddCart = true;
                $scope.isUpdate = true;
            });
        } else {
            $http.get('/queryAddCart', {params: {shopId: shopId, id: id}}).success(function (data) {
                $scope.addCartInfo = data;
                $scope.isShowAddCart = true;
                $scope.isUpdate = false;
            });
        }

    };

    /**
     * 添加到购物车的操作
     */
    $scope.addCart = function () {

        var url = '';
        if ($scope.isUpdate) {
            url = 'updateCartInfo';
            $scope.cartMessage = '编辑成功';
        } else {
            url = '/addCartInfo';
            $scope.cartMessage = '添加成功';
        }

        $http.post(url, $scope.addCartInfo).success(function (data) {
            if (data.isOk == 1) {

                $scope.shopCart = data.info;
                $scope.totalPrice = 0;
                $('[type="checkbox"]').map(function (index, item) {
                    $(item).data('checked', false);
                    item.checked = false;
                });

                $scope.isTipShow = true;
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.isTipShow = false;
                    });
                }, 1000);
                $scope.closeCart();
                $scope._switchStatus();
            } else {
                alert('内部错误，请稍候重试！')
            }
        });
    };

    /**
     * 商品加减
     * @param attrName 操作名称
     * @param num 累加尺度
     */
    $scope.calculation = function (attrName, num) {
        count = $scope[attrName].count;
        if (num == 1) {
            if (count < 9999 && $scope.disabled_9999 == '') {
                $scope[attrName].count += num;

                if ($scope[attrName].count == 9999) {
                    $scope.disabled_9999 = 'disabled';
                }
                if ($scope.disabled_1 != '') {
                    $scope.disabled_1 = '';
                }
            }
        } else if (num == -1) {
            if (count > 1 && $scope.disabled_1 == '') {
                $scope[attrName].count += num;

                if ($scope[attrName].count == 1) {
                    $scope.disabled_1 = 'disabled';
                }
                if ($scope.disabled_9999 != '') {
                    $scope.disabled_9999 = '';
                }
            }
        }
    };

    /**
     * 购物车商品加减
     * @param index 序号
     * @param _index 序号
     * @param num 累加尺度
     */
    $scope.calculationCart = function (index, _index, num, event) {
        var shopCart = $scope.shopCart;
        var info = shopCart[index].item[_index];
        count = info.count;

        var check = angular.element(event.target).parents('.cart-list-item').find('[data-sub-class]')[_index].checked;

        var _price = info.price.join('.');
        if (num == 1) {
            if (count < 9999) {
                info.count += num;
                calculate();
                if (check) {
                    $scope.totalPrice = (parseFloat($scope.totalPrice) + parseFloat(_price)).toFixed(2);
                }
            }
        } else if (num == -1) {
            if (count > 1) {
                info.count += num;
                calculate();
                if (check) {
                    $scope.totalPrice = (parseFloat($scope.totalPrice) - parseFloat(_price)).toFixed(2);
                }
            }
        }

        $(event.target).parents('.cart-info').find('[data-sub-class]').data('count', info.count);

        function calculate() {
            $http.post('/updateCartCount', {shopId: info.shopId, id: info.id, count: info.count})
                .success(function (data) {
                        if (data) {
                            $scope.cartMessage = '编辑成功';
                            $scope.isTipShow = true;
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    $scope.isTipShow = false;
                                });
                            }, 1000);
                        }
                    }
                );
        }

        $scope._switchStatus();
    };

    /**
     * 购物车属性设置
     * @param attrName 操作类别名称
     * @param index 序号
     */
    $scope.itemSelect = function (attrName, index) {
        var arr = new Array(index + 1);
        arr[index] = 'active';
        $scope[attrName] = arr;

        var info = $scope.addCartInfo;
        var sku = info.sku;
        if (attrName == 'skuItemColorSelected') {
            sku.color.select = index;
            info.specifications[0] = sku.color.list[index].name;

            var colorAddPrice = parseInt(sku.color.list[index].addPrice);
            if (sku.color.oldAddPrice) {
                info.price[0] = parseInt(info.price[0]) - sku.color.oldAddPrice + colorAddPrice;
            } else {
                info.price[0] = parseInt(info.price[0]) + colorAddPrice;
            }

            sku.color.oldAddPrice = colorAddPrice;
        } else {
            sku.version.select = index;
            info.specifications[1] = sku.version.list[index].name;

            var versionAddPrice = parseInt(sku.version.list[index].addPrice);
            if (sku.version.oldAddPrice) {
                info.price[0] = parseInt(info.price[0]) - sku.version.oldAddPrice + versionAddPrice;
            } else {
                info.price[0] = parseInt(info.price[0]) + versionAddPrice;
            }

            sku.version.oldAddPrice = versionAddPrice;
        }
    };

    /**
     * 关闭添加面板
     */
    $scope.closeCart = function () {
        $scope.isShowAddCart = false;
        $scope.skuItemColorSelected = [' active '];
        $scope.skuItemVersionSelected = [' active '];
        var info = $scope.addCartInfo;
        var sku = info.sku;
        info.specifications[0] = sku.color.list[0].name;
        if (sku.version) {
            info.specifications[1] = sku.version.list[0].name;
        }
        $scope.addCartInfo.count = 1;
        $scope.disabled_1 = 'disabled';
        $scope.disabled_9999 = '';
    };

    /**
     * 全选操作
     */
    $scope.checkAll = function (type, event) {

        var input = angular.element('[data-class]');
        var subInput = angular.element('[data-sub-class]');
        var isCheck = event.target.checked;

        input.map(function (index, item) {
            item.checked = isCheck;
        });
        subInput.map(function (index, item) {
            item.checked = isCheck;
        });

        if (isCheck) {
            $scope.totalPrice = 0;
            $scope.shopCart.forEach(function (item) {
                item.item.forEach(function (_item) {
                    var num = parseFloat(_item.price.join('.'));
                    $scope.totalPrice = (parseFloat($scope.totalPrice) + num * _item.count).toFixed(2);
                });
            });
        } else {
            $scope.totalPrice = 0;
            $('#checkAll')[0].checked = isCheck;
        }

        $scope._switchStatus();
    };

    /**
     * 计算价格
     */
    $scope.sum = function (item, event) {

        var superInput = angular.element('[data-class]');
        var input = angular.element(event.target).parents('.cart-list-item').find('[data-sub-class]');
        var isCheck = event.target.checked;

        input.map(function (index, item) {
            item.checked = isCheck;
        });

        item.item.forEach(function (_item) {
            var num = parseFloat(_item.price.join('.'));
            if (isCheck) {
                $scope.totalPrice = (parseFloat($scope.totalPrice) + num * _item.count).toFixed(2);

                var flag = Array.prototype.every.call(superInput, function (item) {
                    return item.checked;
                });

                if (flag) {
                    angular.element('#checkAll')[0].checked = isCheck;
                }

            } else {
                $scope.totalPrice = (parseFloat($scope.totalPrice) - num * _item.count).toFixed(2);
                angular.element('#checkAll')[0].checked = isCheck;
            }
        });
        $scope._switchStatus();
    };

    /**
     * 计算价格
     */
    $scope.subSum = function (price, count, event) {

        var parent = angular.element(event.target).parents('.cart-list-item');
        var superInput = parent.find('[data-class]');
        var siblingsInput = parent.find('.cart-info-wrap');
        var num = parseFloat(price.join('.'));
        var temp = parseFloat($scope.totalPrice);
        var isCheck = event.target.checked;

        if (isCheck) {
            $scope.totalPrice = (temp + num * count).toFixed(2);

            var flag = Array.prototype.every.call(siblingsInput, function (item) {
                return $(item).find('[data-sub-class]')[0].checked;
            });

            if (flag) {
                superInput[0].checked = flag;
            }

            var superInputs = angular.element('[data-class]');
            var flags = Array.prototype.every.call(superInputs, function (item) {
                return item.checked;
            });

            if (flags) {
                angular.element('#checkAll')[0].checked = flags;
            }
        } else {
            $scope.totalPrice = (temp - num * count).toFixed(2);
            angular.element('#checkAll')[0].checked = isCheck;
            superInput[0].checked = isCheck;
        }
        $scope._switchStatus();
    };

    /**
     * 删除操作
     * @param flag
     * @param event
     */
    $scope.update = function (flag, event) {
        var target = $(event.target);
        var text = target.text();

        if (text == '完成') {
            target.text('编辑');
            $scope.isSelectQueryEnable = true;
            $('#selectQuery').removeClass('disabled');
            $('[type="checkbox"]').map(function (index, item) {
                item.checked = $(item).data('checked');
            });
        } else {
            target.text('完成');
            $('#selectQuery').addClass('disabled');
            $scope.isSelectQueryEnable = false;
            $('[type="checkbox"]').map(function (index, item) {
                $(item).data('checked', item.checked);
                item.checked = false;
            });
        }

    };

    /**
     * 显示筛选
     */
    $scope.showQuery = function () {
        if ($scope.isSelectQueryEnable) {
            $scope.isShow = true;
        }
    };

    /**
     * 删除显示
     */
    $scope.delShow = function () {

        var isChecked = false;
        var inputs = $('[data-sub-class]');
        var values = [];

        function delayClear(attrName) {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope[attrName] = false;
                });
            }, 1000);
        }

        $scope.selectCount = 0;
        if (inputs.length > 0) {
            inputs.map(function (index, item) {
                if (item.checked) {
                    $scope.selectCount++;
                    isChecked = true;
                    values.push(item.value);
                }
            });
        } else {
            $scope.isDelEmptyShow = true;
            delayClear('isDelEmptyShow');
            return;
        }

        if (isChecked) {
            $scope.isDelShow = true;
            $scope.values = values;
        } else {
            $scope.isDelNullShow = true;
            delayClear('isDelNullShow');
        }

    };

    /**
     * 删除操作
     */
    $scope.del = function () {
        $scope.isDelShow = false;
        $http.post('/del', {ids: $scope.values})
            .success(function (data) {
                if (data.isOk == 1) {

                    $scope.shopCart = data.info;
                    $scope.totalPrice = 0;
                    $('[type="checkbox"]').map(function (index, item) {
                        $(item).data('checked', false);
                        item.checked = false;
                    });

                    $scope.cartMessage = '添加成功';
                    $scope.isTipShow = true;
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.isTipShow = false;
                        });
                    }, 1000);

                    $scope._switchStatus();
                } else {
                    alert('内部错误，请稍候重试！')
                }
            });
    }

    /**
     * 转换购买按钮状态
     * @private
     */
    $scope._switchStatus = function () {
        var count = 0;
        var isChecked = false;
        $('[data-sub-class]').map(function (index, item) {
            if (item.checked) {
                isChecked = true;
                count += parseInt($(item).data('count')) || 1;
            }
        });
        $scope.selectGoodsTotal = count;

        if (isChecked) {
            $('#btnToBuy').addClass('footer-btn-buy');
        } else {
            $('#btnToBuy').removeClass('footer-btn-buy');
        }
    };
});