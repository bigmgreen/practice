'use strict';
var express = require('express');
var path = require('path');
var data = require('./data');
var bodyParser = require('body-parser');
var uuidV1 = require('uuid/v1');
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
        shopCart: cartData,
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
    res.json(query(req.query.shopId, req.query.id, goodsData));
});


/**
 * 查询详细购物车商品信息
 */
app.get('/queryUpdateCart', function (req, res) {
    res.json(query(req.query.shopId, req.query.id, cartData));
});

/**
 * 添加到购物车操作
 */
app.post('/addCartInfo', function (req, res) {
    var goods = req.body;
    res.json({
        isOk: 1,
        info: save(goods.shopId, goods.id, cartData, goods)
    });
});

/**
 * 编辑购物车操作
 */
app.post('/updateCartInfo', function (req, res) {
    var goods = req.body;
    res.json({
        isOk: 1,
        info: save(goods.shopId, goods.id, cartData, goods, true)
    });
});

/**
 * 更新商品数量
 */
app.post('/updateCartCount', function (req, res) {
    var goods = req.body;
    var shopId = goods.shopId;
    var id = goods.id;
    var count = goods.count;
    cartData.forEach(function (item) {
        if (item.shopId == shopId) {
            item.item.forEach(function (_item, _index) {
                if (_item.id == id) {
                    item.item[_index].count = count;
                    res.json(true);
                }
            });
        }
    });
});

/**
 * 启动服务
 */
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

/**
 * 查询商品信息
 * @param shopId 店铺id
 * @param id 商品id
 * @param data 数据源
 */
function query(shopId, id, data) {
    var _data = JSON.parse(JSON.stringify(data));
    var temp = null;
    _data.forEach(function (item) {
        if (item.shopId == shopId) {
            item.item.forEach(function (_item) {
                if (_item.id == id) {
                    _item.shopId = shopId;
                    temp = _item;
                }
            });
        }
    });
    return temp;
}

/**
 * 更新或者编辑商品信息
 * @param shopId 店铺id
 * @param id 商品id
 * @param data 数据源
 * @param goods 新数据
 * @param isUpdate 操作类型
 */
function save(shopId, id, data, goods, isUpdate) {
    goodsData.forEach(function (item) {
        if (item.shopId == shopId) {
            var isFind = false;
            data.forEach(function (cart) {
                if (cart.shopId == shopId) {
                    cart.item.forEach(function (_item, index) {
                        if (_item.id == id) {

                            if (isUpdate) {
                                cart.item[index] = goods;
                            } else {
                                var isColorSame = (_item.specifications[0] == goods.specifications[0]);
                                var isVersionSame = (_item.specifications[1] == goods.specifications[1]);
                                if (isColorSame && isVersionSame) {
                                    cart.item[index].count += goods.count;
                                } else {
                                    goods.id = uuidV1();
                                    cart.item.push(goods);
                                }
                            }

                        }
                    });
                    isFind = true;
                }
            });

            if (!isFind) {
                var tempItem = JSON.parse(JSON.stringify(item));
                tempItem.item = [];
                item.item.forEach(function (_item) {
                    if (_item.id == id) {
                        tempItem.item.push(goods);
                    }
                });
                data.push(tempItem);
            }
        }
    });

    return data;
}


