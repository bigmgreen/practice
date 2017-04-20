$(function () {
    /*
     * 皮肤相关操作
     * */
    (function (doc) {
        var skin = $('#skin');
        var imgs = $('[data-skin-img]');
        var opacity = $('#opacity');
        var skinPreviewImg = $('#skinPreviewImg');
        var skinPreview = $('#skinPreview');
        //点击图片效果
        imgs.click(function () {
            opacity.css('visibility', 'visible');
            skinPreviewImg.attr('src', $(this).attr('src'));
            var src = $(this).data('src');
            $('body').append('<div class="skin-bg" style="background-image: url(' + src + ');"></div>>');
        }).hover(function () {
            skinPreviewImg.attr('src', $(this).attr('src'));
            skinPreview.css('background-position', '0 0');
        }, function () {
            skinPreviewImg.attr('src', '');
            skinPreview.css('background-position', '-275px 0');
        });

        //开启皮肤
        $('#showSkin').click(function (e) {
            skin.css('top', 0);
            e.preventDefault();
            e.stopPropagation();
        });
        //收起皮肤
        $('#skinClose').click(function (e) {
            skin.css('top', -500);
            e.preventDefault();
        });

        //自动收起
        $(doc).click(function (e) {
            if ($(e.target).parents('#skin').length === 0) {
                skin.css('top', -500);
            }
        });
    })(document);
});