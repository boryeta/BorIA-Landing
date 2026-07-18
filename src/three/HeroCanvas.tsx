import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { HeroScene } from './HeroScene';
import { useDeviceCapability } from '@/lib/useDeviceCapability';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Envoltorio del canvas 3D del hero. Se carga de forma diferida (lazy) desde
 * el Hero y limita partículas / postprocessing según el dispositivo.
 */
export default function HeroCanvas() {
  const cap = useDeviceCapability();
  const reduced = useReducedMotion();

  // Con reduced-motion mostramos la pieza, pero sin bloom pesado ni parallax.
  const pixelRatio = Array.isArray(cap.dpr) ? cap.dpr[1] : 2;

  return (
    <Canvas
      dpr={cap.dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <HeroScene
          particleCount={cap.particleCount}
          pixelRatio={pixelRatio}
          postProcessing={cap.allowPostProcessing && !reduced}
          reducedMotion={reduced}
        />
      </Suspense>
    </Canvas>
  );
}
