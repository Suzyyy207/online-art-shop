/*本公共接口用于实现导航栏相关功能*/
var user_name = localStorage.getItem("name");
var nav_change = document.querySelector('.nav_change')
var other_link = document.querySelector('.other_link')
var welcome_nav = nav_change.querySelector('p')
var login_nav = nav_change.querySelector('nav')
const links = document.querySelectorAll('nav a');
var music_p = document.querySelectorAll('.nav_change div button');
var music_nav = document.querySelectorAll('.nav_change nav button');


/*导航栏跳转*/
// 遍历所有链接，为每个链接添加点击事件处理程序
links.forEach(link => {
	link.addEventListener('click', event => {
		event.preventDefault();
		const url = link.href;
		window.location.href = url;
	});
});


/*动态显示welcome处的显示*/
if (user_name === null) {
    localStorage.setItem("name", "");
    user_name = localStorage.getItem("name");
}

//根据用户状态设置不同的组件

if(user_name === ""){
    welcome_nav.style.display = "none";
    other_link.style.display = "none";
    for (let i = 0; i < music_p.length; i++) {
        music_p[i].style.display = "none";
    }
}
else{
    login_nav.style.display = "none";
    welcome_nav.innerHTML = "Hello, " + user_name + "!";
    for (let i = 0; i < music_nav.length; i++) {
        music_nav[i].style.display = "none";
    }
}


