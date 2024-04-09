//获取输入与错误信息
var form = document.querySelector('.form');
var error_message = form.getElementsByClassName('error');
var input_message = form.querySelectorAll('input');
var sub_btn = document.querySelector('.submit');
var error_v = document.getElementsByClassName('error_v')[0];
//密码强弱
var pwd = document.querySelector('.password');
var pwd_strength = document.querySelector('.pwd_strength');
//格式规定，格式错与空字符提示语
var format = [/^[a-zA-Z0-9_]{3,10}$/,
              /^[a-zA-Z\d_-]{6,32}$/,
              /^[\sa-zA-Z0-9]{3,32}$/,  //这个有bug加空格和特殊字符
              /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
              /^1[3-9]\d{9}$/,
              /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/]
var format_hint=["3-10 English Letters or Numbers","6-32 Letters, Number or '_'","Unmatch Password"];
var empty_hint = ["Empty Name","Empty Password","Empty Confirm Password"]
//为提交准备的状态检验
var status_error = [false,false,false,true,true,true,true];
var error_all = "";
var date;


//密码强弱检测
function checkPasswordStrength(password) {
    const lengthScore = password.length >= 8 ? 1 : 0;
    const complexityScore = /\d/.test(password) + /[a-z]/.test(password) +
      /[A-Z]/.test(password) + /[@#$%^&*_]/.test(password);
    const totalScore = lengthScore + complexityScore;
    if (totalScore <= 2) {
      return 'Weak😢 Make it longer than 8 and include more than two kinds of these: A-Z, a-z, numbers, spcial characteristics';
    } else if (totalScore <= 3) {
      return 'Medium😐 Include more than three kinds of these: A-Z, a-z, numbers, special characteristics';
    } else {
      return 'Strong😊';
    }
}  
function pwdStrength(){
    if(error_message[1].style.display == 'none' ){
        const password = pwd.value;
        const strength = checkPasswordStrength(password);
        pwd_strength.textContent = `Strength: ${strength}`;
        pwd_strength.style.display = 'block';
    }
    else{
        pwd_strength.style.display = 'none';
    }
}

//检测是否为空
function detectEmpty(input_index) {
    if(input_message[input_index].value == ''){
        error_message[input_index].innerHTML = empty_hint[input_index];
        error_message[input_index].style.display = 'block';
        status_error[input_index] = false;
        pwdStrength()
        return false;
    }
    else{
        error_message[input_index].style.display = 'none';
        status_error[input_index] = true;
        return true;
    }
}

//格式检查
function detectFormat(input_index, format_index){
    //必填项，检查是否为空
    if(input_index == 0 || input_index == 1 || input_index == 2){
        var empty_test = detectEmpty(input_index);
        if(empty_test == true){
            //确认密码单查
            if(input_index == 2){
                if(input_message[2].value === input_message[1].value){
                    status_error[input_index] = true;
                }
                else{
                    error_message[input_index].innerHTML = "Password Unmatch";
                    error_message[input_index].style.display = 'block';
                    status_error[input_index] = false;
                }
            }
            else{
                var format_test = format[format_index].test(input_message[input_index].value);
                if(format_test == true){
                    status_error[input_index] = true;
                    //密码强弱显示
                    if(input_index == 1){
                        pwdStrength()
                    }
                }
                else{
                    error_message[input_index].innerHTML = format_hint[input_index];
                    error_message[input_index].style.display = 'block';
                    status_error[input_index] = false;
                    pwdStrength();
                }
            }
            
        }
    }

    //选填项，只检查格式
    else{
        var format_test = format[format_index].test(input_message[input_index].value);
            if(format_test == true || input_message[input_index].value == ''){
                error_message[input_index].style.display = 'none';
                status_error[input_index] = true;
            }
            else{
                error_message[input_index].style.display = 'block';
                status_error[input_index] = false;
            }
    }

    //日期单独检查
    if(input_index == 6 && error_message[6].style.display == 'none' && input_message[input_index].value != ''){
        //将不合格的日期改为最邻近的日期
        date = new Date(input_message[input_index].value);
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var formattedDate = `${year}-${month}-${day}`;
        input_message[6].value = formattedDate;
        //检测是否比今天早
        var today = new Date();
        if (date.getTime() >= today.getTime()){
            error_message[input_index].style.display = 'block';
            status_error[input_index] = false;
        }

    }
}






//检查最终验证码的错误是什么
function validateTest(){
    if (error_v.style.display == 'block'){
        error_all = error_v.innerHTML;
    }
}


//向后端请求数据核实
function RegisterUser() {
    // 获取表单数据
    var username = document.querySelector(".name").value;
    var password = document.querySelector(".password").value;
    var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

    var intro = document.querySelector(".intro");
    var email = document.querySelector(".email");
    var phone = document.querySelector(".phone");
    var birth = document.querySelector(".birth");
    var gender = document.querySelector(".gender");
    var address = document.querySelector(".address");
    var country = document.querySelector(".country");
    var information = [intro, email,phone,birth,gender,address,country];
    var infor_name = ["intro", "email","phone","birth","gender","address","country"];

    for (let name = 0; name < 7; name++) {
        if (information[name].value != ''){
            data = data + "&" + infor_name[name] + "=" + encodeURIComponent(information[name].value);
        }
        else{
            data = data + "&" + infor_name[name] + "=" + encodeURIComponent(null);
        }
        
    } 
    console.log(data);
    // 发送请求
    var xhr = new XMLHttpRequest();
    var url = "../PHP/Reg.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert(response.message + username);
                document.querySelector("button").disabled=false;
                location.href = "./Login.html"; 
            }
            else{
                // 登录失败，显示错误信息
                alert(response.message);
                document.querySelector("button").disabled=false;
            }
        }
    };
    xhr.send(data);
}



//submit的最终核实
function finalTest(){
    document.querySelector("button").disabled=true;
    error_all = '';

    validateTest()

    for (let i = 0; i < 3; i++) {
        if(error_all != ""){
            break;
        }
        else if(status_error[i] == false){
            error_all = "You have not filled in required fields according to the FORMAT! You must fill in the name and two passwords!";
            break;
        }
    }
    for (let i = 3; i < status_error.length; i++) {
        if(error_all != ""){
            break;
        }
        else if(status_error[i] == false){
            error_all = "You have not filled in the information according to the format! Please pay attention to the prompt message!";
            break;
        }
    }


    if(error_all != ""){
        alert("Your registry is rejected owing to: " + error_all);
        document.querySelector("button").disabled=false;
    }
    else{
        RegisterUser()
    }

}

sub_btn.addEventListener('click', finalTest);
