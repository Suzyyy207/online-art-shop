<?php
// 获取前端传入的用户名和密码
//可能存在大小写转换问题！
$username = $_POST['username'];
$password = $_POST['password'];

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
$sql = "SELECT hash FROM shopuser WHERE username='$username'";
$result = $conn->query($sql);

if (!$result) {
    echo "Error: " . mysqli_error($conn);
}
else{
// 检查查询结果
if ($result->num_rows > 0) {
  	$row = $result->fetch_assoc();
    if (password_verify($password,$row["hash"])){
		$status = array(
			"success" => true,
			"message" => "Welcome,",
		);
		echo json_encode($status);
    }
	else {
		$status = array(
			"success" => false,
			"message" => "Wrong Password!",
		);
		echo json_encode($status);
    }
}
 
else{
	$status = array(
		"success" => false,
		"message" => "The User doesn't exist!",
	);
	echo json_encode($status);
}
}

// 关闭连接
$conn->close();
?>
