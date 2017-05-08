/**
 * 读取本地列表信息
 */
function getStorage(name) {
    if (localStorage && localStorage.getItem(name)) {
        return localStorage.getItem(name);
    } else {
        var str = '';
        var arr = decodeURIComponent(document.cookie).split(';');
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var temp = arr[i].split('=');
            if (temp[0] === name) {
                str = temp[1];
            }
        }
        return str;
    }
}

/**
 * 设置本地列表信息
 */
function setStorage(name, value) {
    if (localStorage) {
        localStorage.setItem(name, value);
    } else {
        var exp = new Date();
        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = name + encodeURIComponent(theme) + ";expires=" + exp.toGMTString();
    }
}