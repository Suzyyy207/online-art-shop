<?php
$buyer = $_POST['buyer'];

// 连接到 MySQL 数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);


$result = $conn->query("SELECT artname, price, owner,year, status FROM artwork WHERE buyer='$buyer'");


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
            'artname' => $row['artname'],
            'price' => $row['price'],
            'owner' => $row['owner'],
            'year' => $row['year'],
            'status' => $row['status'],
        );
        array_push($issues, $issue);
    }
}

echo json_encode($issues);
?>

