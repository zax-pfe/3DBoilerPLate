import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function runTimeline(dots, run) {
  // return document.fonts.ready.then(() => {
  const splitedDots = new SplitText(dots, {
    pause: true,
    type: "chars, lines",
    mask: "lines",
  });
  const splitedRun = new SplitText(run, {
    pause: true,
    type: "words, lines",
    mask: "lines",
  });

  const timeline = gsap.timeline({ paused: true });

  // timeline.to({}, { duration: 0.5 });
  timeline.from(splitedDots.chars, {
    y: 100,
    yPercent: 100,
    duration: 1,
    opacity: 1,
    ease: "power3.out",
    stagger: {
      amount: 0.3,
      from: "start",
    },
  });
  timeline.to({}, { duration: 0.5 });
  timeline.from(splitedRun.words, {
    y: 100,
    yPercent: 100,
    duration: 1,
    opacity: 1,
    ease: "power3.out",
    stagger: {
      amount: 0.1,
      from: "start",
    },
  });

  return timeline;
  // });
}
