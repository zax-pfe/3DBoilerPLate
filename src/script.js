import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createLights } from "./utils/createLights";
import { loadBedRoom } from "./utils/loadBedRoom";
import { createParticles } from "./utils/createParticules";
import { loadMoon } from "./utils/loadMoon";
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

createLights(scene);
createParticles(scene);
loadMoon(scene);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(8.12, 2.32, 4.53);
camera.rotation.set(-0.57, 1.11, 0.52);

// scene.add(camera);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const loader = new GLTFLoader();

loadBedRoom(scene);

// scene.add(bedroom);

// console.log(bedroom);
// loader.load("assets/bedroom/bedroomtallwalls1.glb", (gltf) => {
//   const bedroom = gltf.scene;
//   bedroom.scale.set(1, 1, 1);
//   bedroom.position.set(0, 0, 0);

//   scene.add(bedroom);
// });

/**
 * Animate
 */

let scrollY = 0;
const scrollFactor = 0.01; // ajuste la sensibilité

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  console.log(scrollY); // maintenant ça devrait fonctionner
});

const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();

  console.log(scrollY);
  const elapsedTime = timer.getElapsed();

  if (scrollY == 0) {
    camera.position.y = camera.position.y + Math.cos(elapsedTime) * 0.001;
  } else {
    camera.position.z = 5 - scrollY * scrollFactor;
    camera.position.y = 2 + scrollY * scrollFactor;
  }

  // Update controls
  controls.update();

  // console.log(
  //   `Camera position: x=${camera.position.x.toFixed(
  //     2
  //   )}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`
  // );

  // // 💡 Print la rotation (en radians)
  // console.log(
  //   `Camera rotation: x=${camera.rotation.x.toFixed(
  //     2
  //   )}, y=${camera.rotation.y.toFixed(2)}, z=${camera.rotation.z.toFixed(2)}`
  // );

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
