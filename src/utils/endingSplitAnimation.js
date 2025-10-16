import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function endingSplitAnimation(endtext) {
  // return document.fonts.ready.then(() => {
  const split = new SplitText(endtext, {
    pause: true,
    type: "chars, lines",
    mask: "lines",
  });

  const timeline = gsap.timeline({ paused: true });

  timeline.to({}, { duration: 2 });
  timeline.from(split.chars, {
    y: 100,
    yPercent: 100,
    duration: 1,
    opacity: 1,
    ease: "power3.out",
    stagger: {
      amount: 0.3,
      from: "random",
    },
  });

  return timeline;
  // });
}
