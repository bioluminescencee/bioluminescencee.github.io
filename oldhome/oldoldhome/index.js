

function fadeElements (e) {
  let fadeheight = window.scrollY + screen.height - screen.height / 5;
  Array.from(document.getElementsByTagName("section")).forEach(ele => {
    if (fadeheight > ele.offsetTop) {
      ele.style.opacity = 1;
    }
    else {
      ele.style.opacity = 0;
    }
  });
}
document.addEventListener("DOMContentLoaded", fadeElements);
document.addEventListener("scroll", fadeElements);