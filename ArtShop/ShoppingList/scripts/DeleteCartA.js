function deleteCart(id) {
    var xhr = new XMLHttpRequest();
    var url = "../PHP/DeleteCart.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(this.responseText);
            location.reload();
        }
    }
    username = localStorage.getItem("name");
    var data = "username="+username+"&goodsid="+id;
    xhr.send(data);
}
