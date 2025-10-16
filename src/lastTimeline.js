import gsap from "gsap";
import { time } from "three/tsl";

export function createLastTimeline(
  camera,
  controls,
  overlayPanel,
  overlayText,
  directionalLight
) {
  const timeline = gsap.timeline({
    paused: true,
    onStart: () => {
      directionalLight.position.set(16.2, 17.22, -4.67);
      directionalLight.rotation.set(0, 0, 0);
    },
    onComplete: () => console.log(" Last Timeline terminée !"),
  });

  timeline.to(
    camera.position,
    {
      duration: 0.1,
      x: 9.12,
      y: 5,
      z: 4.53,
    },
    0
  );

  timeline.to(
    overlayPanel,
    {
      duration: 1.5,
      opacity: 0,
      ease: "power1.out",
    },
    1.5
  );

  timeline.to(
    controls.target,
    {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,

      onComplete: () => {
        controls.update();
      },
    },
    0
  );

  timeline.to(
    camera.position,
    {
      duration: 2,
      x: 8.12,
      y: 2.32,
      z: 4.53,
    },
    1
  );

  return timeline;
}
