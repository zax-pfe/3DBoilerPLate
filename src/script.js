import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createLights } from "./utils/createLights";
import { loadBedRoom } from "./utils/loadBedRoom";
import { createParticles } from "./utils/createParticules";
import { loadMoon } from "./utils/loadMoon";
import { createCorridor } from "./utils/createCorridor";
import { logCameraPos } from "./utils/logCameraPos";
import { createTimeline } from "./timeline";
import { loadMonster } from "./utils/loadMonsters";
import { createDreamTimeline } from "./dreamTimeline";
import { createLastTimeline } from "./lastTimeline";
import { textSplitAnimation } from "./utils/textSplitAnimation";
import { createFog } from "./utils/createFog";
import { endingSplitAnimation } from "./utils/endingSplitAnimation";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";

const data = {
  lightx: 0,
  lighty: 0,
  lightz: 0,

  homeMaxRotation: 0.3,
  homeRotationLerp: 0.05,
  newFogintensity: 0.01,
};

const colorData = {
  baseColor: "#ff66e3",
  lightColor: "#e1f3fe",
};

let fogIntensity = data.newFogintensity;
let activateBreathing = true;
let breathingFrequency = 1;
let breathingAmplitude = 0.001;

// CANVAS
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// CREATE THE LIGHTS
const { ambientLight, directionalLight } = createLights();
scene.add(ambientLight);
scene.add(directionalLight);

// INSERT THE MESHES

createParticles(scene, 500, 20, { x: 0, y: 0, z: 0 });
createParticles(scene, 500, 0, { x: -75, y: 25, z: 50 });
createParticles(scene, 500, 0, { x: -40, y: 5, z: 0 });
loadMoon(scene);
loadBedRoom(scene);
createFog(scene, "black", fogIntensity, "exp2");
const { group, floorMaterial } = createCorridor(scene);
const uniforms = floorMaterial.uniforms;

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
  composer.setSize(sizes.width, sizes.height);
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

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.enableZoom = false;

/**
 * Post-processing setup
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const composer = new EffectComposer(renderer);
composer.setSize(sizes.width, sizes.height);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const effect2 = new ShaderPass(RGBShiftShader);
effect2.uniforms["amount"].value = 0.0015;
composer.addPass(effect2);

const filmPass = new FilmPass(0.25, 0.5, 2048, false);
composer.addPass(filmPass);

const effect3 = new OutputPass();
composer.addPass(effect3);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const overlay = document.getElementsByClassName("overlay");
const overlayPanel = document.getElementsByClassName("overlay-panel");
const overlayText = document.querySelector(".overlay-text");
const endtext = document.querySelector(".endtext-container");

// TIMELINES
textSplitAnimation(overlayText);
endingSplitAnimation(endtext);

const timeline = createTimeline(
  camera,
  controls,
  overlayPanel,
  overlayText,
  directionalLight
);

let monsterRef;
let dreamTimeline = null;
let lastTimeline = null;

loadMonster(scene).then((monster) => {
  monsterRef = monster;

  dreamTimeline = createDreamTimeline(
    camera,
    controls,
    floorMaterial,
    monsterRef,
    overlayPanel,
    overlayText
  );
  lastTimeline = createLastTimeline(
    camera,
    controls,
    overlayPanel,
    overlayText,
    monsterRef,
    directionalLight
  );
  dreamTimeline.eventCallback("onComplete", () => {
    lastTimeline.play();
  });
  lastTimeline.eventCallback("onComplete", () => {
    console.log("Last timeline terminée");
    activateBreathing = true;
    breathingFrequency = 4;
    breathingAmplitude = 0.0025;
    endingTextTimeline.play();
  });
});

function activateScrollTimeline(scrollTimeline) {
  let scrollMax = document.body.scrollHeight - window.innerHeight;

  window.addEventListener("scroll", () => {
    if (scrollTimeline.progress() >= 1) return;

    const scrollY = window.scrollY;
    const scrollProgress = scrollY / scrollMax;
    scrollTimeline.progress(scrollProgress);
  });
}

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  timeline.play();
  activateBreathing = false;
  window.scrollTo(0, 0);
  timeline.eventCallback("onComplete", () => {
    console.log("Première timeline terminée — activation du scroll control");
    window.scrollTo(0, 0);
    activateScrollTimeline(dreamTimeline);
  });
});

/**
 * Animate
 */

let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
});

const timer = new Timer();
const tick = () => {
  if (data.newFogintensity !== fogIntensity) {
    createFog(scene, "black", fogIntensity, "exp2");
  }

  fogIntensity = data.newFogintensity;
  // Timer
  timer.update();

  const elapsedTime = timer.getElapsed();
  floorMaterial.uniforms.time.value = elapsedTime;

  if (activateBreathing == true) {
    camera.position.y =
      camera.position.y +
      Math.cos(elapsedTime * breathingFrequency) * breathingAmplitude;
    controls.target.x +=
      (mouse.x * data.homeMaxRotation - controls.target.x) *
      data.homeRotationLerp;
    controls.target.y +=
      (mouse.y * data.homeMaxRotation - controls.target.y) *
      data.homeRotationLerp;
  }

  // Update controls
  controls.update();

  // logCameraPos(camera, controls);

  // Render
  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Debug
const gui = new GUI();
gui.add(data, "lightx", 0, 5, 0.1);
gui.add(data, "lighty", 0, 5, 0.1);
gui.add(data, "lightz", 0, 5, 0.1);
gui.add(data, "homeMaxRotation", 0, 1, 0.01);
gui.add(data, "homeRotationLerp", 0, 0.1, 0.01);
gui.add(data, "newFogintensity", 0, 0.1, 0.001);

gui.addColor(colorData, "baseColor").onChange((value) => {
  floorMaterial.uniforms.baseColor.value.set(value);
});

gui.addColor(colorData, "lightColor").onChange((value) => {
  floorMaterial.uniforms.lightColor.value.set(value);
});

gui
  .add(uniforms.noiseRatio, "value", 0.1, 20)
  .min(0)
  .max(1)
  .step(0.01)
  .name("noiseRatio");
gui
  .add(uniforms.noiseStrength, "value", 0.0, 10)
  .min(0)
  .max(3)
  .step(0.01)
  .name("Noise Strenght");
scene.add(group);

gui
  .add(floorMaterial.uniforms.lightDirection.value, "x", -1, 1, 0.01)
  .name("Light X");
gui
  .add(floorMaterial.uniforms.lightDirection.value, "y", -1, 1, 0.01)
  .name("Light Y");
gui
  .add(floorMaterial.uniforms.lightDirection.value, "z", -1, 1, 0.01)
  .name("Light Z");
