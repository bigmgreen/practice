window.onload = function () {
    /**
     * 主题相关设置
     */
    (function (doc) {
        /**
         * 绑定切换事件
         */
        doc.getElementById('theme').addEventListener('click', function (e) {
            var theme = e.target.getAttribute('data-theme');
            doc.body.setAttribute('class', theme);
            setTheme(theme);
        });

        /**
         * 给body加class
         */
        doc.body.setAttribute('class', getTheme());

        /**
         * 读取本地主题信息
         */
        function getTheme() {
            if (localStorage && localStorage.getItem('hao123_theme')) {
                return localStorage.getItem('hao123_theme');
            } else {
                var str = '';
                decodeURIComponent(document.cookie).split(';').forEach(function (item) {
                    var arr = item.split('=');
                    if (arr[0] === 'hao123_theme') {
                        str = arr[1];
                    }
                });
                return str;
            }
        }

        /**
         * 设置本地主题信息
         */
        function setTheme(theme) {
            if (localStorage) {
                localStorage.setItem('hao123_theme', theme);
            } else {
                var exp = new Date();
                exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
                document.cookie = "hao123_theme=" + encodeURIComponent(theme) + ";expires=" + exp.toGMTString();
            }
        }

    })(document);
};