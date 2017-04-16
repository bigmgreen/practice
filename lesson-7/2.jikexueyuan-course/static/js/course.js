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

    /*   课程列表切换   */
    $('[data-class]').click(function () {
        var name = '';
        var list = $('#lessonList');
        if (this.tagName.toUpperCase() === 'I') {
            name = $(this).parent().data('class');
        } else {
            name = $(this).data('class');
        }
        if (name === 'lesson-list') {
            list.find('.learn-number').hide();
            list.find('.level').hide();
            list.removeClass('lesson-list2').addClass('lesson-list');
        } else {
            list.find('.learn-number').show();
            list.find('.level').show();
            list.removeClass('lesson-list').addClass('lesson-list2');
        }
    });

    /*   课程列表动态效果   */
    $('#lessonList').find('li').hover(function () {
        $(this).find('.lesson-play').stop(true);
        $(this).find('.lesson-info').stop(true);
        $(this).find('p').stop(true);
        $(this).find('.lesson-play').animate({'opacity': 1}, 500);
        $(this).find('.user-action').show();
        if ($(this).parents('.lesson-list2').length) {
            return false;
        }
        $(this).find('.learn-number').show();
        $(this).find('.level').show();
        $(this).find('.lesson-info').animate({'height': 175 + 'px'}, 500);
        $(this).find('p').animate({
            height: 52 + 'px',
            opacity: 1
        }, 500);
    }, function () {
        $(this).find('.user-action').hide();
        $(this).find('.lesson-play').animate({'opacity': 0}, 500);
        if ($(this).parents('.lesson-list2').length) {
            return false;
        }
        $(this).find('.learn-number').hide();
        $(this).find('.level').hide();
        $(this).find('.lesson-info').animate({'height': 88 + 'px'}, 500);
        $(this).find('p').animate({
            height: 0 + 'px',
            opacity: 0
        }, 500);
    });

});