<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

$title = $_POST['title'];
$imgSrc = $_POST['imgSrc'];
$date = $_POST['date'];
$type = $_POST['type'];
$id = $_POST['id'];
$from = $_POST['from'];

if ($type == 0) {
    $flag = updateById($id, $title, $imgSrc, $date, $from);
} else {
    $flag = update($id, $title, $imgSrc, $date, $type, $from);
}


mysqli_close($link);

/**
 * 返回数据
 */
echo json_encode($flag);
?>