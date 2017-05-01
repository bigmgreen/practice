<?php
header("Content-type: application/json;charset=utf-8");
include_once '../../api/utils/dbConnect.php';

/**
 * 根据前台的type参数判断使用那种查询
 */
$result = null;
$pageSize = 10;
if ($_GET['type'] == 0) {
    $result = getAll($_GET['pageNumber']);
} else if ($_GET['type'] == -1) {
    $result = getDelNewsByType($_GET['pageNumber']);
} else {
    $result = getNewsByType($_GET['type'], $_GET['pageNumber']);
}

$totalPage = getTotalByType($_GET['type']);

/**
 * 把查询到的数据对象转为JSON数组
 */
$arr = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, array(
            'id' => $row['id'],
            'title' => $row['title'],
            'imgSrc' => $row['imgSrc'],
            'date' => $row['date'],
            'type' => $row['type'],
            'from' => $row['from'],
            'status' => $row['status']
        ));
    }
}

mysqli_close($link);

/**
 * 返回数据
 */
echo json_encode(array(
    'list' => $arr,
    'totalPage' => $totalPage
));
?>