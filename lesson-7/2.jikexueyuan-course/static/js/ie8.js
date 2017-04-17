$(function () {
    /*
    * 关闭广告
    * */
    $('#closeAd').click(function () {
        $(this).parents('.ad-layer').fadeOut();
    });

    //搜索框
    var wrap = $('#searchWrap');

    /*
    * 显示搜索框
    * */
    $('#searchBox').click(function () {
        wrap.fadeIn();
    });

    /*
    * 关闭搜索框
    * */
    wrap.find('.close-icon').click(function () {
        wrap.hide();
        input.val(input.attr('placeholder'));
    });

    //输入框
    var input = $('#searchContent');
    input.val(input.attr('placeholder'));
    /*
    * 设置水印
    * */
    input.focus(function () {
        input.val('');
    }).blur(function () {
        if (input.val() == '') {
            input.val(input.attr('placeholder'));
        }
    });
});