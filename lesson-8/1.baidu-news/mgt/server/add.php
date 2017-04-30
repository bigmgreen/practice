<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

$title = $_POST['title'];
$imgSrc = $_POST['imgSrc'];
$date = $_POST['date'];
$type = $_POST['type'];
$from = $_POST['from'];

$flag = add($title, $imgSrc, $date, $type, $from);

mysqli_close($link);

/**
 * 返回数据
 */
echo json_encode($flag);
?>