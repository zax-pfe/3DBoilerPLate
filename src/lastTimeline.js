import gsap from "gsap";
import { time } from "three/tsl";

export function createLastTimeline(
  camera,
  controls,
  overlayPanel,
  overlayText,
  monsterRef,
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
      y: 3.32,
      z: 4.53,
    },
    0
  );

  timeline.to(
    overlayPanel,
    {
      duration: 1,
      opacity: 0,
    },
    2
  );

  timeline.to(
    controls.target,
    {
      duration: 1,
      x: 0.29,
      y: -0.02,
      z: 0.0,

      onComplete: () => {
        controls.update();
      },
    },
    0
  );

  timeline.to(
    camera.position,
    {
      duration: 1.5,
      x: 8.12,
      y: 2.32,
      z: 4.53,
    },
    0
  );

  return timeline;
}
