# Ejemplos de Uso - IncludesAsym y ProofAsym

## IncludesAsym

### Props
```typescript
interface IncludesAsymProps {
  beneficios: string[] // 8 items
}
```

### Ejemplo de Implementación
```tsx
import { IncludesAsym } from "@/components/organisms/IncludesAsym"

export default function OfertaPage() {
  const beneficios = [
    "Alojamiento en liveaboard de lujo con cabinas con baño privado",
    "Todas las comidas incluidas + snacks y bebidas",
    "Guía de buceo profesional certificado PADI",
    "12 inmersiones en los mejores sitios del Mar Rojo Norte",
    "Equipo de buceo completo incluido",
    "Seguro de buceo y asistencia médica",
    "Transfer aeropuerto-puerto-aeropuerto",
    "Materiales educativos sobre vida marina"
  ]

  return (
    <main>
      <IncludesAsym beneficios={beneficios} />
    </main>
  )
}
```

### Características Visuales
- **Background**: Gradient azul marino `linear-gradient(135deg, #000428 0%, #004E92 100%)`
- **Grid Layout**:
  - Row 1: 2 columnas `[380px | 1fr]`
  - Row 2: 4 items en 2 columnas `[1fr | 1fr]`
  - Row 3: 2 items centrados en `max-w-2xl`
- **Cards**: Glass morphism con `white/10%` backdrop-blur-md
- **Icons**: CheckCircle2 de lucide-react en cyan `#00CED1`, 36px
- **Typography**: 20px semibold white
- **Animations**: Framer Motion stagger (delay 0.1s entre items), scale + opacity on scroll

---

## ProofAsym

### Props
```typescript
interface ProofAsymProps {
  testimonios: Array<{
    name: string
    text: string
    avatar: string
    rating: number
  }>
}
```

### Ejemplo de Implementación
```tsx
import { ProofAsym } from "@/components/organisms/ProofAsym"

export default function OfertaPage() {
  const testimonios = [
    {
      name: "María González",
      text: "La experiencia más increíble de mi vida. Ver el Thistlegorm y nadar con delfines en el Mar Rojo fue simplemente mágico. El equipo profesional y el barco de lujo hicieron que cada momento fuera perfecto.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      rating: 5
    }
  ]

  return (
    <main>
      <ProofAsym testimonios={testimonios} />
    </main>
  )
}
```

### Características Visuales
- **Layout**: Single testimonial destacado, centered, max-width `1000px`
- **Stars**: Gold `#FFD700`, 36px, 5 estrellas
- **Quote**: 32px italic semibold `#2C3E50`, line-height relaxed
- **Decorative Quotes**: Comillas grandes decorativas en Georgia serif, 120px, 20% opacity
- **Avatar**: 60×60px rounded-full con border
- **Name**: 18px medium `#1A202C`
- **Spacing**: Padding vertical 80px desktop / 48px mobile
- **Animations**: Framer Motion fade-in con y-offset

---

## Notas de Implementación

### Container Custom
Ambos componentes usan la clase `container-custom` que debe estar definida en tu CSS global:

```css
.container-custom {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container-custom {
    padding: 0 2rem;
  }
}
```

### Responsive Behavior
- **IncludesAsym**:
  - Mobile: Stack vertical (1 columna)
  - Desktop (lg): Grid asimétrico según specs
- **ProofAsym**:
  - Mobile: Padding reducido, quote size 24px
  - Desktop: Full specs con 32px quote

### Dependencias Requeridas
- `framer-motion`: Animaciones
- `lucide-react`: Iconos (CheckCircle2, Star)
- `next/image`: Optimización de imágenes

### Accesibilidad
- Ambos componentes usan semantic HTML
- Las animaciones respetan `prefers-reduced-motion`
- Contraste WCAG AA+ en todos los textos
- Alt text apropiado en imágenes
