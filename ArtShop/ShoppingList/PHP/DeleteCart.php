<?php
$username = $_POST['username'];
$goodsid = $_POST['goodsid'];

// 连接到 MySQL 数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);


$result = $conn->query("SELECT * FROM carts WHERE username='$username' and goodsid=$goodsid");


$list = array();
if($result->num_rows <= 0){
    $delete = array(
        'success' => false,
        'message' => "You don't add this goods"
    );
}
else{
    $update = "DELETE FROM carts WHERE username='$username' and goodsid=$goodsid";
    $result = $conn->query($update);
    $delete = array(
        'success' => true,
        'message' => "Successfully Deleted!"
    );
}
echo json_encode($delete);
?>

