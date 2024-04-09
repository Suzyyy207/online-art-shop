<?php
$username = $_POST['username'];
$goodsid = $_POST['goodsid'];

$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username, goodsid FROM carts WHERE username='$username' and goodsid='$goodsid'";
$result = $conn->query($sql);
$check = "SELECT status FROM artwork WHERE id='$goodsid'";
$check_re = $conn->query($check);


// 检查查询结果
if ($result->num_rows > 0) {
	$status = array(
		"success" => false,
		"message" => "You have added before.",
	);
		echo json_encode($status);
} 
elseif ($check_re->fetch_assoc()['status']) {
	$status = array(
		"success" => false,
		"message" => "Someone has bought it.",
	);
		echo json_encode($status);
}
else{
    $sql = "INSERT INTO carts (username,goodsid) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $username, $goodsid);
    $stmt->execute();
	$status = array(
		"success" => true,
		"message" => "Successfully Added!"   
	);
	echo json_encode($status);
}

// 关闭连接
$conn->close();
?>
