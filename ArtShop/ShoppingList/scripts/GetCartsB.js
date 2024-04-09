//请求用户信息的代码
function getCarts(username) {
  var xhr = new XMLHttpRequest();
  var url = "../PHP/GetCarts.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log(xhr.responseText);
          var artworks = JSON.parse(this.responseText);
          if (artworks[0].success){
              document.querySelector(".hint").innerHTML = ""  
              var list = document.querySelector('.list');
              
              for (let i=1; i<artworks.length; i++) {
                //图像解析
                var imageData = atob(artworks[i].image);
                var imageBytes = new Uint8Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    imageBytes[i] = imageData.charCodeAt(i);
                }
                var imageBlob = new Blob([imageBytes], { type: "image/jpeg" });
                var imageUrl = URL.createObjectURL(imageBlob);
                var status = ["On Sale","Sold"]
                //创建新元素
                var artwork = document.createElement("div");
                artwork.setAttribute("class","item");
                artwork.innerHTML = `
                    <div>
                        <a href='../../ArtWorks/htmls/Show.html' onclick=jump2Show(${artworks[i].id})>
                        <img src='${imageUrl}' alt="Image">
                        </a>
                    </div>
                    <div class="info">
                        <p>Name: ${artworks[i].artname}</p>
                        <p>Author: ${artworks[i].author}</p>
                        <p>Price: $${artworks[i].price}</p>
                        <p>Status: ${status[artworks[i].status]}</p>
                    </div>
                    <div class="intro">
                        <p>Intro: ${artworks[i].intro}</p>
                    </div>
                    <div class="btns">
                        <button class="btn" onclick=deleteCart(${artworks[i].id})>Delete</button>
                        <button class="btn" onclick=buyGoods(${artworks[i].id})>Buy now</button>
                    </div>
                `;
                list.appendChild(artwork);
              }
          }
          else{
              document.querySelector(".hint").innerHTML = "No Artwork Added!"
          }
      }
  };

  var data = "username="+username;
  xhr.send(data);
}
 

username = localStorage.getItem("name");
getCarts(username);