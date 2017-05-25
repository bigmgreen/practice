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


    // /**
    //  * ajax的基本设置
    //  */
    // $.ajaxSetup({
    //     beforeSend: function () {
    //         $('body').append('<div class="spinner"></div>');
    //     },
    //     complete: function () {
    //         setTimeout(function () {
    //             $('.spinner').remove();
    //         }, 500);
    //     }
    // });
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
                $scope.isCheck = false;
                // $scope.checkAll(false);

                $scope.isTipShow = true;
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.isTipShow = false;
                    });
                }, 1000);
                $scope.closeCart();
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
     * @param check 是否选择
     * @param num 累加尺度
     */
    $scope.calculationCart = function (index, _index, check, num) {
        var shopCart = $scope.shopCart;
        var info = shopCart[index].item[_index];
        count = info.count;

        var _price = $scope.addCartInfo.price.join('.');
        if (num == 1) {
            if (count < 9999) {
                info.count += num;
                if(check) {
                    $scope.totalPrice = (parseFloat($scope.totalPrice) + _price * (info.count - 1)).toFixed(2);
                }
            }
        } else if (num == -1) {
            if (count > 1) {
                info.count += num;
                if (check) {
                    $scope.totalPrice = (parseFloat($scope.totalPrice) - _price * (info.count - 1)).toFixed(2);
                }
            }
        }

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
            });
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
    $scope.checkAll = function (type,event) {

        var input = angular.element('[data-class]');
        var subInput = angular.element('[data-sub-class]');
        var isCheck = event.target.checked;

        input.map(function (index, item) {
            item.checked = isCheck;
        });
        subInput.map(function (index,item) {
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
        }
    };

    /**
     * 计算价格
     */
    $scope.sum = function (check, item) {

        item.item.forEach(function (_item) {
            var num = parseFloat(_item.price.join('.'));
            if (check) {
                $scope.totalPrice = (parseFloat($scope.totalPrice) + num * _item.count).toFixed(2);
            } else {
                $scope.totalPrice = (parseFloat($scope.totalPrice) - num * _item.count).toFixed(2);
                $scope.isCheck = false;
            }
        });
    };

    /**
     * 计算价格
     */
    $scope.subSum = function (check, price, count, parent) {

        var num = parseFloat(price.join('.'));
        var temp = parseFloat($scope.totalPrice);

        if (check) {
            $scope.totalPrice = (temp + num * count).toFixed(2);
            parent.checkedSub=true;
        } else {
            $scope.totalPrice = (temp - num * count).toFixed(2);
            $scope.isCheck = false;
        }
    }
});


function log(str) {
    console.log(str);
}