<?php
$commentid = intval($_POST['id']);
$username = $_POST['username'];
$artid = intval($_POST['artid']);

$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

$sql = "SELECT * FROM likes WHERE commentid='$commentid' and username='$username'";
$result = $conn->query($sql);
$likes = "SELECT likes FROM comments WHERE id='$commentid'";
$likes_num = $conn->query($likes)->fetch_assoc()['likes'];


if ($result->num_rows > 0){

  //评论点赞记录更新
  if ($username != '') {
    $sql = "SELECT * FROM views WHERE artid='$artid' and username='$username'";
    $check_view = $conn->query($sql);
    if ($check_view->num_rows > 0) {
      $my_likes = $check_view->fetch_assoc()['commentlikes'] - 1;
      $stmt = $conn->prepare("UPDATE views SET commentlikes=? WHERE artid = '$artid' and username='$username'");
      $stmt->bind_param("i", $my_likes);
      $stmt->execute();
    }
  }


  //操作
    $sql = "DELETE FROM likes WHERE username='$username' and commentid=$commentid";
    $delete_re = $conn->query($sql);

    $stmt = $conn->prepare("UPDATE comments SET likes=? WHERE id = $commentid");
    $update_like = $likes_num - 1;
    $stmt->bind_param("i", $update_like);
    if($stmt->execute()){
        $status = array(
          "success" => true,
          "message" => "Successful unlike",
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

  //点赞记录更新
  if ($username != '') {
    $sql = "SELECT * FROM views WHERE artid='$artid' and username='$username'";
    $check_view = $conn->query($sql);
    if ($check_view->num_rows > 0) {
      $my_likes = $check_view->fetch_assoc()['commentlikes'] + 1;
      $stmt = $conn->prepare("UPDATE views SET commentlikes=? WHERE artid = '$artid' and username='$username'");
      $stmt->bind_param("i", $my_likes);
      $stmt->execute();
    }
  }


    $sql = "INSERT INTO likes (username,commentid) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $username, $commentid);
    $stmt->execute();

    $stmt = $conn->prepare("UPDATE comments SET likes=? WHERE id = $commentid");
    $update_like = $likes_num + 1;
    $stmt->bind_param("i", $update_like);
    if($stmt->execute()){
        $status = array(
          "success" => true,
          "message" => "Successful like",
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