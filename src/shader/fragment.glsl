uniform vec3 lightDirection; // direction de la lumière
uniform vec3 lightColor;     // couleur de la lumière
uniform vec3 baseColor;      // couleur de base du matériau

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Normale normalisée
  vec3 normal = normalize(vNormal);

  // Direction de la lumière (inverse car elle "vient" vers l'objet)
  vec3 lightDir = normalize(-lightDirection);

  // Intensité Lambertienne (diffuse)
  float diff = max(dot(normal, lightDir), 0.0);

  // Couleur finale = lumière * intensité + ambiance légère
  vec3 ambient = vec3(0.1);
  vec3 color = baseColor * (ambient + diff * lightColor);

  gl_FragColor = vec4(color, 1.0);
}