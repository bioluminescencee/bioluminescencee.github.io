let scrollDownEl = document.getElementById("scrollDown");
let scrollUpEl = document.getElementById("scrollUp");
let mainEl = document.getElementById("main");
VANTA.WAVES({
  el: "#vanta-header",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  // shininess: 70.00,
  color: 0x0e001e,
  waveHeight: 30.00,
  waveSpeed: 0.45,
  zoom: 0.7
});
let blocking = false;
document.addEventListener("wheel", e => {
  lastWheel = performance.now()
  if (blocking) e.preventDefault();
  if (window.scrollY === 0 && Math.sign(e.deltaY) === 1) {
    e.preventDefault();
    window.scroll({ top: mainEl.offsetTop, left: 0, behavior: 'smooth' });
    blocking = true;
    setTimeout(() => { blocking = false; }, 300);
  }
  if (window.scrollY+e.deltaY < mainEl.offsetTop && Math.sign(e.deltaY) === -1) {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    blocking = true;
    setTimeout(() => { blocking = false; }, 300);
  }
}, { passive: false });
scrollDownEl.addEventListener("click", e => {
  window.scroll({ top: mainEl.offsetTop, left: 0, behavior: 'smooth' });
});
scrollUpEl.addEventListener("click", e => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});
document.addEventListener("scroll", e => {
  if (window.scrollY > 40 && scrollDownEl.style.display !== "none") {
    scrollDownEl.style.display = "none";
  }
  else if (window.scrollY <= 40 && scrollDownEl.style.display === "none") {
    scrollDownEl.style.display = "block";
  }
  if (window.scrollY < 40 && scrollUpEl.style.display !== "none") {
    scrollUpEl.style.display = "none";
  }
  else if (window.scrollY >= 40 && scrollUpEl.style.display === "none") {
    scrollUpEl.style.display = "block";
  }
});