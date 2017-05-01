<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

$id = $_POST['id'];

$flag = del($id);

mysqli_close($link);

/**
 * 返回数据
 */
echo json_encode($flag);
?>