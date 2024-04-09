var account = document.querySelector('.account');
var input = document.querySelector('input').value;
var after_charge = 0;

//充值函数
function charge(){
    input = document.querySelector('input');
    account = document.querySelector('.account');
    var txt;
    if (confirm("Are you sure to charge?")) {
        if (/^\d{1,7}$/.test(input.value)) {
            after_charge = Number(input.value) + Number(account.innerHTML);
            account.innerHTML = after_charge; 
            input.value = '';
            var xhr = new XMLHttpRequest();
            var url = "../PHP/Charge.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var data = "account=" + encodeURIComponent(after_charge) +"&username=" + encodeURIComponent(localStorage.getItem("name"));
            xhr.send(data);
        }
        else{
            alert("The recharge you entered is invalid. The recharge amount must be an INTGER less than 10000000.")
        }  
    }    
}

//个人信息修改
function changeInfo() {
    location.href = "./ChangeInfo.html";    
}



//展示issue
function getIssueData(){
    var xhr = new XMLHttpRequest();
    var url = "../PHP/Issues.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var artworks = JSON.parse(this.responseText);
            if (artworks[0].success){
                var tbody = document.querySelector('.table');
                for (let i=1; i<artworks.length; i++) {
                var tr = document.createElement("tr");
                var status_all =["On Sale","Sold","Unavailable"]; 
                tr.innerHTML = `
                    <td>${artworks[i].id}</td>
                    <td>${artworks[i].artname}</td>
                    <td>${artworks[i].price}</td>
                    <td>${status_all[artworks[i].status]}</td>
                    <td><button onclick="deleteGoods(${artworks[i].id}, ${artworks[i].status})" >delete</button></td>
                `;
                tbody.appendChild(tr);
                }
            }
            else{
                console.log("no goods");
            }
        }
    };

    var owner = localStorage.getItem("name");
    var data = "owner="+encodeURIComponent(owner);
    xhr.send(data);
}
function deleteInTable(id) {
    let table = document.querySelector("table");
    let rowIndex = -1; // 要删除的行号
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        if (cells[0].innerHTML == id) {
            rowIndex = i;
            break;
        }    
    }

    if (rowIndex != -1) {
        table.deleteRow(rowIndex);
    }    
}
function deleteGoods(id,status) {
    var xhr = new XMLHttpRequest();
    var url = "../PHP/DeleteIssue.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "id=" + encodeURIComponent(id);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(this.responseText);
            if (response.success){
                alert(response.message)
            }
            else{
                alert(response.message);
            }
        }
    };

    if (status == 1) {
        alert("You can't delete this artwork since some one has bought it!");
    }
    else{
        xhr.send(data);
        deleteInTable(id);
    }
}
getIssueData();

//展示已购买
function getOrderData() {
    var xhr = new XMLHttpRequest();
    var url = "../PHP/Orders.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var orders = JSON.parse(this.responseText);
            if (orders[0].success){
                var tbody = document.querySelector('.table2');
                for (let i=1; i<orders.length; i++) {
                var tr = document.createElement("tr");
                var status_all =["On Sale","Sold","Unavailable"]; 
                tr.innerHTML = `
                    <td>${orders[i].artname}</td>
                    <td>${orders[i].price}</td>
                    <td>${orders[i].owner}</td>
                    <td>${orders[i].year}</td>
                    <td>${status_all[orders[i].status]}</td>
                `;
                tbody.appendChild(tr);
                }
            }
            else{
                console.log("no goods");
            }
        }
    };

    var buyer = localStorage.getItem("name");
    var data = "buyer="+encodeURIComponent(buyer);
    xhr.send(data); 
}
getOrderData()