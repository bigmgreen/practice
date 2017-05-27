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

/**
 * 控制台打印简化函数
 * @param msg 要打印的值
 */
function log(msg) {
    console.log(msg);
}