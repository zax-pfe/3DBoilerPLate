import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadDoor = (scene) => {
  const loader = new GLTFLoader();
  loader.load("assets/door/hospital_door.glb", (gltf) => {
    const door = gltf.scene;
    door.scale.set(0.004, 0.004, 0.004);
    door.rotation.y = -Math.PI / 2;
    door.position.set(-30, 0, 50);

    scene.add(door);
  });
};
