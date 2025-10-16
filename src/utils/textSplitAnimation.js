import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function textSplitAnimation(overlayText) {
  // document.fonts.ready.then(() => {
  const split = new SplitText(overlayText, {
    type: "chars, lines",
    mask: "lines",
  });

  const timeline = gsap.timeline();
  // overlayText.style.visibility = "visible";
  timeline.to({}, { duration: 1 }); // Ajoute un délai avant le début de l'animation
  timeline.from(split.chars, {
    y: 100,
    yPercent: 100,
    duration: 1,
    ease: "power3.out",
    stagger: {
      amount: 0.3,
      from: "random",
    },
  });
  // });
}
