/**
 * Shader del sistema de partículas del hero. Cada partícula interpola entre
 * una posición dispersa/ruidosa (el "boceto" caótico) y su posición final
 * ordenada (la "producción" precisa), pilotado por el uniform `uAssemble`.
 *
 * El color acompaña la narrativa: índigo (en construcción) cuando está
 * disperso → terracota (terminado/pulido) cuando está ensamblado.
 */

export const assembleVertexShader = /* glsl */ `
  uniform float uAssemble;   // 0 boceto → 1 producción
  uniform float uTime;
  uniform float uSize;
  uniform vec2  uPointer;    // parallax
  uniform float uPixelRatio;

  attribute vec3  aScatter;  // posición dispersa
  attribute float aStagger;  // 0..1 orden de ensamblaje por partícula

  varying float vMix;        // grado de ensamblaje local (para el color)
  varying float vGlow;

  // Ruido barato para el temblor del estado "boceto".
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  float smootherstep(float e0, float e1, float x) {
    float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  void main() {
    // Ensamblaje escalonado: cada partícula "cuaja" en un momento distinto.
    float local = smootherstep(aStagger * 0.55, aStagger * 0.55 + 0.45, uAssemble);
    vMix = local;

    // Temblor del boceto: se desvanece a medida que se ensambla.
    float jitterAmp = (1.0 - local) * 0.35;
    vec3 jitter = vec3(
      sin(uTime * 1.7 + aStagger * 40.0),
      cos(uTime * 1.3 + aStagger * 55.0),
      sin(uTime * 2.1 + aStagger * 33.0)
    ) * jitterAmp;

    vec3 pos = mix(aScatter, position, local) + jitter * (1.0 - local);

    // Parallax sutil ligado al puntero (se aplica en world space).
    pos.x += uPointer.x * 0.25;
    pos.y += uPointer.y * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Las partículas ensambladas son algo más pequeñas y nítidas;
    // las dispersas, más grandes y difusas (aspecto de boceto).
    float sizeScale = mix(1.6, 0.9, local);
    gl_PointSize = uSize * sizeScale * uPixelRatio * (1.0 / -mvPosition.z);

    vGlow = 1.0 - local; // el índigo disperso brilla más
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const assembleFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColorSketch;  // índigo
  uniform vec3 uColorFinal;   // terracota

  varying float vMix;
  varying float vGlow;

  void main() {
    // Punto circular con borde suave.
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d);

    vec3 color = mix(uColorSketch, uColorFinal, vMix);
    // Un plus de brillo en el estado boceto (halo índigo).
    color += uColorSketch * vGlow * 0.35;

    gl_FragColor = vec4(color, alpha * mix(0.55, 0.95, vMix));
  }
`;
