export function logCameraPos(camera) {
  console.log(
    `Camera position: x=${camera.position.x.toFixed(
      2
    )}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`
  );

  // 💡 Print la rotation (en radians)
  console.log(
    `Camera rotation: x=${camera.rotation.x.toFixed(
      2
    )}, y=${camera.rotation.y.toFixed(2)}, z=${camera.rotation.z.toFixed(2)}`
  );
}
