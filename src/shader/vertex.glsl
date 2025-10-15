#include ./noise/noise.glsl
#include ./noise/perlin.glsl
#include ./noise/generic.glsl

uniform float time;
uniform float noiseRatio;
uniform float noiseStrength;

varying vec3 vNormal;
varying float vDistance;

void main() {
  vNormal = normal;

  // Calculate noise based on position and time
  vec3 noisePos = position * noiseRatio + time * 0.5;

//   SIMPLEX NOISE
//   float noise = snoise(noisePos);
  // PERLIN NOISE
  float noise = cnoise(noisePos);
  // GENERIC NOISE
//   float noise = noise(noisePos);


  // Displace vertices along their normal
  vec3 newPosition = position + normal * noise * noiseStrength;

  // calculate the distance of the vector from 0,0,0
  vDistance = length(newPosition);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}