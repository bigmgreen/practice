<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

/*
 * 登录逻辑判断
 * */
if (getUser($_POST['userName'], $_POST['password'])) {
    echo json_encode('ok');
} else {
    echo json_encode('no');
}

?>