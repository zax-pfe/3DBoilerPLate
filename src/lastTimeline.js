import gsap from "gsap";
import { time } from "three/tsl";

export function createLastTimeline(
  camera,
  controls,
  overlayPanel,
  overlayText,
  directionalLight,
  monsterRef,
  blackscreen
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
      x: 8.12,
      y: 2.32,
      z: 4.53,
    },
    0
  );

  timeline.to(
    monsterRef.position,
    {
      duration: 0.1,
      x: 4,
      y: 1,
      z: 2.5,
    },
    0
  );
  timeline.to(
    monsterRef.rotation,
    {
      duration: 0.1,
      x: 0,
      y: Math.PI / 2 - Math.PI / 9,
      z: 0,
    },
    0
  );

  timeline.to(
    monsterRef.position,
    {
      duration: 1,

      x: 12,
      y: 2,
      z: 7,
    },
    1
  );

  timeline.to(
    blackscreen,
    {
      duration: 0.1,
      opacity: 1,
      // ease: "power1.inOut",
    },
    1.15
  );
  timeline.to(
    blackscreen,
    {
      duration: 1,
      opacity: 0,
      ease: "power1.in",
    },
    2
  );

  timeline.to(
    overlayPanel,
    {
      duration: 2,
      opacity: 0,
      ease: "power1.out",
    },
    0.8
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

  // timeline.to(
  //   camera.position,
  //   {
  //     duration: 2,
  //     x: 8.12,
  //     y: 2.32,
  //     z: 4.53,
  //   },
  //   1
  // );

  return timeline;
}
