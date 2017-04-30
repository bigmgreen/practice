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

/*
 * js函数防抖
 */

function debounce(fn, interval) {
    var timeout = null;
    interval = interval || 300;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(this, arguments);
        }, interval);
    };
}