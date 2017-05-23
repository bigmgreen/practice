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

    /*
     * 滚动监听
     * */
    $(window).scroll(throttle(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {

        }
    }));
});

var app = angular.module('shopCart', []);

app.controller('shopCartController', function ($scope) {
    $scope.recommendList = [
        {
            url: './static/img/58f709adN45511018.jpg'
            , desc: '小米6 全网通 6GB+64GB 亮黑色 移动联通电信4G手机 双卡双待'
            , price: [2499, '00']
            , id: 1
        }
    ];
});
