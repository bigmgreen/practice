-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 01, 2017 at 08:28 AM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `news_list`
--

CREATE TABLE IF NOT EXISTS `news_list` (
  `id` int(20) unsigned NOT NULL,
  `title` char(200) NOT NULL,
  `imgSrc` varchar(300) CHARACTER SET latin1 NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` int(100) NOT NULL,
  `from` char(20) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news_list`
--

INSERT INTO `news_list` (`id`, `title`, `imgSrc`, `date`, `type`, `from`, `status`) VALUES
(1, '才6块钱一张的三版疲塌机一元破票子值得保藏吗？', 'https://t11.baidu.com/it/u=3409999324,2124124850&fm=170&s=3A9088494988B76C067594A30300E040&w=218&h=146&img.JPEG', '2017-05-01 08:03:18', 1, '百家', 0),
(2, '京籍非京籍北京入学信息怎么填？附详细操作流程，一步一步教会你~', 'https://t10.baidu.com/it/u=161841807,3578893797&fm=170&s=86E2FC16455F71C80AE9215A0300D0F0&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 2, '本地', 0),
(3, '太极20秒被KO 陈家沟宗师约战欲正名', 'https://t10.baidu.com/it/u=391652109,861098709&fm=170&s=63C29347B1860B41464DFC8D0300C081&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 3, '娱乐', 0),
(5, '“五一劳动节”1500份爱心早餐温暖昆明公交司机', 'https://t12.baidu.com/it/u=2118125651,1698101956&fm=170&s=A8B3609706533FDE5435D3950300D081&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 4, '社会', 0),
(6, '美媒体称印度总是在各方面竞争中输给中国', 'https://t10.baidu.com/it/u=3336003348,2057989986&fm=170&s=983954935A4208CA081DF92503007041&w=218&h=146&img.JPEG', '2017-05-01 08:27:02', 5, '军事', 0),
(7, '娄艺潇可以不是胡一菲，但是胡一菲必须是娄艺潇，晒雪山蓝衣美景图', 'https://t12.baidu.com/it/u=2505713543,741007974&fm=170&s=B2A7DF046031CF906014A8D7030090BB&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 6, '女人', 0),
(8, '爆笑段子：今天外边天很冷 比比谁穿的少', 'https://t11.baidu.com/it/u=2810449915,635495132&fm=170&s=7F5C39C25B929196AEC1948E03006091&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 7, '搞笑', 0),
(9, '知识付费迅猛增长下，版权保护及用户粘性等问题亟待解决', 'https://t11.baidu.com/it/u=698160367,4242434795&fm=170&s=272046A52A335F9A9824BDFB03009021&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 8, '互联网', 0),
(10, '供应链证实 微软正开发“ARM + Win 10”笔记本电脑', 'https://t12.baidu.com/it/u=3923757107,3763050488&fm=170&s=17927B855A224484D82081080300A093&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 9, '科技', 0),
(11, '民国第一夫人宋美龄的营养餐，好身体就是这样养成的，值得学习！', 'https://t11.baidu.com/it/u=2465326336,1486702143&fm=170&s=98E272230431159E8AAD88930100C091&w=218&h=146&img.JPEG', '2017-05-01 08:27:35', 10, '生活', 1),
(12, '微信VS苹果：你们“神仙打架”，是不是该思索下用户感受', 'https://t10.baidu.com/it/u=3340937724,2375281040&fm=170&s=58883C72879059C20ED9D0C70000C0B1&w=218&h=146&img.JPG', '2017-04-30 16:00:00', 1, '百家', 0),
(13, '通州世爵源墅小区由于违建被拆除', 'https://t10.baidu.com/it/u=1773238095,4082592898&fm=170&s=3D52FAB040C3C3FF0C3CA0030300A0F4&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 2, '本地', 0),
(14, '郑爽回归片场拍戏 放飞自我小脸圆润合作唐嫣男友罗晋', 'https://t10.baidu.com/it/u=2619981675,2853690159&fm=170&s=14A24BB64833069857B5FDDD03001001&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 3, '娱乐', 0),
(15, '狗狂吠救老人性命 救了一位失踪五天四夜的老人', 'https://t12.baidu.com/it/u=2103862943,417224343&fm=170&s=723414C1444537577FB8D50F0300B0C1&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 4, '社会', 0),
(16, '美国萨德要价十亿 美国部署萨德的目的是什么？中国如何应对萨德', 'https://t10.baidu.com/it/u=1679095197,3790374226&fm=170&s=3CB8F9B0442100B81299B0920300809B&w=218&h=146&img.JPEG', '2017-05-01 08:16:24', 5, '军事', 0),
(18, '女神裤子真会玩：宋茜迪丽热巴领衔破洞裤，菲姐裤子腿消失了，张馨予穿裤吗？还有她！', 'https://t12.baidu.com/it/u=2968548149,86105714&fm=170&s=F487D11CC0791792092827B40300E0A0&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 6, '女人', 0),
(19, '最爱小虾米6：成绩排名这东西，你丑你先排，我帅我随意。', 'https://t11.baidu.com/it/u=488957716,3406039554&fm=170&s=42945F8CC2138F9880BD04950300C0A0&w=218&h=146&img.PNG', '2017-04-30 16:00:00', 7, '搞笑', 0),
(20, 'ofo联合创始人张巳丁：目前已在两座城市实现盈利', 'https://t11.baidu.com/it/u=230271559,2966009977&fm=170&s=763AA6645673398C82A438830300A0E8&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 8, '互联网', 0),
(21, '玄关鞋柜这样装修，颜值收纳都搞定，生活美翻天，后悔知道得太晚！！', 'https://t12.baidu.com/it/u=1728588164,3486651793&fm=170&s=010B935DCEA03B190A3D5C3D03008060&w=218&h=146&img.PNG', '2017-05-01 08:27:31', 10, '生活', 1),
(22, '丹麦生蚝火了，生蚝营销，京东惨遭大使馆打脸', 'https://t10.baidu.com/it/u=1377722148,3575435120&fm=170&s=F4107C9FD0614AAA9598857403000063&w=218&h=146&img.PNG', '2017-04-30 16:00:00', 9, '科技', 0),
(24, '歼20战力不足，不可能正面对抗美国隐身战机，取胜还要剑走偏锋', 'https://t12.baidu.com/it/u=226830161,2119575238&fm=170&s=E53686755C8BE24754B63E8E0300C0A8&w=218&h=146&img.JPEG', '2017-05-01 08:16:20', 5, '军事', 0),
(25, '杨幂首获国际影后 演技精湛好评如潮如今实至名归终成功', 'https://t10.baidu.com/it/u=3896345442,3652497805&fm=170&s=B50D955F44EA72B94C3DDDFF03008031&w=218&h=146&img.JPEG', '2017-05-19 16:00:00', 3, '娱乐', 0),
(26, '阿里巴巴：2017年网络营销实训心得正式发布！', 'https://t12.baidu.com/it/u=3108580400,2321395199&fm=170&s=27A6B70E420E65490434C5E103007072&w=218&h=146&img.JPEG', '2017-05-13 16:00:00', 1, '百家', 0),
(27, '北京共享单车控制总量由各区确定 不设全市性数量规模', 'https://t12.baidu.com/it/u=9923054,1065544115&fm=170&s=F3A8A7E34EE0A4CA4428A42A0300F0D3&w=218&h=146&img.JPEG', '2017-05-04 16:00:00', 2, '本地', 0),
(28, '杭州男子网上抽奖中了17台苹果7P 却说亏惨了', 'https://t11.baidu.com/it/u=2383940692,1421799997&fm=170&s=71D271815476098C341BADDB0300D09F&w=218&h=146&img.JPEG', '2017-05-20 16:00:00', 4, '社会', 0),
(29, 'Baby回归跑男后，声称迪丽热巴是哥们', 'https://t11.baidu.com/it/u=2856811642,1642954267&fm=170&s=EAB00DC550FB398043B41D5303005090&w=218&h=146&img.PNG', '2017-05-12 16:00:00', 6, '女人', 0),
(30, 'NBA水货状元当选三对三联盟5号秀 加盟佩顿之队', 'https://t10.baidu.com/it/u=4079351613,2170037365&fm=170&s=E1F0AA628E6E24154BE8FC8003007093&w=218&h=146&img.JPEG', '2017-05-01 03:50:49', 2, '体育', 0),
(31, '身价越来越高，白百合事业第二春，陈思成的一席话，道出了原因', 'https://t11.baidu.com/it/u=919075921,3128494994&fm=170&s=E100DB1B622352B417B555CA03009020&w=218&h=146&img.JPEG', '2017-05-01 03:50:54', 3, '娱乐大众', 0),
(32, '共享单车违停严重 工作人员有时一天要搬车千辆', 'https://t11.baidu.com/it/u=2675083459,1385945937&fm=170&s=79904298DCD7F9C20838F1EF0300F0B1&w=218&h=146&img.JPEG', '2017-05-01 03:50:58', 4, '网易要闻', 0),
(35, '郑重承诺:市区半小时,郊区一小时到达!', 'https://ubmcmm.baidustatic.com/media/v1/0f0005iWq7FhXk3001Zo40.jpg', '2017-05-01 08:27:17', 10, '生活', 1),
(36, '《速8》全球票房超10亿美元 中国破《速7》纪录', 'https://t11.baidu.com/it/u=2218920340,1301765193&fm=170&s=29A147914E0170DC581D45FA0300F013&w=218&h=146&img.JPEG', '2017-05-20 16:00:00', 9, '科技', 0),
(37, '鹿晗狂撩迪丽热巴 此举似乎招来了粉丝的不快', 'https://t10.baidu.com/it/u=3260130207,1244664726&fm=170&s=8AA242860202055304B76FAA0300700E&w=218&h=146&img.JPEG', '2017-05-03 16:00:00', 7, '搞笑', 0),
(38, '谷歌Pixel手机之父走人：2代产品秋季推出', 'https://t11.baidu.com/it/u=1693728460,4038498920&fm=170&s=E3E29245543E073EC0BFC5920300408B&w=218&h=146&img.JPEG', '2017-04-30 16:00:00', 8, '猜你喜欢', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_main`
--

CREATE TABLE IF NOT EXISTS `user_main` (
  `user_id` int(11) NOT NULL,
  `name` char(100) NOT NULL,
  `password` char(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_main`
--

INSERT INTO `user_main` (`user_id`, `name`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news_list`
--
ALTER TABLE `news_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_main`
--
ALTER TABLE `user_main`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news_list`
--
ALTER TABLE `news_list`
  MODIFY `id` int(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `user_main`
--
ALTER TABLE `user_main`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
