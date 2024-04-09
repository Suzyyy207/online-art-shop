<?php
$image = $_FILES['image'];
$id = intval($_POST['id']);
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

$sql = "SELECT status FROM artwork WHERE id='$id' and owner='$owner'";
$result = $conn->query($sql);
$check = "SELECT id FROM artwork WHERE artname='$artname' and owner='$owner'";
$result2 = $conn->query($check);


//此账户下没有这幅作品
if ($result->num_rows <= 0) {
  $status = array(
        "success" => false,
		"message" => "This artwork doesn't belong to you or doesn't exist! Check ID in your SelfCenter!",
    );
}
else if($result->fetch_assoc()['status'] == 1){
    $status = array(
        "success" => false,
		"message" => "This artwork has been sold! You can't change it anymore!",
    );
}
else if($result2->num_rows > 0 &&  $result2->fetch_assoc()['id'] != $id){
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
  $stmt = $conn->prepare("UPDATE artwork SET artname = ?, author = ?, price = ?, year = ?, style = ?,  width = ?,height = ?,intro = ?,image = ?, day = ? WHERE id = $id");
  $stmt->bind_param("ssissiisss", $artname, $author, $price, $year, $style, $width, $height, $intro, $imageData,$today);
  if($stmt->execute()){
      $status = array(
        "success" => true,
        "message" => "Successful Changed!",
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
