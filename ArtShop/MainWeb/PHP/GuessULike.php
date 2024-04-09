<?php
$username = $_POST['username'];

// 连接到 MySQL 数据库
$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

//按浏览量推荐
$result = $conn->query("SELECT artid,times4view,commentlikes FROM views WHERE username = '$username'");
$max = 0;
$commend1 = -1;
if ($result -> num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $score = $row['times4view'] + $row['commentlikes'] * 0.5;
        if ($score > $max) {
            $max = $score;
            $commend1 = $row['artid'];
        }
    }
}
else {
    $top3 = $conn->query("SELECT id FROM artwork ORDER BY views DESC LIMIT 1");
    $commend1 = $top3->fetch_assoc()['id'];
}


//！注意重复问题

//按搜索记录找overlap
$result = $conn->query("SELECT search,types FROM search WHERE username = '$username'");
$max = 0;
$commend2 = -1;
$views = 0;
if ($result -> num_rows > 0 ) {
    $row = $result->fetch_assoc();
    $search_text = explode(";",$row['search']);
    $types =  explode(";",$row['types']);
    $all_artworks = $conn->query("SELECT id,artname,author,views FROM artwork");
    
    while ($row = $all_artworks->fetch_assoc()) {
        $score = 0;
        for ($i=0; $i<4 && $i<count($types)-1; $i++) { 
            $content = $search_text[$i];
            $content_test = strtolower($content);
            $artwork_test = strtolower($row[$types[$i]]);
            $pos = strpos($artwork_test,$content_test);
            if ($pos !== false) {
                $score++;   
            }
        }
        if ($score > $max && $row['id'] != $commend1) {
            $max = $score;
            $commend2 = $row['id'];
            $views = $row['views'];
        }
        else if($score == $max && $row['id'] != $commend1){
            if ($row['views'] > $views) {
                $commend2 = $row['id'];
                $views = $row['views'];
            }
        }
    }
}
else {
    $tops = $conn->query("SELECT id FROM artwork ORDER BY views DESC");
    while ($row = $tops->fetch_assoc()) {
        if ($row['id'] != $commend1) {
            $commend2 = $row['id'];
            break;
        }
    } 
}

//当前浏览量最高的
$commend3 = -1;
$tops = $conn->query("SELECT id FROM artwork ORDER BY views DESC");
while ($row = $tops->fetch_assoc()) {
    if ($row['id'] != $commend1 && $row['id'] != $commend2) {
        $commend3 = $row['id'];
        break;
    }
} 



$result = $conn->query("SELECT id,image FROM artwork WHERE id = '$commend1' OR id = '$commend2' OR id='$commend3'");
$pics = array();
while ($row = $result->fetch_assoc()) {
    $pic = array(
        'image' => base64_encode($row['image']),
        'id' => $row['id']
    );
    array_push($pics,$pic);
}

$issues = array(
    'success' => true,
    'artworks' => $pics
    
);





echo json_encode($issues);
?>

