import * as THREE from 'three';

export interface AssembleGeometryData {
  target: Float32Array; // posiciones finales (estructura precisa)
  scatter: Float32Array; // posiciones dispersas (boceto)
  stagger: Float32Array; // orden de ensamblaje por partícula
  count: number;
}

/**
 * Construye los datos de partículas: las posiciones "target" se muestrean de
 * la superficie de un nudo tórico (estructura precisa y reconocible), y las
 * "scatter" forman una nube de ruido esférica (el boceto caótico).
 */
export function buildAssembleGeometry(count: number): AssembleGeometryData {
  // Geometría fuente: un nudo tórico bien teselado del que muestrear vértices.
  const source = new THREE.TorusKnotGeometry(1.35, 0.42, 420, 26, 2, 3);
  const src = source.attributes.position.array as Float32Array;
  const srcCount = src.length / 3;

  const target = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const stagger = new Float32Array(count);

  // Índices barajados para tomar una muestra homogénea de la superficie.
  const idx = new Uint32Array(srcCount);
  for (let i = 0; i < srcCount; i++) idx[i] = i;
  for (let i = srcCount - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = idx[i];
    idx[i] = idx[j];
    idx[j] = t;
  }

  for (let i = 0; i < count; i++) {
    const s = idx[i % srcCount] * 3;

    // Ligera dispersión sobre la superficie para dar grosor y evitar patrón.
    const jitter = 0.05;
    target[i * 3 + 0] = src[s + 0] + (Math.random() - 0.5) * jitter;
    target[i * 3 + 1] = src[s + 1] + (Math.random() - 0.5) * jitter;
    target[i * 3 + 2] = src[s + 2] + (Math.random() - 0.5) * jitter;

    // Nube dispersa: esfera de radio aleatorio con distribución uniforme.
    const r = 3.6 + Math.random() * 3.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    scatter[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    scatter[i * 3 + 2] = r * Math.cos(phi) * 0.7;

    // Orden de ensamblaje: por altura para que "cuaje" de abajo a arriba.
    stagger[i] = Math.min(1, Math.max(0, (target[i * 3 + 1] + 1.8) / 3.6)) * 0.7 + Math.random() * 0.3;
  }

  source.dispose();

  return { target, scatter, stagger, count };
}
