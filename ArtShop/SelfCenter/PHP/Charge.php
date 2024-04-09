<?php
$username = $_POST['username'];
$account = $_POST['account'];


$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

//检查连接
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//更新用户信息
$sql = "UPDATE shopuser SET account=$account WHERE username='$username'";
$result = $conn->query($sql);

// 关闭连接
$conn->close();

?>