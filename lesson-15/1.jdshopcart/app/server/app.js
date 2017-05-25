'use strict';
var express = require('express');
var path = require('path');
var data = require('./data');
var bodyParser = require('body-parser');
var goodsData = data.goodsData;
var recommendList = data.recommendList;
var cartData = [];

var app = express();
app.use(bodyParser());
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
    var _data = JSON.parse(JSON.stringify(cartData));

    if (type == 0) {
        data = _data;
    } else {
        _data.forEach(function (item) {
            var mark = [];
            item.item.forEach(function (_item) {
                if (_item.type == type) {
                    mark.push(_item);
                }
            });

            if (mark.length > 0) {
                item.item = mark;
                data.push(item);
            }

        });
    }

    res.json(data);
});

/**
 * 查询详细商品信息
 */
app.get('/queryAddCart', function (req, res) {

    var shopId = req.query.shopId;
    var id = req.query.id;
    var _goodsData = JSON.parse(JSON.stringify(goodsData));

    _goodsData.forEach(function (item) {

        if (item.shopId == shopId) {
            item.item.forEach(function (_item) {
                if (_item.id == id) {
                    _item.shopId = shopId;
                    res.json(_item);
                }
            });
        }

    });
});

/**
 * 添加到购物车操作
 */
app.post('/addCartInfo', function (req, res) {
    var shopId = req.body.shopId;
    var id = req.body.id;

    goodsData.forEach(function (item) {
       if (item.shopId == shopId) {
           var isFind = false;
           cartData.forEach(function (cart) {
               if (cart.shopId == shopId) {
                   //如果载购物车里找到商铺，就直接往里面添加
                   isFind = true;
               }
           });

           if (!isFind) {
               cartData.push(item);
               item.item = [];
               item.item.forEach(function (_item, index) {
                   if (_item.id == id) {

                   }
               });
           }
       }
    });

    res.json(true);
});

/**
 * 启动服务
 */
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});



