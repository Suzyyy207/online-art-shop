var verification = false;
var code = "";
var code_length = 4;
var check_code = document.querySelector(".verification_code"); 
var input_code
var error_v = document.querySelector('.error_v');

var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
'S','T','U','V','W','X','Y','Z');

function createCode(){ 
  code = "";

  for(var i = 0; i < code_length; i++) {
    var index = Math.floor(Math.random()*36);
    code += random[index];
  }  
  check_code.value = code;  
}

//初始化
createCode()


//校验验证码  
function validate(){
    input_code = document.querySelector(".verification").value.toUpperCase();  
    if(input_code.length <= 0) {  
        error_v.style.display = 'block';
        error_v.innerHTML = "Empty Verification" 
    }
    else if(input_code != code ) {
        error_v.innerHTML = "Verification Error"  
        error_v.style.display = 'block'; 
    }
    else { 
        error_v.style.display = 'none';
    } 
}