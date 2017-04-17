/*
 * js函数节流
 */
function throttle(fn, interval) {
    interval = interval || 300;
    var canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        var that = this;
        setTimeout(function () {
            fn.apply(that, arguments);
            canRun = true;
        }, interval);
    };
}
