var express = require('express');
var app = express();
app.use(express.static('../'));
app.use(express.static('./app'));


//测试301
app.get('/test301', function(req, res) {
    res.redirect(301, 'https://www.baidu.com');
});

//测试302
app.get('/test302', function(req, res) {
    res.redirect(302, 'https://www.baidu.com');
});

app.listen(3000);
console.log('服务启动!!!!','端口3000', 'localhost:3000');