const container = document.querySelector(".image");
const zoom = document.querySelector(".zoom");
const pic = document.querySelector(".pic");

container.addEventListener("mousemove", (event) => {
  const x = pic.getBoundingClientRect().left - event.clientX;
  const y = pic.getBoundingClientRect().top - event.clientY;

  var bgX = (x / pic.offsetWidth) * 1000 + 200;
  var bgY = (y / pic.offsetHeight) * 1000 + 100;

  
  zoom.style.backgroundImage = `url(${pic.src})`;
  zoom.style.backgroundPosition = `${bgX}px ${bgY}px`;
  zoom.style.display = "block";

  zoom.style.top = `${container.getBoundingClientRect().top + window.scrollY - 100}px`;
  zoom.style.left = `${container.getBoundingClientRect().right - 20}px`;

});

container.addEventListener("mouseleave", () => {
  zoom.style.display = "none";
});
