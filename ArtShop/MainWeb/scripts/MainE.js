//主页bgm
function playBGM(index) {
  document.querySelectorAll("audio")[index].play();
}

function stopBGM(index){
  document.querySelectorAll("audio")[index].pause();
}

