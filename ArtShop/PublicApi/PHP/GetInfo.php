<?php
// 获取前端传入的用户名和密码
//可能存在大小写转换问题！
$username = $_GET['username'];

// 连接到数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

// 检查连接
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// 查询用户信息
$sql = "SELECT * FROM shopuser WHERE username='$username'";
$result = $conn->query($sql);

// 检查查询结果
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $userInfo = array(
    "username" => $row["username"],
    "email" => $row["email"],
    "phone" => $row["phone"],
    "birth" => $row["birth"],
    "account" => $row["account"],
    "success" => true,
    "message" => "hello!",
  );
  echo json_encode($userInfo);
} 
else{
	$userInfo = array(
		"success" => false,
		"message" => "The User doesn't exist!",
	);
	echo json_encode($userInfo);
}

// 关闭连接
$conn->close();
?>
