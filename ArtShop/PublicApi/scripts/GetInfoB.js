//请求用户信息的代码
function getUserInfo(username) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `../../PublicApi/PHP/GetInfo.php/userInfo?username=${encodeURIComponent(username)}`);    
    xhr.onload = function() {
      if (xhr.status === 200) {
        var userInfo = JSON.parse(xhr.responseText);
        console.log(xhr.responseText)
        data = [userInfo.email,userInfo.phone,userInfo.birth]
        for (let i = 0; i < 3; i++) {
          if (data[i] == 'null') {
            data[i] = 'Empty';
          }
       }
        document.querySelector('.username').innerHTML = "Name: " + userInfo.username;
        document.querySelector('.email').innerHTML = "Email: " + data[0];
        document.querySelector('.phone').innerHTML = "Tel: " + data[1];
        document.querySelector('.birthday').innerHTML = "Birthday: " + data[2];
        document.querySelector('.account').innerHTML = userInfo.account;
        localStorage.setItem("birth",data[2]);
      }
    };
    xhr.send();
  }
  
getUserInfo(localStorage.getItem("name"));