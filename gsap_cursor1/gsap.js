const posX = 0,
  posY = 0;

const  mouseX = 0,
  mouseY = 0;

gsap.to(".cursor-example", {
  duration: 0.018,
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 8;
    posY += (mouseY - posY) / 8;

    gsap.set(".cursor-example", {
      css: {
        left: posX - 1,
        top: posY - 2
      }
    });
  }
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
