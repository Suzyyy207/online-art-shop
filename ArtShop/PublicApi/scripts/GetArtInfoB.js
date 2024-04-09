function getArtworkInfo(id,username) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `../../PublicApi/PHP/GetArtInfo.php/artInfo?id=${encodeURIComponent(id)}&username=${encodeURIComponent(username)}`);    
    xhr.onload = function() {
      if (xhr.status === 200) {
        var artInfo = JSON.parse(xhr.responseText); // 解析服务器返回的 JSON 数据
        if(artInfo.success){
          artstatus = ["On sale","Sold"]; 
          document.querySelector('.artname').innerHTML = "Name: " + artInfo.artname;
          document.querySelector('.author').innerHTML = "Author: " + artInfo.author;
          document.querySelector('.status').innerHTML = "Status: " + artstatus[artInfo.status];
          document.querySelector('.price').innerHTML = "Price: $" + artInfo.price;
          document.querySelector('.year').innerHTML = "Year: " + artInfo.year;
          document.querySelector('.style').innerHTML = "Style: " + artInfo.style;
          document.querySelector('.width').innerHTML = "Width: "+ artInfo.width + "mm";
          document.querySelector('.height').innerHTML = "Height: "+ artInfo.height + "mm";
          document.querySelector('.owner').innerHTML = "Owner: " + artInfo.owner;
          document.querySelector('.intro').innerHTML = "Intro: " + artInfo.intro;
          document.querySelector('.day').innerHTML = "Issue Day: " + artInfo.day;
          document.querySelector('.views').innerHTML = "Views: " + artInfo.views;
          var imageData = atob(artInfo.image);
          var imageBytes = new Uint8Array(imageData.length);
          for (let i = 0; i < imageData.length; i++) {
            imageBytes[i] = imageData.charCodeAt(i);
          }
          // 创建 Blob 对象并将其转换为 URL
          var imageBlob = new Blob([imageBytes], { type: "image/jpeg" });
          var imageUrl = URL.createObjectURL(imageBlob);
          // 将 URL 赋值给 img 元素的 src 属性
          document.querySelector('.pic').src = imageUrl;
        }
          
        else{
          console.log("fail");
        }
        
      }
    };
    xhr.send();
  }
 

id = localStorage.getItem("id");
username = localStorage.getItem("name");
getArtworkInfo(id,username);