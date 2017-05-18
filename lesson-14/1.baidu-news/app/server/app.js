'use strict';
var express = require('express');
var path = require('path');
var utils = require('../../api/utils/dbConnect')();

var app = express();
app.use(express.static(path.join(__dirname, '/../view')));
/**
 * 防御xss
 */
app.use('*', function(req, res, next){
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "deny");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "default-src 'self' 'unsafe-eval'");
    next();
});

/**
 * 设置网站根目录
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../view/index.html'));
});

/**
 * 数据查询接口
 */
app.get('/queryData', function (req, res) {

    if (req.query.type == 0) {
        utils.getAll({
            pageNumber: req.query.pageNumber
        }, function (rows, fields) {
            res.json(rows);
        });
    } else {
        utils.getNewsByType({
            type: req.query.type,
            pageNumber: req.query.pageNumber
        }, function (rows, fields) {
            res.json(rows);
        });
    }

});

/**
 * 启动服务
 */
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});



