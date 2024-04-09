<?php
// 获取前端传入的用户名和密码
//可能存在大小写转换问题！
$id = $_GET['id'];
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
$sql = "SELECT * FROM artwork WHERE id='$id'";
$result = $conn->query($sql);

// 检查查询结果
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();

  //更新浏览量
  $views = $row['views']+1;
  $stmt = $conn->prepare("UPDATE artwork SET views=? WHERE id = $id");
  $stmt->bind_param("i", $views);
  $stmt->execute();

  //用户侧写部分数据更新
  if ($username != '') {
    $sql = "SELECT * FROM views WHERE artid='$id' and username='$username'";
    $check_view = $conn->query($sql);
    if ($check_view->num_rows > 0) {
      $my_views = $check_view->fetch_assoc()['times4view'] + 1;
      $stmt = $conn->prepare("UPDATE views SET times4view=? WHERE artid = '$id' and username='$username'");
      $stmt->bind_param("i", $my_views);
      $stmt->execute();
    }
    else{
      $my_views = 1;
      $stmt = $conn->prepare("INSERT INTO views (artid,username,times4view) VALUES (?, ?, ?)");
      $stmt->bind_param("isi", $id, $username, $my_views);
      $stmt->execute();
    }
  }

  //装载数据
  $artInfo = array(
    "success" => true,
    "artname" => $row["artname"],
    "author" => $row["author"],
    "status" => $row["status"],
    "price" => $row["price"],
    "year" => $row["year"],
    "style" => $row["style"],
    "width" => $row["width"],
    "height" => $row["height"],
    "owner" => $row["owner"],
    "intro" => $row["intro"],
    "day" => $row["day"],
    "image" => base64_encode($row["image"]),
    "views" => $views
  );
  echo json_encode($artInfo);
} 
else{
	$artInfo = array(
		"success" => false,
		"message" => "The Work doesn't exist!",
	);
	echo json_encode($artInfo);
}

// 关闭连接
$conn->close();
?>
