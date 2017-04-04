$(function () {

    /*   fullPage  初始化   */
    $('#fullPage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#a29971', '#87b0a5', '#4d5e8f'],
        scrollingSpeed: 300,
        navigation: true,
        navigationPosition: 'right',
        onLeave: function (index, nextIndex, direction) {
            $(this).find('[data-animate]').map(function () {
                $(this).removeClass($(this).data('init'));
            });

            var relate = null;
            if (direction == 'down') {
                relate = $(this).next();
            } else {
                relate = $(this).prev();
            }

            relate.find('[data-animate]').map(function () {
                $(this).addClass($(this).data('init'));
            });
        }
    });

    /*   页面动画设置   */
    $('[data-animate]').hover(function () {
        $(this).removeClass($(this).data('init')).addClass($(this).data('animate'));
    }, function () {
        $(this).removeClass($(this).data('animate'));
    });

    /*   首屏动画设置   */
    $('.section').first().find('[data-animate]').map(function () {
        $(this).addClass($(this).data('init'));
    });

    /*   计算工作年份   */
    $('#year').html((function () {
        return new Date().getFullYear() - 2014;
    }()));
});