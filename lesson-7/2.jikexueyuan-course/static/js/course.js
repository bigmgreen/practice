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

    $('#lessonList').find('li').hover(function () {
        $(this).find('.user-action').show();
        $(this).find('.learn-number').show();
        $(this).find('.level').show();
        $(this).find('.lesson-play').animate({'opacity': 1}, 500);
        $(this).find('.lesson-info').animate({'height': 175 + 'px'}, 500);
        $(this).find('p').animate({
            height: 52 + 'px',
            opacity: 1
        }, 500);
    }, function () {
        $(this).find('.user-action').hide();
        $(this).find('.learn-number').hide();
        $(this).find('.level').hide();
        $(this).find('.lesson-play').animate({'opacity': 0}, 500);
        $(this).find('.lesson-info').animate({'height': 88 + 'px'}, 500);
        $(this).find('p').animate({
            height: 0 + 'px',
            opacity: 0
        }, 500);
    });

});