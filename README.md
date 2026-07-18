# BorIA — Landing personal

Web personal de **Borja (BorIA — Borja + IA)**, especialista en diseño web
potenciado por IA desde Alicante. Una SPA de scroll largo donde la propia web
**es** el pitch: cada detalle técnico demuestra lo que Borja sabe hacer.

El eje de toda la identidad es la **dualidad humano + IA**: calidez artesanal
(terracota, serif) + precisión técnica (índigo, monoespaciada). La metáfora
central —**del boceto a la producción**— se convierte en interacción: el objeto
3D del hero empieza como una nube de partículas caótica en índigo y se ensambla
en un nudo tórico preciso y terracota a medida que haces scroll.

## Arranque

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción
npm run preview  # sirve el build
```

## Stack

- **React 18 + Vite + TypeScript**
- **Tailwind CSS** con tokens custom (sin paleta por defecto) — ver `tailwind.config.ts`
- **GSAP + ScrollTrigger** — scroll storytelling y pilotaje del 3D
- **Framer Motion** — micro-interacciones (hover, entradas, tilt)
- **react-three-fiber + drei + @react-three/postprocessing** — sistema de partículas del hero (con bloom sutil)
- **Lenis** — scroll suavizado para que el scrub del 3D no se vea tosco

## Estructura

```
src/
├─ three/            # Sistema 3D del hero (boceto → producción)
│  ├─ HeroCanvas.tsx        # Canvas lazy, limita partículas por dispositivo
│  ├─ HeroScene.tsx         # Escena R3F: partículas + wireframe + bloom
│  ├─ assembleShader.ts     # Shader: interpola disperso→ensamblado, índigo→terracota
│  └─ buildGeometry.ts      # Genera posiciones target (nudo tórico) y scatter
├─ components/       # Secciones y piezas reutilizables
│  ├─ Nav / Hero / Story / Process / Portfolio / Philosophy / Contact / Footer
│  ├─ AssembleText.tsx      # Titulares con animación de "ensamblaje" de letras
│  ├─ ProjectCard.tsx       # Tarjetas con tilt 3D real
│  ├─ DrawUnderline.tsx     # Subrayado SVG que se dibuja al entrar
│  └─ Reveal.tsx            # Scroll reveal con easing cuidado
├─ lib/              # Hooks: reduced-motion, capacidad de dispositivo, Lenis, señales del hero
└─ index.css         # Tokens CSS, utilidades y prefers-reduced-motion
```

## Despliegue en Cloudflare Pages

El repo ya está listo para Cloudflare Pages con integración Git (no hace falta
tocar configuración). En el panel de Cloudflare:

1. **Workers & Pages → Create → Pages → Connect to Git** y elige
   `boryeta/BorIA-Landing`.
2. Configura el build:
   - **Production branch**: la rama que quieras publicar (p. ej. `main` o
     `claude/epic-clarke-j5l5ff`).
   - **Framework preset**: `Vite` (o *None*).
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. **Save and Deploy**. Cada push a esa rama reconstruye y publica solo.

Detalles ya incluidos en el repo:
- `.node-version` → `22` (fija la versión de Node del build).
- `public/_redirects` → fallback SPA (`/* /index.html 200`).
- `public/_headers` → cache larga para assets con hash.

## Decisiones de diseño

- **Color con propósito narrativo**: índigo = en construcción, terracota =
  terminado/pulido. Se aplica en el 3D, la timeline de proceso y los botones.
- **Rendimiento**: el canvas 3D se carga de forma diferida (lazy) y limita el
  número de partículas y el postprocessing según la capacidad del dispositivo.
- **Accesibilidad**: navegación por teclado, foco visible, skip link, contraste
  AA en secciones oscuras, y `prefers-reduced-motion` con una versión reducida
  pero cuidada (no desactivada). En táctil no se depende de hover.

## Pendiente de sustituir con datos reales

Estos placeholders quedan marcados en el código con `[PENDIENTE]`:

| Qué | Dónde |
|-----|-------|
| **Email real** (`hola@boria.studio` es placeholder) | `src/components/Contact.tsx` → `CONTACT.email` |
| **WhatsApp real** (`34600000000` es placeholder) | `src/components/Contact.tsx` → `CONTACT.whatsapp` |
| **Testimonio real de cliente** | `src/components/Portfolio.tsx` → `TestimonialPlaceholder` |
| **URL en vivo de QLinaria Catering** (opcional) | `src/components/portfolioData.ts` → proyecto `catering` |

No se ha inventado ningún testimonio, cifra, número de proyectos ni premio.
