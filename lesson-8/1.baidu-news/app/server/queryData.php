<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

/**
 * 根据前台的type参数判断使用那种查询
 */
$result = null;
$pageSize = 10;
if($_GET['type'] == 0) {
    $result = getAll($_GET['pageNumber']);
} else {
    $result = getNewsByType($_GET['type'], $_GET['pageNumber']);
}

/**
 * 把查询到的数据对象转为JSON数组
 */
$arr = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, array(
            'from' => $row['from'],
            'imgSrc' => $row['imgSrc'],
            'date' => $row['date'],
            'title' => $row['title'],
            'type' => $row['type']
        ));
    }
}

mysqli_close($link);
echo json_encode($arr);
?>