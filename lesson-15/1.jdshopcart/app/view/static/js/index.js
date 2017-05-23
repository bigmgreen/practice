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
});

var app = angular.module('shopCart', []);

app.controller('shopCartController', function ($scope, $http) {
    $scope.recommendList = [];
    $scope.goods = goodsData;
    $http.get('/queryData').success(function (data) {
        data.forEach(function (item, index) {
            data[index]['price'] = item['price'].toFixed(2).split('.');
        });
        $scope.recommendList = data;
    });
});
