<?php
// 获取前端传入的信息
//可能存在大小写转换问题！
$idname = $_POST['idname'];
$username = $_POST['username'];
$password = $_POST['password'];
$intro = isset($_POST['intro']) ? $_POST['intro'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$phone = isset($_POST['phone']) ? $_POST['phone'] : null;
$birth = isset($_POST['birth']) ? $_POST['birth'] : null;
$gender = isset($_POST['gender']) ? $_POST['gender'] : null;
$address = isset($_POST['address']) ? $_POST['address'] : null;
$country = isset($_POST['country']) ? $_POST['country'] : null;

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
$sql = "SELECT username, password FROM shopuser WHERE username='$username'";
$result = $conn->query($sql);


// 检查查询结果
if ($result->num_rows > 0 && $result->fetch_assoc()['username'] != $idname) {
	$status = array(
		"success" => false,
		"message" => "This name is already in use! Please change it.",
	);
		echo json_encode($status);
} 
else{
    $account = 0;
    $options = ['cost' => 8];
    $hash = password_hash($password, PASSWORD_DEFAULT, $options);
    $sql = "UPDATE shopuser SET username='$username',password='$password',email='$email',intro='$intro',phone='$phone',birth='$birth',gender='$gender',address='$address',country='$country',hash='$hash' WHERE username='$idname'";
    $conn->query($sql);

    $row =  "New record created successfully";

	$status = array(
		"success" => true,
		"message" => "Change Successfully!",
        "row" => $row
        
	);
	echo json_encode($status);
}

// 关闭连接
$conn->close();
?>
