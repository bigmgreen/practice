1.处理ql注入漏洞，写在了dbConnect.js中；
    add/update方法使用了pool.escape()进行了转义；
    其他方法使用mysql.format；

2.xss防御
    使用了handlebar.js模板引擎处理html转义；（mgt/view/js/index.js:62行）
    在响应头中添加了如下字段:（[mgt, app]/server/[mgt, app].js:27行）
    X-XSS-Protection: 1; mode=block ,X-Frame-Options: deny,Content-Security-Policy: default-src 'self',X-Content-Type-Options: nosniff

3.csrf防御
    判断['/add', '/del', '/update', '/recovery']请求的参数里面携带的token；（mgt/server/mgt.js:38行）
    mgt/server/mgt.js:105行生成token，并发送到前台

备注：
1.test.html 模仿了csrf操作->模拟删除第一个新闻（id=0）；
2.由于使用的东西较多，没有上传node_modules，下载压缩包执行命令：npm install 或者 cnpm install；
