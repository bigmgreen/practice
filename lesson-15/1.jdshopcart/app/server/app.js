'use strict';
var express = require('express');
var path = require('path');
var data = require('./data');
var goodsData = data.goodsData;
var recommendList = data.recommendList;

var app = express();
app.use(express.static(path.join(__dirname, '/../view')));
/**
 * 防御xss
 */
app.use('*', function (req, res, next) {
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "deny");
    res.header("X-Content-Type-Options", "nosniff");
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
    res.json({
        shopCart: null,
        recommendList: recommendList
    });
});

/**
 * 根据类别查询接口
 */
app.get('/queryShopCart', function (req, res) {

    var data = [];
    var type = req.query.type;
    var _goodsData = JSON.parse(JSON.stringify(goodsData));

    _goodsData.forEach(function (item) {
        var mark = [];
        item.item.forEach(function (_item) {
            if (_item.type == type) {
                mark.push(_item);
            }
        });

        if (mark.length>0) {
            item.item = mark;
            data.push(item);
        }

    });

    res.json(data);
});

/**
 * 启动服务
 */
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});



