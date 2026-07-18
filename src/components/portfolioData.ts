export interface Project {
  id: string;
  name: string;
  kind: string;
  description: string;
  /** Estado real: no inflamos nada. */
  status: 'live' | 'wip';
  /** Color de acento distintivo del proyecto. */
  accent: string;
  accentSoft: string;
  /** URL de demo en vivo, si la hay. */
  url?: string;
  tags: string[];
}

/**
 * Portfolio real — solo proyectos que existen. No se inventan más.
 * Adaira va marcado como «en curso», con tratamiento visual honesto.
 */
export const PROJECTS: Project[] = [
  {
    id: 'bisturi',
    name: 'Bisturí by Qlinaria',
    kind: 'Web editorial · Restaurante',
    description:
      'Web editorial con animación 3D de entrada tipo «atravesar la puerta», carta interactiva y una estética oscura y dorada. Cuidada al detalle, como el sitio que representa.',
    status: 'live',
    accent: '#c8a04a', // dorado
    accentSoft: 'rgba(200,160,74,0.16)',
    url: 'https://bisturidemoweb.lovable.app',
    tags: ['Animación 3D', 'Carta interactiva', 'Estética editorial'],
  },
  {
    id: 'catering',
    name: 'QLinaria Catering',
    kind: 'Landing de conversión · Eventos',
    description:
      'Landing de conversión para la marca hermana, dirigida a organizadores de eventos. Un solo objetivo: que quien organiza un evento quiera pedir presupuesto.',
    status: 'live',
    accent: '#c65f3c', // terracota
    accentSoft: 'rgba(198,95,60,0.16)',
    // [PENDIENTE: URL en vivo de QLinaria Catering si quieres enlazarla]
    tags: ['Conversión', 'Copywriting', 'Marca hermana'],
  },
  {
    id: 'adaira',
    name: 'Talleres Adaira',
    kind: 'Demo · Taller mecánico (Alicante)',
    description:
      'Demo en desarrollo para un taller mecánico: modelo 3D interactivo del vehículo y una calculadora de presupuesto en tiempo real. Todavía en construcción — y se nota a propósito.',
    status: 'wip',
    accent: '#d98a2b', // ámbar
    accentSoft: 'rgba(217,138,43,0.16)',
    tags: ['Modelo 3D', 'Calculadora en vivo', 'En curso'],
  },
];
