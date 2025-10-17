import gsap from "gsap";
export function createDreamTimeline(
  camera,
  controls,
  floorMaterial,
  monsterRef,
  overlayPanel,
  runContainer
) {
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => console.log(" Dream Timeline terminée !"),
  });

  timeline.to(
    runContainer,
    {
      duration: 0.5,
      opacity: 0,
      ease: "power1.inOut",
    },
    0
  );

  timeline.to(
    camera.position,
    {
      duration: 4,
      x: -40,
      y: 3,
      z: 50,

      onUpdate: () => {
        const progress = timeline.progress();
        const amplitude = 0.2;
        const frequency = 20;
        camera.position.y =
          3 + Math.sin(progress * frequency * Math.PI * 2) * amplitude;
      },
    },
    0
  );

  timeline.to(
    monsterRef.position,
    {
      duration: 4,
      x: -45,
      ease: "power1.in",
    },
    0
  );

  timeline.to(
    floorMaterial.uniforms.noiseRatio,
    {
      duration: 4,
      value: 1,
      ease: "power1.inOut",
    },
    0
  );
  timeline.to(
    floorMaterial.uniforms.noiseStrength,
    {
      duration: 4,
      value: 2,
      ease: "power1.inOut",
    },
    0
  );
  timeline.to(
    floorMaterial.uniforms.noiseStrength,
    {
      duration: 4,
      value: 2,
      ease: "power1.inOut",
    },
    0
  );

  timeline.to(
    monsterRef.position,
    {
      duration: 4,
      y: 4,
      // value: 1,
      ease: "power1.in",
    },
    1.5
  );
  timeline.to(
    controls.target,
    {
      duration: 1.5,
      x: -20,
      y: 3,
      z: 49, // Position derrière la caméra
      onUpdate: () => {
        controls.update();
      },
    },
    2
  );
  timeline.to(
    overlayPanel,
    {
      duration: 1,
      opacity: 1,
      // ease: "power1.inOut",
    },
    3
  );

  return timeline;
}
