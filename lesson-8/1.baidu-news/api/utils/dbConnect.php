<?php

$link = mysqli_connect('localhost', 'root', 'root', 'news_list');
mysqli_set_charset($link, 'utf8');
if (!$link) {
    die('Could not connect: ' . mysqli_connect_error());
}

/**获取精选数据
 * @param $pageNumber
 * @return bool|mysqli_result
 */
function getAll($pageNumber)
{
    $pageNumber = $pageNumber * $GLOBALS['pageSize'];
    $sql = 'SELECT * FROM news_list WHERE status = 0 order by id desc LIMIT ' . $pageNumber . ',' . $GLOBALS['pageSize'];
    return mysqli_query($GLOBALS['link'], $sql);
}


/**根据类型获取数据
 * @param $type
 * @param $pageNumber
 * @return bool|mysqli_result
 */
function getNewsByType($type, $pageNumber)
{
    $pageNumber = $pageNumber * $GLOBALS['pageSize'];
    $sql = 'SELECT * FROM news_list WHERE status = 0 AND TYPE =' . $type . ' order by id desc LIMIT ' . $pageNumber . ',' . $GLOBALS['pageSize'];
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 获取user
 * @param $name
 * @param $password
 * @return int
 */
function getUser($name, $password)
{
    $sql = 'SELECT * FROM user_main WHERE NAME="' . $name . '" AND PASSWORD="' . md5($password) . '"';
    $result = mysqli_query($GLOBALS['link'], $sql);
    return mysqli_num_rows($result);
}

/**
 * 获取对应类型的总条数
 * @param $type
 * @return int
 */
function getTotalByType($type)
{
    $sql = 'SELECT COUNT(*) FROM news_list';
    if ($type != 0) {
        $sql = $sql . ' WHERE status = 0 AND TYPE=' . $type;
    }

    $result = mysqli_query($GLOBALS['link'], $sql);
    return ceil(mysqli_fetch_array($result)[0] / 10);
}

/**
 * 增加一条数据
 * @param $title
 * @param $imgSrc
 * @param $date
 * @param $from
 * @return bool
 */
function add($title, $imgSrc, $date, $type, $from)
{
    $sql = 'INSERT INTO `news_list`(`title`, `imgSrc`, `date`, `type`, `from`) VALUES ("' . $title . '","' . $imgSrc . '","' . $date . '","' . $type . '","' . $from . '")';
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 编辑一条数据
 * @param $id
 * @param $title
 * @param $imgSrc
 * @param $date
 * @param $type
 * @param $from
 */
function update($id, $title, $imgSrc, $date, $type, $from)
{
    $sql = 'UPDATE `news_list` SET `title`="' . $title . '",`imgSrc`="' . $imgSrc . '",`date`="' . $date . '",`type`="' . $type . '",`from`="' . $from . '" WHERE id=' . $id;
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 编辑一条数据通过类型和id
 * @param $id
 * @param $title
 * @param $imgSrc
 * @param $date
 * @param $type
 * @param $from
 */
function updateById($id, $title, $imgSrc, $date, $from)
{
    $sql = 'UPDATE `news_list` SET `title`="' . $title . '",`imgSrc`="' . $imgSrc . '",`date`="' . $date . '",`from`="' . $from . '" WHERE id=' . $id;
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 按照id删除某个记录
 * @return bool|mysqli_result
 */
function del($id)
{
    $sql = 'UPDATE `news_list` SET `status`=1' . ' WHERE id=' . $id;
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 按照id删除某个记录
 * @param $id
 * @return bool|mysqli_result
 */
function recovery($id)
{
    $sql = 'UPDATE `news_list` SET `status`=0' . ' WHERE id=' . $id;
    return mysqli_query($GLOBALS['link'], $sql);
}

/**
 * 获取回收站的数据
 * @param $type
 * @param $pageNumber
 * @return bool|mysqli_result
 */
function getDelNewsByType($pageNumber)
{
    $pageNumber = $pageNumber * $GLOBALS['pageSize'];
    $sql = 'SELECT * FROM news_list WHERE status = 1 order by id desc LIMIT ' . $pageNumber . ',' . $GLOBALS['pageSize'];
    return mysqli_query($GLOBALS['link'], $sql);
}

?>