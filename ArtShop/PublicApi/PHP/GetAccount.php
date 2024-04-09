<?php
$username = $_POST['username'];

$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT account FROM shopuser WHERE username='$username'";
$result = $conn->query($sql);


// 检查查询结果
if ($result->num_rows <= 0) {
	$account = array(
		"success" => false,
		"message" => "The user doesn't exist",
	);
		echo json_encode($status);
} 
else{
    $row = $result->fetch_assoc();
	$account = array(
		"success" => true,
		"account" => $row["account"],
	);
	echo json_encode($account);
}

// 关闭连接
$conn->close();
?>
