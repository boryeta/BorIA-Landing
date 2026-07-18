import { useEffect, useState } from 'react';

export interface DeviceCapability {
  /** Nº de partículas del sistema 3D según la capacidad del dispositivo. */
  particleCount: number;
  /** Si es táctil, sustituimos hover por animación automática. */
  isTouch: boolean;
  /** Móvil / pantalla pequeña: fallback 3D más ligero. */
  isMobile: boolean;
  /** El dispositivo puede con postprocessing (bloom). */
  allowPostProcessing: boolean;
  /** Densidad de píxeles limitada para el canvas. */
  dpr: [number, number];
}

/**
 * Estima la capacidad del dispositivo para dimensionar el 3D.
 * No dependemos de hover en táctil y limitamos partículas en móvil.
 */
export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>(() => defaults());

  useEffect(() => {
    setCap(measure());
  }, []);

  return cap;
}

function defaults(): DeviceCapability {
  return {
    particleCount: 4200,
    isTouch: false,
    isMobile: false,
    allowPostProcessing: true,
    dpr: [1, 2],
  };
}

function measure(): DeviceCapability {
  const isTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Núcleos lógicos y memoria como proxy de potencia.
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const weak = cores <= 4 || mem <= 4 || isMobile;

  let particleCount: number;
  if (isMobile) particleCount = 1800;
  else if (weak) particleCount = 3200;
  else particleCount = 6000;

  return {
    particleCount,
    isTouch,
    isMobile,
    allowPostProcessing: !weak && !isMobile,
    dpr: isMobile ? [1, 1.5] : [1, 2],
  };
}
