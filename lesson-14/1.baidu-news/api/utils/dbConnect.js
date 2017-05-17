'use strict';
var mysql = require('mysql');

//连接数据库设置-创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news_list'
});

//每页的容量
var PAGE_SIZE = 10;

/**
 * 数据库操作公共接口
 * @param sql
 * @param callback
 */
function excute(sql, callback) {
    console.log(sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows, fields) {

            if (err) {
                throw  err;
            }

            callback(rows, fields);
            connection.release();
        });
    });
}

module.exports = function () {
    return {
        /**
         * 获取对应类型的总条数
         * @param param
         * @param callback
         */
        getTotalByType: function (param, callback) {
            var sql = 'SELECT COUNT(*) as count FROM news_list';

            if (param.type == -1) {
                sql = sql + ' WHERE status = 1';
            } else {
                sql = sql + ' WHERE status = 0';
            }

            if (param.type != 0 && param.type != -1) {
                sql = sql + ' AND TYPE=' + param.type;
            }
            excute(sql, callback);
        },
        /**
         * 获取精选数据
         * @param param
         * @param callback
         */
        getAll: function (param, callback) {
            var sql = 'SELECT * FROM news_list WHERE status = 0 order by id desc LIMIT '
                + param.pageNumber * PAGE_SIZE + ',' + PAGE_SIZE;
            excute(sql, callback);
        },
        /**
         * 根据类型获取数据
         * @param param
         * @param callback
         */
        getNewsByType: function (param, callback) {

            var pageNumber = param.pageNumber * PAGE_SIZE;
            var sql = 'SELECT * FROM news_list WHERE status = 0 AND TYPE ='
                + param.type + ' order by id desc LIMIT '
                + pageNumber + ',' + PAGE_SIZE;
            excute(sql, callback);
        },
        /**
         * 获取回收站的数据
         * @param param
         * @param callback
         */
        getDelNewsByType: function (param, callback) {
            var pageNumber = param.pageNumber * PAGE_SIZE;
            var sql = 'SELECT * FROM news_list WHERE status = 1 order by id desc LIMIT ' + pageNumber + ',' + PAGE_SIZE;
            excute(sql, callback);
        },
        /**
         * 获取user
         * @param param
         * @param callback
         */
        getUser: function (param, callback) {
            var sql = 'SELECT * FROM user_main WHERE NAME="' + param.userName + '" AND PASSWORD="' + param.password + '"';
            excute(sql, callback);
        },
        /**
         * 增加一条数据
         * @param param
         * @param callback
         */
        add: function (param, callback) {
            var sql = 'INSERT INTO `news_list`(`title`, `imgSrc`, `date`, `type`, `from`) VALUES ("' + param.title + '","' + param.imgSrc + '","' + param.date + '","' + param.type + '","' + param.from + '")';
            excute(sql, callback);
        },
        /**
         * 按照id删除某个记录
         * @param param
         * @param callback
         */
        del: function (param, callback) {
            var sql = 'UPDATE `news_list` SET `status`=1 WHERE id=' + param.id;
            excute(sql, callback);
        },
        /**
         * 按照id编辑某个记录
         * @param param
         * @param callback
         */
        update: function (param, callback) {
            var sql = 'UPDATE `news_list` SET `title`="' + param.title + '",`imgSrc`="' + param.imgSrc + '",`date`="' + param.date + '",`from`="' + param.from + '" WHERE id=' + param.id;
            excute(sql, callback);
        },
        /**
         * 恢复某一条记录
         * @param param
         * @param callback
         */
        recovery: function (param, callback) {
            var sql = 'UPDATE `news_list` SET `status`=0 WHERE id=' + param.id;
            excute(sql, callback);
        }
    }
};