<?php
$id = $_POST['id'];



$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

//检查连接
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "DELETE FROM artwork WHERE id LIKE '$id' ";
$result = $conn->query($sql);

$response = array(
    'success' => true,
    'message' => 'Successful Delete!'
);


// 关闭连接
echo json_encode($response);

?>