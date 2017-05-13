/**
 * 滑块插件
 * @param btn  滑块元素
 * @param bar  滑动条元素
 * @param title  滑块值文本显示元素
 * @param option  一些可选项
 */
var scale = function (btn, bar, title, option) {
    this.btn = document.getElementById(btn);
    this.bar = document.getElementById(bar);
    this.title = document.getElementById(title);
    this.fn = option.fn || function () {
            console.log('您没有传入回调函数！')
        };
    if (option.scroll) {
        this.step = document.getElementById(option.scroll);
    }
    this.max = option.max || 0;
    if (option.value == '') {
        this.value = option.max;
    } else {
        this.value = (option.value > option.max ? option.max : option.value) || 0;
    }

    option.init && option.init(this.value);

    this.init();
};
//设置鼠标函数
scale.prototype = {
    init: function () {
        var f = this, g = document, b = window, m = Math;

        f.btn.style.left = f.value - 7 + 'px';
        f.title.innerHTML = parseInt(f.value / 80 * 100) + '%';

        f.btn.onmousedown = function (e) {
            var x = (e || b.event).clientX;
            var l = this.offsetLeft;
            var max = f.bar.offsetWidth - this.offsetWidth;
            g.onmousemove = function (e) {
                var thisX = (e || b.event).clientX;
                var to = m.min(max, m.max(-2, l + (thisX - x)));
                f.btn.style.left = to + 'px';
                f.ondrag(m.round(m.max(0, to / max) * f.max), to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup = function () {
                this.onmousemove = null;
            };
        };
    },
    ondrag: function (pos, x) {
        this.step && (this.step.style.width = Math.max(0, x) + 'px');
        this.title.innerHTML = parseInt(pos / 80 * 100) + '%';
        this.fn(pos);
    }
};