window.onload = function () {
    (function (doc) {
        /*  计算器面板    */
        var calculator = doc.getElementById('calculator');
        /*  计算器表达式    */
        var expression = doc.getElementById('expression');
        /*  计算器结果    */
        var result = doc.getElementById('result');
        /*   初始化计算器   */
        Calculator.init(calculator, expression, result);

        /*
         * 计算机模式切换
         * */
        (function () {
            var _normal = doc.getElementById('normal');
            var _super = doc.getElementById('super');
            Calculator.on(_normal, 'click', function (e) {
                chang(e, _super);
            });
            Calculator.on(_super, 'click', function (e) {
                chang(e, _normal);
            });

            function chang(e, elChang) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                var el = e.target;
                el.setAttribute('class', el.getAttribute('class') + ' active');
                elChang.setAttribute('class', elChang.getAttribute('class').replace(' active', ''));
                doc.body.setAttribute('class', el.getAttribute('id'));
            }
        })();
    })(document);
};

/*
 * 计算器对象
 */
var Calculator = {
    stack: ['', '', ''],
    _run: function (param) {
        switch (param) {
            case 'clear':
                this._clear();
                break;
            case 'del':
                this._del();
                break;
            default:
                this._push(param);
        }
    },
    /*
     * 计数
     * */
    _push: function (param) {

        if (this.stack[0] === '' || (this.stack[1] === '' && this.stack[2] === '' && '+-*/%'.indexOf(param) === -1)) {
            var value_1 = this.stack[0] + param;
            if (/^-?\d+\.?\d*$/.test(value_1)) {
                this.stack[0] = value_1;
            }
        } else if (this.stack[0] !== '' && '+-*/%'.indexOf(param) > -1) {

            if (this.stack[1] !== '') {
                this._calculate();
            }
            this.stack[1] = param;

        } else if (this.stack[2] === '' || (this.stack[1] !== '' && this.stack[0] !== '' && '+-*/%'.indexOf(param) === -1)) {
            var value_2 = this.stack[2] + param;
            if (/^-?\d+\.?\d*$/.test(value_2)) {
                this.stack[2] = value_2;
            }
        }

        if (this.stack[0] !== '' && 'sin_cos_tan_log_sqrt'.indexOf(param) > -1) {
            this._calculateWithMath(param);
        }

        this._render(param);
    },
    /*
     * 显示
     * */
    _render: function (param) {
        this.stack[0] = this._formatNUmber(this.stack[0]);
        this.stack[2] && (this.stack[2] = this._formatNUmber(this.stack[2]));
        this.expression.innerHTML = this.stack.join('');
        if (param === '=') {
            this._calculate();
        }

        console.log(this.stack);
    },
    /*
     * 格式化数字
     * 0
     * 0.
     * 0.0
     * */
    _formatNUmber: function (num) {
        if (num !== '') {
            num = num + '';
            var index = num.lastIndexOf('.');
            if (index === num.length - 1) {
                return parseFloat(num) + '.';
            } else if ((index < num.length - 1) && (index > -1)) {
                return num;
            } else {
                return parseFloat(num);
            }
        }
        return '';
    },
    /*
     * 计算
     * */
    _calculate: function () {
        try {
            if (this.stack[0] !== '' && this.stack[1] !== '' && this.stack[2] !== '') {
                if (this.stack[2] == 0 && this.stack[1] === '/') {
                    this.expression.innerHTML = this.stack[0] = this.stack[1] = this.stack[2] = '';
                    this.result.innerHTML = '出错';
                    return;
                }
                this.stack[0] = parseFloat(this.stack[0]);
                this.stack[2] = parseFloat(this.stack[2]);
                var value = parseFloat(eval(this.stack.join('')).toFixed(10));
                if (isNaN(value)) {
                    value = 0;
                }
                this.stack = [value, '', ''];
                this.expression.innerHTML = value;
                this.result.innerHTML = value;
            }
        } catch (e) {
            this._clear();
            console.log(e.message);
        }
    },
    /*
     * 使用jsMath对象求值
     * */
    _calculateWithMath: function (type) {

        if (this.stack[0] !== '' && this.stack[1] !== '' && this.stack[2] !== '') {
            this._calculate();
        }

        var value = null;
        if ('sin_cos_tan'.indexOf(type) > -1) {
            value = parseFloat(Math[type](this.stack[0] * Math.PI / 180).toFixed(10));
        } else {
            value = parseFloat(Math[type](this.stack[0]).toFixed(10));
        }

        if (isNaN(value) || value == Infinity || value == -Infinity) {
            value = 0;
        }
        this.stack = [value, '', ''];
        this.expression.innerHTML = value;
        this.result.innerHTML = value;
    },
    /*
     * 删除一个字符
     * */
    _del: function () {
        if (this.stack[2] !== '') {
            this.stack[2] = this.stack[2].toString().substr(0, this.stack[2].toString().length - 1);
        } else if (this.stack[2] === '' && this.stack[1] !== '' && ('+-*/%'.indexOf(this.stack[1]) > -1)) {
            this.stack[1] = this.stack[1].toString().substr(0, this.stack[1].toString().length - 1);
        } else if (this.stack[2] === '' && this.stack[1] === '' && this.stack[0] !== '') {
            this.stack[0] = this.stack[0].toString().substr(0, this.stack[0].toString().length - 1);
        }
        this._render();
    },
    /*
     * 清空字符
     * */
    _clear: function () {
        this.result.innerHTML = '';
        this.stack = ['', '', ''];
        this._render();
    },
    /*
     * 事件绑定兼容处理
     * */
    on: function (el, type, fn) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
    },
    /*
     * 计算器初始化
     * */
    init: function (calculator, expression, result) {

        this.calculator = calculator;
        this.expression = expression;
        this.result = result;
        /*   监听按键事件   */
        var that = this;
        this.on(this.calculator, 'click', function (event) {
            event = event || window.event;
            event.target = event.target || event.srcElement;
            var value = '';
            if (event.target.tagName === 'I') {
                value = event.target.parentNode.getAttribute('data-value');
            } else {
                value = event.target.getAttribute('data-value');
            }
            that._run(value);
        });
    }
};