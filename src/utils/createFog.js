import * as THREE from "three";

export function createFog(
  scene,
  color = "black",
  fogIntensity = 0.06,
  type = "exp2"
) {
  if (type === "default") {
    scene.fog = new THREE.Fog("black", 5, 30);
  }

  if (type === "exp2") {
    scene.fog = new THREE.FogExp2(color, fogIntensity);
  }
}
