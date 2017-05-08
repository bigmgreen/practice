'use strict';
var md5 = require("nodejs-md5");
var express = require('express');
var path = require('path');
var utils = require('../../api/utils/dbConnect')();
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, '/../view')));
app.use(bodyParser());

/**
 * 设置网站首页
 */
app.get('/', function (req, res) {
    var referer = req.headers.referer;
    if (referer && referer.indexOf('/login')) {
        res.sendFile(path.join(__dirname, '/../view/admin.html'));
    } else {
        res.redirect('/login');
    }
});

/**
 * 设置网站登录页
 */
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/../view/login.html'));
});

/**
 * 登录控制
 */
app.post('/login', function (req, res) {
    md5.string.quiet(req.body.password, function (err, md5) {
        if (err) {
            console.log(err);
        } else {
            utils.getUser({
                userName: req.body.userName,
                password: md5
            }, function (data, fields) {
                if (data.length > 0) {
                    res.json('ok');
                } else {
                    res.json('no');
                }
            });
        }
    });
});

/**
 * 数据查询接口
 */
app.get('/queryData', function (req, res) {

    utils.getTotalByType({
        type: req.query.type
    }, function (num) {
        var count = Math.ceil(num[0].count / 10);
        if (req.query.type == 0) {
            utils.getAll({
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count
                });
            });
        } else if (req.query.type == -1) {
            utils.getDelNewsByType({
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count
                });
            });
        } else {
            utils.getNewsByType({
                type: req.query.type,
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count
                });
            });
        }
    });

});

/**
 * 增加新闻
 */
app.post('/add', function (req, res) {
    utils.add(req.body, function (data, fields) {
        if (data.affectedRows == 1) {
            res.json(true);
        } else {
            res.status(500);
            res.json('服务器内部错误，请稍后重试');
        }
    });
});

/**
 * 删除新闻
 */
app.post('/del', function (req, res) {
    utils.del({
        id: req.body.id
    }, function (data, fields) {
        if (data.affectedRows == 1) {
            res.json(true);
        } else {
            res.status(500);
            res.json('服务器内部错误，请稍后重试');
        }
    });
});

/**
 * 修改新闻
 */
app.post('/update', function (req, res) {
    utils.update(req.body, function (data, fields) {
        if (data.affectedRows == 1) {
            res.json(true);
        } else {
            res.status(500);
            res.json('服务器内部错误，请稍后重试');
        }
    });
});

/**
 * 恢复某一条记录
 */
app.post('/recovery', function (req, res) {
    utils.recovery({
        id: req.body.id
    }, function (data, fields) {
        if (data.affectedRows == 1) {
            res.json(true);
        } else {
            res.status(500);
            res.json('服务器内部错误，请稍后重试');
        }
    });
});

/**
 * 启动服务
 */
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});



