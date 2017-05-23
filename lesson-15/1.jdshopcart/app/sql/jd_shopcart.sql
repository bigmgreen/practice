/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50533
Source Host           : localhost:3306
Source Database       : jd_shopcart

Target Server Type    : MYSQL
Target Server Version : 50533
File Encoding         : 65001

Date: 2017-05-23 18:08:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for recommend
-- ----------------------------
DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend` (
  `id` int(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO `recommend` VALUES ('00000000000000000000', '小米6 全网通 6GB+64GB 亮黑色 移动联通电信4G手机 双卡双待', '2499.00', './static/img/58f709adN45511018.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000001', '全球通史', '34.20', './static/img/57bebb6eN49eaac79.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000002', '锤子 坚果Pro 64GB 碳黑色 全网通 移动联通电信4G手机 双卡双待', '1799.00', './static/img/5911be7cN4d90fc84.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000003', '施维茨十字双肩包韩版背包15.6英寸电脑包书包男高中大学生包 黑色', '168.00', './static/img/57149d08Nbaa23b9a.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000007', '酷派（Coolpad）酷玩6 柔光金6GB+64GB 移动联通电信4G手机 双卡双待', '1499.00', './static/img/5911664fN34e9292b.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000008', '裂狼（LIELANG）韩版双肩背包男女时尚防泼水电脑包皮质高中学生书包潮 黑色-USB充电款', '158.00', './static/img/58f88ca6Nd1026210.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000009', '华为 HUAWEI P10 全网通 4GB+64GB 曜石黑 移动联通电信4G手机 双卡双待', '3788.00', './static/img/58b3f51aN10566aa1.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000010', '施维茨十字双肩包韩版背包15.6英寸电脑包书包男学生 黑色', '168.00', './static/img/57a94e37Nf75039e8.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000011', 'SAMSUNG 三星 Galaxy S8 5.8寸曲面屏 面部识别虹膜 智能手机 枫叶金 64G 港版（预售）', '6999.00', './static/img/58df43e5N28134072.jpg');
INSERT INTO `recommend` VALUES ('00000000000000000012', '世界简史(京东定制）', '26.50', './static/img/56302509N3ca12c63.jpg');
