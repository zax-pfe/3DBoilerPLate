import gsap from "gsap";

export function createDreamTimeline(
  camera,
  controls,
  floorMaterial,
  monsterRef
) {
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => console.log(" Dream Timeline terminée !"),
  });

  timeline.to(
    camera.position,
    {
      duration: 4,
      x: -40,
      y: 3,
      z: 30,

      onUpdate: () => {
        const progress = timeline.progress(); // valeur entre 0 et 1
        // Oscillation sinus pour simuler la marche
        const amplitude = 0.2; // hauteur du rebond
        const frequency = 20; // nombre d'oscillations pendant le déplacement
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
      value: 1, // nouvelle valeur finale
      ease: "power1.in",
    },
    0
  );

  timeline.to(
    floorMaterial.uniforms.noiseRatio,
    {
      duration: 4,
      value: 1, // nouvelle valeur finale
      ease: "power1.inOut",
    },
    0
  );
  // Animation du noiseStrength
  timeline.to(
    floorMaterial.uniforms.noiseStrength,
    {
      duration: 4,
      value: 2, // nouvelle valeur finale
      ease: "power1.inOut",
    },
    0
  );
  timeline.to(
    floorMaterial.uniforms.noiseStrength,
    {
      duration: 4,
      value: 2, // nouvelle valeur finale
      ease: "power1.inOut",
    },
    0
  );

  return timeline;
}
