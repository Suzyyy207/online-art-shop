function buyGoods(id) {
    if (id == -1) {
        id = localStorage.getItem("id");
    }
    username = localStorage.getItem("name");
    if (username == '') {
        alert("Login or Register First!");
    }
    else{
        var xhr = new XMLHttpRequest();
        var url = "../../PublicApi/PHP/BuyGoods.php"
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert(response.message);
                    location.reload();
                }   
                else{
                    alert(response.message);
                }
            }
        };
        data = "goodsid="+id+"&username="+username;
        xhr.send(data); 
    }
}