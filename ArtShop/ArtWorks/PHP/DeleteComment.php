<?php
$id = intval($_POST['id']);

$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

$sql = "SELECT * FROM comments WHERE id='$id'";
$result = $conn->query($sql);


if ($result->fetch_assoc()['father'] == -1){

    $stmt = $conn->prepare("UPDATE comments SET  deleted=? WHERE id = $id");
    $deleted = -1;
    $stmt->bind_param("i",$deleted);
    $sql = "DELETE FROM likes WHERE commentid=$id";
    $delete_re = $conn->query($sql);

    if($stmt->execute()){
        $status = array(
          "success" => true,
          "message" => "Successful delete and keep",
        );
    }
    else{
        $status = array(
          "success" => false,
          "message" => "Fail",
        );
    }
}

else {
    $sql = "DELETE FROM comments WHERE id=$id";
    $delete_re = $conn->query($sql);
    $sql = "DELETE FROM likes WHERE commentid=$id";
    $delete_re = $conn->query($sql);
    $status = array(
        "success" => true,
        "message" => "Successful delete son",
    );
    
}

echo json_encode($status);
$conn->close();

?>