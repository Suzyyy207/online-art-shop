<?php
$page = intval($_POST['page']);
$sort = $_POST['sort'];
$search = intval($_POST['search']);
$text = $_POST['text'];
$select = $_POST['select'];
$username = $_POST['username'];


$servername = "localhost";
$name = "root";
$pwd = "layluhan520";
$dbname = "ArtShop";
$conn = new mysqli($servername, $name, $pwd, $dbname);

if ($sort == 'views') {
    $result = $conn->query("SELECT id,artname,author,price,year,intro,views,image,status FROM artwork ORDER BY $sort DESC");
}
else{
    $result = $conn->query("SELECT id,artname,author,price,year,intro,views,image,status FROM artwork ORDER BY $sort");  
}
$all = array();
$list = array();
$search_all = array();


while($row = $result->fetch_assoc()){
    $item = array(
        'id' => $row['id'],
        'artname' => $row['artname'],
        'price' => $row['price'],
        'intro' => $row['intro'],
        'author' => $row['author'],
        'status' => $row['status'],
        'year' => $row['year'],
        'views' => $row['views'],
        'image' => base64_encode($row["image"])
    );
    array_push($all, $item);
}

//筛选(先按是否search与搜索内容方式)
$count = 0;
if ($search == 1) {
    //记录最新检索记录
    $result = $conn->query("SELECT search,types FROM search WHERE username = '$username'");
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $search_text = explode(";",$row['search']);
        $types = explode(";",$row['types']);
        if (count($search_text) >= 4) {
            $search_text  = $text .";" .$search_text[0] . ";".$search_text[1] .";".$search_text[2]. ";";
            $types = $select .";" .$types[0] . ";". $types[1] . ";".$types[2]. ";";
        }
        else {
            $search_text  = $text . ";" . $row['search'];
            $types = $select . ";" . $row['types'];
        }
        $stmt = "UPDATE search SET search='$search_text',types='$types' WHERE username = '$username'";
        $conn->query($stmt);
    }
    else{
        $search_text  = $text . ";" ;
        $types = $select . ";";
        $stmt = $conn->prepare("INSERT INTO search(search,types,username) VALUES (?,?,?)");
        $stmt->bind_param("sss", $search_text,$types,$username);
        $stmt->execute();
    }

    //检索操作
    for ($j=0; $j<count($all); $j++) {
        $artwork = strtolower($all[$j][$select]);
        $search_my = strtolower($text);
        $pos = strpos($artwork,$search_my);
        if ($pos === false) {
            continue;
        }
        else{
            $item = $all[$j];
            array_push($search_all, $item);
            $count += 1;
        }
    }
}
else{
    $search_all = $all;
    $count = count($search_all);
}


//根据筛选结果插入不同数据
if ($count <= 0){
    $item = array(
        'success' => true,
        'search' => false,
        'total' => ceil(count($all)/5)
    );
    array_push($list,$item);
    for($i=($page-1)*5; $i<($page)*5 && $i<count($all); $i++) {
        $item = $all[$i];
        array_push($list, $item);  
    }
}
else{
    $item = array(
        'success' => true,
        'search' => true,
        'total' => ceil(count($search_all)/5),
        'all' => count($search_all)
    );
    array_push($list,$item);
    for($i=($page-1)*5; $i<($page)*5 && $i<count($search_all); $i++) {
        $item = $search_all[$i];
        array_push($list, $item);  
    }
}


echo json_encode($list);
?>

