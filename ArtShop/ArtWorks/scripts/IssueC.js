//获取输入与错误信息
var form = document.querySelector('.form');
var error_message = form.getElementsByClassName('error');
var input_message = form.querySelectorAll('input');
var intro = form.querySelector('textarea');
var file_input = document.getElementById('fileInput');


//格式规定，格式错与空字符提示语
var format = [
              /^[0-9]{1,2}$/,
              /^[0-9]{1,9}$/,
              /^[a-zA-Z0-9\s\']{1,16}$/,
              /^[a-zA-Z\s\']{1,16}$/,
              /^[0-9]{1,9}$/,
              /^[0-9]{1,4}$/,
              /^[a-zA-Z\s\']{1,16}$/,
              /^[0-9]{1,6}$/,
              /^[0-9]{1,6}$/,
              /^[a-zA-Z0-9\s\']{1,128}$/,
            ]
var format_hint=["Only PNG and JPG Accpeted",
                "Positive Integer!",
                "Only English Letters and Numbers Acceptable (Less than 20)",
                "Only English Letters Acceptable (Less than 20)",
                "Positive Integer smaller than 1,000,000,000",
                "Postive integer with length of 1-4",
                "Only English Letters Acceptable (Less than 20)",
                "Positive Integer smaller than 1,000,000",
                "Positive Integer smaller than 1,000,000",
                "Only English Letters and Numbers Acceptable (Less than 128)"
            ];
var empty_hint = ["Empty image","Empty ID","Empty Name","Empty Author","Empty Price","Empty Year","Empty Style","Empty Size","Empty Size","Empty Introduction"]
//为提交准备的状态检验
var status_error = [false,false,false,false,false,false,false,false,false,false];
var error_all = "";
var date;

//第一个input是图片（单独检查是否上传）
//检测是否为空
function detectEmpty(detect,input_index) {
    
    if(detect == ''){
        error_message[input_index].innerHTML = empty_hint[input_index];
        error_message[input_index].style.display = 'block';
        status_error[input_index] = false;
        return false;
    }
    else{
        error_message[input_index].style.display = 'none';
        status_error[input_index] = true;
        return true;
    }
}

//格式检查
function detectFormat(input_index){
    //必填项，检查是否为空
    //intro单独
    if (input_index == 9) {
        var detect = intro.value;
    }
    else if(input_index == 0){
        if(file_input.files.length == 0){
            var detect = '';
        }
        else{
            var detect = '1';
        }
    }
    else{
        var detect = input_message[input_index].value;
    }

    var empty_test = detectEmpty(detect,input_index);
    if(empty_test == true){
        var format_test = format[input_index].test(detect);
        if (format_test == false){
            error_message[input_index].innerHTML = format_hint[input_index];
            error_message[input_index].style.display = 'block';
            status_error[input_index] = false;
        }
        else{
            error_message[input_index].style.display = 'none';
            status_error[input_index] = true; 
        }
    }
        
}


//向后端请求数据核实
function IssueUser(status) {
    // 获取表单数据
    var issue = new FormData();
    var image = file_input.files[0];
    var id = document.querySelector(".id").value;
    var artname = document.querySelector(".name").value;
    var author = document.querySelector(".author").value;
    var owner = localStorage.getItem("name");
    var price = document.querySelector(".price").value;
    var year = document.querySelector(".year").value;
    var style = document.querySelector(".style").value;
    var width = document.querySelector(".width").value;
    var height = document.querySelector(".height").value;
    var intro = document.querySelector(".intro").value
    
    var info_name = ['image', 'id','artname','author','owner','price','year','style','width','height','intro'];
    var info_data = [image, id,artname,author,owner,price,year,style,width,height,intro];

    for (let name = 0; name < 11; name++) {
        issue.append(info_name[name],info_data[name])
        console.log(issue.getAll(info_name[name]));
    } 

    if (status) {
         // 发送请求
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../PHP/IssueChange.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                var response = JSON.parse(this.responseText);
                alert(response.message);
                if (response.success) {
                    location.href = "../../SelfCenter/htmls/SelfCenter.html";
                }
                
            }
        };
        xhr.send(issue);    
    }
    else{
         // 发送请求
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../PHP/Issue.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                var response = JSON.parse(this.responseText);
                alert(response.message);
                if (response.success) {
                    location.href = "../../SelfCenter/htmls/SelfCenter.html";
                }
            }
        };
        xhr.send(issue);
    }
   
}



//submit的最终核实
function finalTest(status){
    error_all = '';
    if(!status){
        status_error[1] = true;
    }
    for (let i = 0; i<status_error.length; i++) {
        if(error_all != ""){
            break;
        }
        else if(status_error[i] == false){

            error_all = "You didn't fill in required fields according to the FORMAT or leave it EMPTY! ";
            break;
        }
    }


    if(error_all != ""){
        alert("Your issue is rejected owing to: " + error_all);
    }
    else{
        IssueUser(status)
        //location.href = "./Login.html";
    }

}
