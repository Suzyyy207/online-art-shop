<?php
$father = intval($_POST['father']);
$artid = $_POST['artid'];
$username = $_POST['username'];
$content = $_POST['content'];


$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);


$stmt = $conn->prepare("INSERT INTO comments (father, artid, username, content) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiss", $father, $artid, $username, $content);
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


echo json_encode($status);

$conn->close();
?>
