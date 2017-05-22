'use strict';
var md5 = require("nodejs-md5");
var express = require('express');
var path = require('path');
var utils = require('../../api/utils/dbConnect')();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var uuidV1 = require('uuid/v1');

var app = express();
app.use(express.static(path.join(__dirname, '/../view')));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
    }
}));

/**
 * 防御xss
 */
app.use('*', function (req, res, next) {
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "deny");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "default-src 'self' 'unsafe-eval'");
    next();
});

/**
 * 防御csrf
 */
app.use(['/add', '/del', '/update', '/recovery'], function (req, res, next) {
    if (req.body.token == req.session.uuid) {
        next();
    } else {
        res.send('可疑操作，服务器拒绝响应！');
    }
});

/**
 * 设置网站首页
 */
app.get('/', function (req, res) {
    if (req.session.user) {
        res.cookie('session', req.session.user.password, {path: '/', httpOnly: true});
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
 * 登出
 */
app.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/login');
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
            }, function (user, fields) {
                if (user.length > 0) {
                    req.session.user = user[0];
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

        var uuid = uuidV1();
        req.session.uuid = uuid;

        var count = Math.ceil(num[0].count / 10);
        if (req.query.type == 0) {
            utils.getAll({
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count,
                    token: uuid
                });
            });
        } else if (req.query.type == -1) {
            utils.getDelNewsByType({
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count,
                    token: uuid
                });
            });
        } else {
            utils.getNewsByType({
                type: req.query.type,
                pageNumber: req.query.pageNumber
            }, function (data) {
                res.json({
                    list: data,
                    totalPage: count,
                    token: uuid
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



