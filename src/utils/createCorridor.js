import * as THREE from "three";
import vertexShader from "../shader/vertex.glsl";
import fragmentShader from "../shader/fragment.glsl";
const dreamShift = 50;

// function addWall(){

// }

export function createCorridor(scene) {
  const group = new THREE.Group();

  // CREATION OF THE FLOOR
  // const floorMaterial = new THREE.MeshStandardMaterial({
  //   color: "white",
  //   metalness: 0.1,
  //   roughness: 0.5,
  //   side: THREE.DoubleSide,
  // });

  const floorMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      noiseRatio: { value: 0.0 },
      noiseStrength: { value: 0.0 },
      lightDirection: {
        value: new THREE.Vector3(16.2, 17.22, -4.67).normalize(),
      },
      lightColor: { value: new THREE.Color(0.878, 0.953, 0.996) }, // couleur violette pâle
      baseColor: { value: new THREE.Color(0.886, 0.114, 0.745) }, // bleu clair
    },
  });

  const floorSizeX = 100;
  const floorSizeY = 20;
  const wallHeght = 30;

  const floorGeometry = new THREE.PlaneGeometry(
    floorSizeX,
    floorSizeY + 15,
    40,
    40
  );
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 0);
  group.add(floor);

  const wallsGeometry = new THREE.BoxGeometry(25, wallHeght, 12, 30, 30, 30);
  const wall1 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall1.position.set(0, 0 + wallHeght / 2, -floorSizeY / 2);
  group.add(wall1);

  const wall2 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall2.position.set(0, 0 + wallHeght / 2, floorSizeY / 2);
  group.add(wall2);

  const wall3 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall3.position.set(30, 0 + wallHeght / 2, -floorSizeY / 2);
  group.add(wall3);

  const wall4 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall4.position.set(30, 0 + wallHeght / 2, +floorSizeY / 2);
  group.add(wall4);

  const wall5 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall5.position.set(-30, 0 + wallHeght / 2, -floorSizeY / 2);
  group.add(wall5);

  const wall6 = new THREE.Mesh(wallsGeometry, floorMaterial);
  wall6.position.set(-30, 0 + wallHeght / 2, floorSizeY / 2);
  group.add(wall6);

  const roofGeometry = new THREE.CylinderGeometry(
    9.7, // rayon haut
    9.7, // rayon bas
    40, // hauteur
    32, // segments radiaux
    1, // segments de hauteur
    true, // openEnded (true = pas de cap)
    0, // thetaStart (angle de départ)
    Math.PI // thetaLength (angle de la portion = demi-cercle)
  );

  const roof = new THREE.Mesh(roofGeometry, floorMaterial);
  roof.rotation.z = Math.PI / 2;

  roof.position.set(0, wallHeght, dreamShift);

  group.position.set(0, 0, dreamShift);

  return { group, floorMaterial };
}
