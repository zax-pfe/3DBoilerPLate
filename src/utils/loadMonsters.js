import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadMonster = (scene) => {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      "assets/monsters/monster.glb",
      (gltf) => {
        const monster = gltf.scene;
        monster.scale.set(3, 3, 3);
        monster.position.set(50, 0, 50);
        monster.rotation.y = -Math.PI / 2;

        scene.add(monster);
        resolve(monster); // on renvoie le monster
      },
      undefined,
      (error) => reject(error)
    );
  });
};
