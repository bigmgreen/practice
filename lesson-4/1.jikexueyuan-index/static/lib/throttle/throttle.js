/*
 * js函数节流
 */
function throttle(fn, interval) {
    interval = interval || 300;
    var canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(function () {
            fn.apply(this, arguments);
            canRun = true;
        }.bind(this), interval);
    };
}
