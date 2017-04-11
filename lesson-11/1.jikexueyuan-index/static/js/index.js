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

    /*
     *  banner
     */
    (function () {
        var n = new Swiper(".banner-container", {
            prevButton:'#bannerArrowLeft',
            nextButton:'#bannerArrowRight',
            pagination: ".banner-pagination",
            loop: !0,
            slidesPerView: 1,
            speed: 1e3,
            autoplay: 5e3,
            grabCursor: !0,
            height: 330,
            paginationClickable: !0
        });
        $(".banner-container").hover(function () {
            n.stopAutoplay();
            $("#bannerArrowLeft, #bannerArrowRight").stop(!0, !0);
            $("#bannerArrowLeft, #bannerArrowRight").fadeIn();
        }, function () {
            n.startAutoplay();
            $("#bannerArrowLeft,#bannerArrowRight").fadeOut();
        });
    })();

    /*
     * 学员故事轮播
     */
    (function () {
        var t = new Swiper(".story-wrap", {
            pagination: ".story-pagination",
            loop: !0,
            slidesPerView: 1,
            speed: 1e3,
            autoplay: 5e3,
            grabCursor: !0,
            height: 260,
            paginationClickable: !0
        });
        $(".story-container").hover(function () {
            t.stopAutoplay()
        }, function () {
            t.startAutoplay()
        })
    })();

});