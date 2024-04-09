var page = 1;
var sort = "artname";
var searchS = -1;
var total_page = 1;

//改变page的函数
function clickPage(btn){
    if (btn==-1) {
        if (page == 1) {
            alert("This is the first page!");
        }
        else{
            page -= 1;
            search();
        }
    }
    else{
        if (page == total_page) {
            alert("This is the last page!");
        }
        else{
            page += 1;
            search();
        }
    }
}
function gotoPage(){
    var num = document.querySelector(".page").value;
    var format =/^[0-9]{1,10}$/;
    if(format.test(num)){
        if (Number(num) > total_page) {
            alert("The number shouldn't be bigger than the total!");
            document.querySelector(".page").value = "";
        }
        else{
            page = Number(num);
            search();
        }
    }
    else{
        alert("Only positive integer accepted");
        document.querySelector(".page").value = "";
    }
}

function sortChange(){
    page = 1;
    radios = document.getElementsByName("sort");
    for(let i=0; i<4; i++){
        if(radios[i].checked){
            sort = radios[i].value;
            break;
        }
    }
    search();
    
}

//点击搜索函数
function clickSearch(){
    var test_text = /^[!,.&^$a-zA-Z0-9\s\']{1,16}$/
    judge = test_text.test(document.querySelector(".hi").value);
    if (judge) {
        searchS = 1;
        page = 1;
        search();
    }
    else{
        alert("Please input something and don't make it longer than 16");
    }
    
    
}

//根据参数展示相关商品
function search(){
    var xhr = new XMLHttpRequest();
    var url = "../PHP/Search.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var artworks = JSON.parse(this.responseText);
            if (artworks[0].success){
                if (artworks[0].search == false) {
                    document.querySelector(".hint").innerHTML = "No result compacted" ;
                }
                else{
                    if (searchS == -1) {
                        document.querySelector(".hint").innerHTML = "";
                    }
                    else{
                        document.querySelector(".hint").innerHTML = "There are "+artworks[0].all + " results";
                    }
                }
                var list = document.querySelector('.list');
                list.innerHTML = '';
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
                          <img class="result" src='${imageUrl}' alt="Image">
                          </a>
                      </div>
                      <div class="info">
                          <p>Name: ${artworks[i].artname}</p>
                          <p>Author: ${artworks[i].author}</p>
                          <p>Price: $${artworks[i].price}</p>
                          <p>Status: ${status[artworks[i].status]}</p>
                      </div>
                      <div class="intro">
                          <p>Intro: <textarea readonly class="intro">${artworks[i].intro}</textarea></p>
                          <p>Views: ${artworks[i].views}</p>
                          <p>Year: ${artworks[i].year}</p>
                      </div>
                  `;
                  list.appendChild(artwork);
                }
                var now_page = document.querySelector(".now_page");
                now_page.innerHTML = page + " / " + artworks[0].total;
                total_page = artworks[0].total
            }
            else{
                console.log(artworks[0].message);
            }
        }
    };
    var search_text = document.querySelector(".hi").value;
    var select = document.getElementById("scope").value;
    var username = localStorage.getItem("name");
    var data = "page="+page+"&sort="+sort+"&search="+searchS+"&text="+search_text+"&select="+select+"&username="+username;
    xhr.send(data);

    
}


search();