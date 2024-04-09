<?php
$artid = intval($_POST['artid']);
$username = $_POST['username'];

$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

$sql = "SELECT * FROM comments WHERE artid='$artid'";
$result = $conn->query($sql);

$list = array();
if($result->num_rows <= 0){
    $item = array(
        'success' => false,
    );
    array_push($list, $item);
}
else{
    $item = array(
        'success' => true,
    );
    array_push($list, $item);
}

while ($row = $result->fetch_assoc()) {
    if ($row['father'] == -1) {
        //查询评论子评论
        $father = $row['id'];
        $sql = "SELECT * FROM comments WHERE father='$father'";
        $son_re = $conn->query($sql);

        //用array形成子评论数据
        $sons = array();
        while($son = $son_re->fetch_assoc()){
            //查询当前评论是否被点赞
            $commentid = $son['id'];
            $sql = "SELECT * FROM likes WHERE commentid='$commentid' and username='$username'";
            $is_like = $conn->query($sql);

            //按是否点赞查询数据
            if ($is_like->num_rows > 0) {
                $like_btn = 1;
            }
            else{
                $like_btn = 0;
            }

            $son_item = array(
                'content' => $son['content'],
                'username' => $son['username'],
                'likes' => $son['likes'],
                'id' => $son['id'],
                'like_btn' => $like_btn
            );

            array_push($sons, $son_item);   
        }

        //查询父评论是否被点赞
        $commentid = $row['id'];
        $sql = "SELECT * FROM likes WHERE commentid='$commentid' and username='$username'";
        $is_like = $conn->query($sql);
        if ($is_like->num_rows > 0 ) {
            $like_btn = 1;
        }
        else{
            $like_btn = 0;
        }

        $item = array(
            'content' => $row['content'],
            'username' => $row['username'],
            'likes' => $row['likes'],
            'id' => $row['id'],
            'delete' => $row['deleted'],
            'like_btn' => $like_btn,
            'sons' => $sons
        );

        array_push($list, $item);
    }
}

echo json_encode($list);
$conn->close();

?>