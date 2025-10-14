uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    // On échantillonne la texture originale
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = texColor;
}