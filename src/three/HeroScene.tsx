import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { buildAssembleGeometry } from './buildGeometry';
import {
  assembleVertexShader,
  assembleFragmentShader,
} from './assembleShader';
import { heroSignals } from '@/lib/heroSignals';

interface HeroSceneProps {
  particleCount: number;
  pixelRatio: number;
  postProcessing: boolean;
  reducedMotion: boolean;
}

const SKETCH = new THREE.Color('#4b52e6'); // índigo
const FINAL = new THREE.Color('#c65f3c'); // terracota

export function HeroScene({
  particleCount,
  pixelRatio,
  postProcessing,
  reducedMotion,
}: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const smoothAssemble = useRef(0);

  const { geometry, material } = useMemo(() => {
    const data = buildAssembleGeometry(particleCount);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.target, 3));
    geo.setAttribute('aScatter', new THREE.BufferAttribute(data.scatter, 3));
    geo.setAttribute('aStagger', new THREE.BufferAttribute(data.stagger, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uAssemble: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: 26 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: pixelRatio },
        uColorSketch: { value: SKETCH },
        uColorFinal: { value: FINAL },
      },
      vertexShader: assembleVertexShader,
      fragmentShader: assembleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [particleCount, pixelRatio]);

  // Malla wireframe del nudo: la forma "sólida y precisa" que aflora al final.
  const wireGeometry = useMemo(() => {
    const knot = new THREE.TorusKnotGeometry(1.35, 0.42, 180, 20, 2, 3);
    const wire = new THREE.WireframeGeometry(knot);
    knot.dispose();
    return wire;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Suavizamos el progreso de ensamblaje para que el scrub no dé saltos.
    const targetAssemble = heroSignals.assemble;
    const lerpAmt = 1 - Math.pow(0.0015, delta); // damping estable
    smoothAssemble.current += (targetAssemble - smoothAssemble.current) * lerpAmt;
    const a = smoothAssemble.current;

    const mat = material as THREE.ShaderMaterial;
    mat.uniforms.uAssemble.value = a;
    mat.uniforms.uTime.value = t;
    mat.uniforms.uPointer.value.set(
      reducedMotion ? 0 : heroSignals.pointerX,
      reducedMotion ? 0 : heroSignals.pointerY,
    );

    if (groupRef.current) {
      // Rotación: parallax por puntero + deriva continua lenta.
      const drift = reducedMotion ? heroSignals.autoDrift * Math.PI : t * 0.08;
      const targetRotY = drift + (reducedMotion ? 0 : heroSignals.pointerX * 0.4);
      const targetRotX = reducedMotion ? 0 : -heroSignals.pointerY * 0.3;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
      // La pieza se acerca ligeramente al ensamblarse.
      const targetZ = -0.5 + a * 0.5;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
    }

    if (wireRef.current) {
      const wm = wireRef.current.material as THREE.LineBasicMaterial;
      // El wireframe terracota sólo aflora cuando la pieza está casi terminada.
      wm.opacity = Math.max(0, (a - 0.55) / 0.45) * 0.5;
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, -0.5]}>
        <points ref={pointsRef} geometry={geometry} material={material} />
        <lineSegments ref={wireRef} geometry={wireGeometry}>
          <lineBasicMaterial
            color={FINAL}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {postProcessing && (
        <EffectComposer>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}
