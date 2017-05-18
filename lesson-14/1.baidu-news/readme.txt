1.处理ql注入漏洞，写在了dbConnect.js中；
    add/update方法使用了pool.escape()进行了转义；
    其他方法使用mysql.format；

2.xss防御
    使用了handlebar.js模板引擎处理html转义；（mgt/view/js/index.js:62行）
    在响应头中添加了如下字段:（[mgt, app]/server/server.js:11行）
    X-XSS-Protection: 1; mode=block ,X-Frame-Options: deny,Content-Security-Policy: default-src 'self',X-Content-Type-Options: nosniff

3.