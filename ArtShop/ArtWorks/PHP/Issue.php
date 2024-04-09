<?php
$image = $_FILES['image'];
$id = $_POST['id'];
$artname = $_POST['artname'];
$author = $_POST['author'];
$owner = $_POST['owner'];
$price = intval($_POST['price']);
$year = $_POST['year'];
$style = $_POST['style'];
$width = intval($_POST['width']);
$height = intval($_POST['height']);
$intro = $_POST['intro'];


$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM artwork WHERE artname='$artname' and owner='$owner'";
$result = $conn->query($sql);
//同一用户不能发布同一名字的艺术品
if ($result->num_rows > 0) {
  $status = array(
    "success" => false,
		"message" => "You can't issue two artworks with the same name! Try agin with a different name.",
    );
}
else{
  // 从临时文件夹中读取图像数据
  $imageData = file_get_contents($image['tmp_name']);
  $today = date("Y-m-d");
  // 在数据库中插入数据
  $stmt = $conn->prepare("INSERT INTO artwork (artname, author, owner, price, year, style, width,height,intro,image,day) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?,?,?)");
  $stmt->bind_param("sssissiisss", $artname, $author, $owner, $price, $year, $style, $width, $height, $intro, $imageData,$today);
  if($stmt->execute()){
      $status = array(
        "success" => true,
        "message" => "Successful Upload!",
      );
  }
  else{
      $status = array(
        "success" => false,
        "message" => "Fail",
      );
  }
}


echo json_encode($status);

$conn->close();
?>
