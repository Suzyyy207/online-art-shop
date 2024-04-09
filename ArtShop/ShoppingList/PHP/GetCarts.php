<?php
$username = $_POST['username'];

// 连接到 MySQL 数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);


$result = $conn->query("SELECT goodsid FROM carts WHERE username='$username'");


$list = array();
if($result->num_rows <= 0){
    $item = array(
        'success' => false,
    );
    array_push($list, $item);
}
else{
    $item = array(
        'success' => true,
    );
    array_push($list, $item);
}

while ($row = $result->fetch_assoc()) {
    $id = $row['goodsid'];
    $find = "SELECT id,artname,price,author,image,intro,status FROM artwork WHERE id=$id ";
    $findart = $conn->query($find);
    $artwork = $findart->fetch_assoc();
    $item = array(
        'id' => $artwork['id'],
        'artname' => $artwork['artname'],
        'price' => $artwork['price'],
        'intro' => $artwork['intro'],
        'author' => $artwork['author'],
        'status' => $artwork['status'],
        "image" => base64_encode($artwork["image"])
    );
    array_push($list, $item);
}


echo json_encode($list);
?>

