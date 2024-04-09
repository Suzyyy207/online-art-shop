var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
var currentIndex = 0;

function GuessULike() {
    var slideshow = document.querySelector(".slideshow");
    var xhr = new XMLHttpRequest();
    var url = "../PHP/GuessULike.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var recommends = JSON.parse(this.responseText);
            if(recommends['success']){
                for (let i = 0; i < recommends['artworks'].length; i++) {
                    var pic = document.createElement("div");
                    var imageData = atob(recommends['artworks'][i].image);
                    var imageBytes = new Uint8Array(imageData.length);
                    for (let i = 0; i < imageData.length; i++) {
                        imageBytes[i] = imageData.charCodeAt(i);
                    }
                    var imageBlob = new Blob([imageBytes], { type: "image/jpeg" });
                    var imageUrl = URL.createObjectURL(imageBlob);
                    pic.innerHTML = `
                        <a href='../../ArtWorks/htmls/Show.html' onclick=jump2Show(${recommends['artworks'][i].id})>
                            <img src='${imageUrl}' alt="Image">
                        </a>`;
                    slideshow.appendChild(pic);
                }
                showImage(currentIndex);
            }
        }
    };

    var data = "username=" + localStorage.getItem("name");
    xhr.send(data);
}

/* 图片轮播互动函数 */
function showImage(index) {
    var slideshow = document.querySelector('.slideshow');
    var images_slide = slideshow.getElementsByTagName('img');
    console.log(images_slide);
  // 隐藏所有图像
  for (var i = 0; i < images_slide.length; i++) {
    images_slide[i].style.display = 'none';
  }
  // 显示指定索引的图像
  images_slide[index].style.display = 'block';
}

function prevImage() {
  // 显示前一个图像
    var slideshow = document.querySelector('.slideshow');
    var images_slide = slideshow.getElementsByTagName('img');
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images_slide.length - 1;
    }
    showImage(currentIndex);
}

function nextImage() {
  // 显示下一个图像
    var slideshow = document.querySelector('.slideshow');
    var images_slide = slideshow.getElementsByTagName('img');
    currentIndex++;
    if (currentIndex >= images_slide.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

// 初始化


// 绑定事件
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

GuessULike();