import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadBedRoom = (scene) => {
  const loader = new GLTFLoader();
  loader.load("assets/bedroom/bedroomtallwalls1.glb", (gltf) => {
    const bedroom = gltf.scene;
    bedroom.scale.set(1, 1, 1);
    bedroom.position.set(0, 0, 0);

    // return bedroom;

    scene.add(bedroom);
  });
};
