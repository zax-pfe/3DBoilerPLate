import * as THREE from "three";

export const createLights = (scene) => {
  const ambientLight = new THREE.AmbientLight("purple", 0.1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("purple", 10);
  directionalLight.position.set(16.2, 17.22, -4.67);

  const LightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  scene.add(LightHelper);

  scene.add(directionalLight);

  return { ambientLight, directionalLight };
};
