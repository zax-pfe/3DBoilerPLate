import * as THREE from "three";

export const createParticles = (scene, count = 500, safeRadius = 20) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < count; i++) {
    let x, y, z;
    let distance;
    // ne pas créer des particules dans un rayon autour de la chambre
    do {
      x = (Math.random() - 0.5) * 70;
      y = (Math.random() - 0.5) * 70;
      z = (Math.random() - 0.5) * 70;
      distance = Math.sqrt(x * x + y * y + z * z);
    } while (distance < safeRadius);

    positions.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  return particles;
};
