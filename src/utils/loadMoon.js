import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadMoon = (scene) => {
  const loader = new GLTFLoader();
  loader.load("assets/moon/Moon.glb", (gltf) => {
    const moon = gltf.scene;
    moon.scale.set(0.2, 0.2, 0.2);
    moon.position.set(-59.27, 22.12, -5.54);

    moon.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 0.2;
        child.material.roughness = 0.3;
        child.material.emissive = new THREE.Color(0xffffff);
        child.material.emissiveIntensity = 10;
      }
    });

    // Light devant la lune
    const moonLight = new THREE.PointLight(0xffffff, 1, 50);
    moonLight.position.set(-59.27, 22.12, -4);
    scene.add(moonLight);

    scene.add(moon);
  });
};
