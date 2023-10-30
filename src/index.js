var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut"
  })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      ease: "expo.inOut",
      delay: -1,
      stagger: 0.2
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut"
    });
}

function skewCircle() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (event) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, event.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, event.clientY - yprev);

    xprev = event.clientX;
    yprev = event.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (event) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var diffrot = 0;
  var rotate = 0;
  elem.addEventListener("mouseleave", function (event) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3.inOut",

      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8)
    });
  });
  elem.addEventListener("mousemove", function (event) {
    var diff = event.clientY - elem.getBoundingClientRect().top;
    diffrot = event.clientX - rotate;
    rotate = event.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power1.inOut",
      top: diff,
      left: event.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8)
    });
  });
});

skewCircle();
firstPageAnim();
