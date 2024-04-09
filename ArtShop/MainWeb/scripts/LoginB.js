//格式错误信息相关
var login_form = document.querySelector('.form');
var error_message = login_form.getElementsByClassName('error');
var input_message = login_form.querySelectorAll('input');
var sub_btn = document.querySelector('.submit');
var status_error = [false,false,false,false];
var error_hint = ["Empty Name; ", "Empty Password; ", "Empty Verification Code; ", "Wrong Verification Code;"]
var error_all = "";


function detectEmpty(input_index) {
    if(input_message[input_index].value == ''){
        error_message[input_index].style.display = 'block';
        status_error[input_index] = false;
    }
    else{
        error_message[input_index].style.display = 'none';
        status_error[input_index] = true;
    }
}

function validateTest(){
    status_error[2] = false;
    status_error[3] = false;
    if (error_v.style.display == 'none'){
        status_error[2] = true;
        status_error[3] = true;
    }
    else if(error_v.innerHTML == "Empty Verification"){
        status_error[3] = true;
    }
    else{
        status_error[2] = true;
    }
}


function loginUser() {
    // 获取表单数据
    var username = document.querySelector(".name").value;
    var password = document.querySelector(".password").value;
  
    // 发送请求
    var xhr = new XMLHttpRequest();
    var url = "../PHP/Login.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert(response.message + username);
                localStorage.setItem("name", username)
                location.href = "./Main.html";
                document.querySelector("button").disabled=false;
            }
            else{
                // 登录失败，显示错误信息
                alert(response.message);
                document.querySelector("button").disabled=false;
            }
        }
    };
    var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    xhr.send(data);
}

//submit的最终核实
function finalTest(){
    document.querySelector("button").disabled=true;
    error_all='';
    //最终检测
    //namePwdV(post_name, post_pwd);
    validateTest()
    for (let i = 0; i < status_error.length; i++) {
        if(status_error[i] == false){
            error_all = error_all +  error_hint[i];
        }
    }
    if(error_all != ""){
        alert("Your login is rejected owing to: " + error_all);
        document.querySelector("button").disabled=false;
    }
    else{
        var username = document.querySelector(".name").value;
        if (!(/^[a-zA-Z0-9_]{3,10}$/.test(username))) {
            alert("The User doesn't exist!");
            document.querySelector("button").disabled=false;
        }
        else{
            loginUser();
        }
        
    }

}
