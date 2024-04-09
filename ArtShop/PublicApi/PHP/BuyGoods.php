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

$check = "SELECT account FROM shopuser WHERE username='$username' ";
$check_re = $conn->query($check);
$sql = "SELECT owner,status,price FROM artwork WHERE id='$goodsid'";
$result = $conn->query($sql);


// 检查查询结果
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $buyer_account = $check_re->fetch_assoc();

    if ($row['status'] == 1) {
        $status = array(
            "success" => false,
            "message" => "Someone has bought it!",
        );
            echo json_encode($status);
    }
    else if($row['owner'] == $username){
        $status = array(
            "success" => false,
            "message" => "You can't buy your own goods!",
        );
            echo json_encode($status);
    }
    else{
        if ($row['price'] > $buyer_account['account']) {
            $status = array(
                "success" => false,
                "message" => "You didn't have enough money",
                "check" => $row['price'] ,
            );
                echo json_encode($status);
        }
        else{
            //更新owner账户
            $owner = $row['owner'];
            $charge = "SELECT account FROM shopuser WHERE username='$owner' ";
            $owner_account = $conn->query($charge)->fetch_assoc();
            $account = $owner_account['account'] + $row['price'];
            $owner_update = "UPDATE shopuser SET account=$account WHERE username='$owner'";
            $result = $conn->query($owner_update);
            //更新购买者商户
            $account = $buyer_account['account'] - $row['price'];
            $buyer_update = "UPDATE shopuser SET account=$account WHERE username='$username'";
            $result = $conn->query($buyer_update);
            //更新状态
            $statsus = "UPDATE artwork SET status=1, buyer='$username' WHERE id='$goodsid'";
            $conn->query($statsus);
            //返回信息
            $status = array(
                "success" => true,
                "message" => "You have bought it! Please wait for our delivery!",
            );
                echo json_encode($status);
        }
        
    }
	
} 
else{
	$status = array(
		"success" => false,
		"message" => "This Artwork has been deleted by the owner"   
	);
	echo json_encode($status);
}

// 关闭连接
$conn->close();
?>
