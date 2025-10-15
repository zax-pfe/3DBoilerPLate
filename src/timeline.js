import gsap from "gsap";

export function createTimeline(
  camera,
  controls,
  overlayPanel,
  overlayText,
  directionalLight
) {
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => console.log("Timeline terminée !"),
  });

  timeline.to(
    camera.position,
    {
      duration: 1,
      y: 10,
      ease: "power1.inOut",
    },
    0
  );

  timeline.to(
    overlayPanel,
    {
      duration: 1,
      opacity: 1,
      ease: "power1.inOut",
    },
    0
  );
  timeline.to(
    overlayText,
    {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
    },
    0
  );

  timeline.to(
    camera.position,
    {
      duration: 1,
      x: 50,
      y: 3,
      z: 30,
      onComplete: () => {
        controls.target.set(-8, 3, 29);
        controls.update();
        directionalLight.position.set(70, 15, 30);
        directionalLight.rotation.set(0, 0, 0);
      },
    },
    1
  );

  timeline.to(
    camera.position,
    {
      duration: 1,
      x: 40,
      y: 3,
      z: 30,
    },
    2
  );

  timeline.to(
    overlayPanel,
    {
      duration: 2,
      opacity: 0,
      ease: "power1.inOut",
    },
    2
  );

  return timeline;
}
