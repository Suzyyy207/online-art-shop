//请求用户信息的代码
function getLatest(){
    var xhr = new XMLHttpRequest();
    var url = "../PHP/GetLatest.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var artworks = JSON.parse(this.responseText);
            if (artworks[0].success){
                var latest = document.querySelector('.newpics');
                
                for (let i=1; i<artworks.length; i++) {
                //图像解析
                var imageData = atob(artworks[i].image);
                var imageBytes = new Uint8Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    imageBytes[i] = imageData.charCodeAt(i);
                }
                var imageBlob = new Blob([imageBytes], { type: "image/jpeg" });
                var imageUrl = URL.createObjectURL(imageBlob);
                
                //创建新元素
                var artwork = document.createElement("div");
                artwork.setAttribute("class","art_piece");
                artwork.innerHTML = `
                    <div class="art_piece_image">
                        <a href='../../ArtWorks/htmls/Show.html' onclick=jump2Show(${artworks[i].id})>
                        <img src='${imageUrl}' alt="Image">
                        </a>
                    </div>
                    <div class="art_piece_info">
                        <h3>${artworks[i].artname}</h3>
                        <p>${artworks[i].author}</p>
                        <p>$${artworks[i].price}</p>
                        <p>${artworks[i].intro}</p>
                    </div>
                `;
                latest.appendChild(artwork);
                }
            }
            else{
                console.log("no goods");
            }
        }
    };

    var data = "request='hi'";
    xhr.send(data);
}

getLatest();