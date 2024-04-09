//请求所有评论数据并显示（按照用户信息选择是否显示删除）
function getComment(){
    var xhr = new XMLHttpRequest();
    var url = "../PHP/GetComment.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.responseText);
            var comments = JSON.parse(this.responseText);
            var username = localStorage.getItem("name");

            if (comments[0].success){
                document.querySelector(".hint").innerHTML = "";
                var comments_div = document.querySelector('.comments');

                for (let i = 1; i < comments.length; i++) {
                    var comment = document.createElement("div");
                    comment.setAttribute("class","comment");

                    //插入评论内容
                    var content = document.createElement("div");
                    if (comments[i].delete == 0) {
                        content.innerHTML = `
                            <div>
                                <p class="content">${comments[i].content}</p>
                            </div>
                        `;   
                    }
                    else{
                        content.innerHTML = `
                            <div>
                                <p class="content" style="color: red;">This has been deleted</p>
                            </div>
                        `; 
                    }
                    
                    comment.appendChild(content);

                    //插入所有回复
                    var sons = document.createElement("div");
                    sons.setAttribute("class","sons");
                    var likes = ['like','Cancel like'];
                    for (let j=0; j<comments[i].sons.length; j++) {
                        var son = document.createElement("div");
                        son.setAttribute("class","son");
                        if (username == comments[i].sons[j].username) {
                            son.innerHTML = `
                                <p class="content">${comments[i].sons[j].content}</p>
                                <div class="comment_info">
                                    <p>commnet by ${comments[i].sons[j].username} & like by ${comments[i].sons[j].likes} person</p>
                                <div class="btns_c">
                                    <button class="btn_c" onclick="like(${comments[i].sons[j].id})">${likes[Number(comments[i].sons[j].like_btn)]}</button>
                                    <button class="btn_c" onclick="deleteComment(${comments[i].sons[j].id})">delete</button>
                                </div>
                            `;
                        }
                        else{
                            son.innerHTML = `
                                <p class="content">${comments[i].sons[j].content}</p>
                                <div class="comment_info">
                                    <p>commnet by ${comments[i].sons[j].username} & like by ${comments[i].sons[j].likes} person</p>
                                <div class="btns_c">
                                    <button class="btn_c" onclick="like(${comments[i].sons[j].id})">${likes[comments[i].sons[j].like_btn]}</button>
                                </div>
                            `;
                        }
                        sons.appendChild(son);
                    }
                    if (comments[i].sons.length>0) {
                        comment.appendChild(sons);
                    }
                    

                    //插入具体信息
                    var info = document.createElement("div");
                    info.setAttribute("class","comment_info");
                    if (comments[i].delete == 0 && comments[i].username == username) {
                        info.innerHTML = `
                            <p>commnet by ${comments[i].username} & like by ${comments[i].likes} person</p>
                            <div class="reply">
                                <textarea></textarea>
                            </div>
                            <div class="btns_c">
                                <button class="btn_c" onclick="like(${comments[i].id})">${likes[Number(comments[i].like_btn)]}</button>
                                <button class="btn_c" onclick="deleteComment(${comments[i].id})">delete</button>
                                <button class="btn_c" onclick="reply(${comments[i].id})">reply</button>
                            </div>
                        `;
                    }
                    else if (comments[i].delete == 0 && comments[i].username != username) {
                        info.innerHTML = `
                            <p>commnet by ${comments[i].username} & like by ${comments[i].likes} person</p>
                            <div class="reply">
                                <textarea></textarea>
                            </div>
                            <div class="btns_c">
                                <button class="btn_c" onclick="like(${comments[i].id})">${likes[Number(comments[i].like_btn)]}</button>
                                <button class="btn_c" onclick="reply(${comments[i].id})">reply</button>
                            </div>
                        `;
                    }
                    else{
                        info.innerHTML = `
                            <p>This comment has been deleted</p>
                        `;

                    }
                    comment.appendChild(info);

                    //整合到comments中
                    comments_div.appendChild(comment);
                }
                
            }
            else{
                document.querySelector(".hint").innerHTML = "No comment uploaded yet!"
            }
        }
    };
    var data = "artid="+localStorage.getItem("id") +"&username="+localStorage.getItem("name");
    xhr.send(data);
}
getComment();

//发表评论按钮
function comment() {
    if (localStorage.getItem("name") == '') {
        alert("Login or Register First!");
    }
    else{
        if (true) {
            var xhr = new XMLHttpRequest();
            var url = "../PHP/UPComment.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(xhr.responseText);
                    var response = JSON.parse(this.responseText);
                    alert(response.message);
                    location.reload();
                }
            };

            var data = "username="+localStorage.getItem("name")+"&artid="+localStorage.getItem("id")+"&content="+content+"&father=-1";
            xhr.send(data);
            
        }
        else{
            alert("Only English Letters and Numbers are Acceptable (Less than 128)");
        }
    }
    
}

//回复评论按钮
function reply(father) {
    if (localStorage.getItem("name") == '') {
        alert("Login or Register First!");
    }
    else{
        var content = document.querySelector(".reply textarea").value;
        var judge = /^[a-zA-Z0-9\s\']{1,128}$/;
        if (judge.test(content)) {
            var xhr = new XMLHttpRequest();
            var url = "../PHP/UPComment.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(xhr.responseText);
                    var response = JSON.parse(this.responseText);
                    alert(response.message);
                    location.reload();
                }
            };

            var data = "username="+localStorage.getItem("name")+"&artid="+localStorage.getItem("id")+"&content="+content+"&father="+father;
            xhr.send(data);
            
        }
        else{
            alert("Only English Letters and Numbers are Acceptable (Less than 128)");
        }
    }
}

//删除评论按钮
function deleteComment(id) {
    var xhr = new XMLHttpRequest();
    var url = "../PHP/DeleteComment.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            alert(response.message);
            location.reload();
        }
    };

    var data = "id="+id;
    xhr.send(data);
}

//点赞按钮
function like(id){
    if (localStorage.getItem("name") == '') {
        alert("Login or Register First!");
    }
    else{
        var xhr = new XMLHttpRequest();
        var url = "../PHP/UPLike.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = JSON.parse(this.responseText);
                alert(response.message);
                location.reload();
            }
        };
        var data = "id=" + id + "&username=" + localStorage.getItem("name") +"&artid="+localStorage.getItem("id");
        xhr.send(data);
    }
    
    
}