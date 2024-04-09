<?php

// 连接到 MySQL 数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);


$result = $conn->query("SELECT id,artname,price,intro,author,image FROM artwork ORDER BY id DESC LIMIT 8");


$issues = array();
if($result->num_rows <= 0){
    $issue = array(
        'success' => false,
    );
    array_push($issues, $issue);
}
else{
    $issue = array(
        'success' => true,
    );
    array_push($issues, $issue);
    while ($row = $result->fetch_assoc()) {
        $issue = array(
            'id' => $row['id'],
            'artname' => $row['artname'],
            'price' => $row['price'],
            'intro' => $row['intro'],
            'author' => $row['author'],
            "image" => base64_encode($row["image"])
        );
        array_push($issues, $issue);
    }
}

echo json_encode($issues);
?>

