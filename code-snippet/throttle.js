var throttle = function (fn, interval) {
    var timer, firstTime = true;
    return function () {
        var args = arguments, _this = this;
        if (firstTime) { //第一次调用，不需要延迟执行，这步做不做都行
            fn.apply(_this, args);
            return firstTime = false;
        }
        if (timer) { //如果定时器还在，说明需要等一会
            return false;
        }
        timer = setTimeout(function () {//延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            fn.apply(_this, args)
        }, interval || 500)
    }
}
//试下
window.onresize = throttle(function () {
    console.log(1)
}, 500)