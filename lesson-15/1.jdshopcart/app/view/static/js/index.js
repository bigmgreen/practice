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
     */
    $scope.showAddCart = function (shopId, id) {
        $scope.isShowAddCart = true;
        $http.get('/queryAddCart', {params: {shopId: shopId, id: id}}).success(function (data) {
            $scope.addCartInfo = data;
        });
    };

    /**
     * 添加到购物车的操作
     * @param shopId 店铺id
     * @param id 商品id
     */
    $scope.addCart = function () {

        $http.post('/addCartInfo', $scope.addCartInfo).success(function (data) {
            if (data) {
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
        var count = $scope[attrName].count;
        // var _price = $scope.addCartInfo.price.join('.') / $scope[attrName].count;
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

        // $scope.addCartInfo.price = (_price * $scope[attrName].count).toFixed(2).split('.');
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
        info.specifications[1] = sku.version.list[0].name;
        $scope.addCartInfo.count = 1;
        $scope.disabled_1 = 'disabled';
        $scope.disabled_9999 = '';
    };
});
