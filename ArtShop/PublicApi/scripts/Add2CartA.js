//请求用户信息的代码
function add2Cart() {
    id = localStorage.getItem("id");
    username = localStorage.getItem("name");
    if (username == '') {
        alert("Login or Register First!");
    }
    else{
        var xhr = new XMLHttpRequest();
        var url = "../../PublicApi/PHP/Add2Cart.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert(response.message);
                }
                else{
                    //添加失败，显示信息（不可重复添加）
                    alert(response.message);
                }
            }
        };
        data = "goodsid="+id+"&username="+username;
        xhr.send(data);
    }
}