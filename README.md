# Red Sea Norte - Microsite Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)

Microsite frontend para Red Sea Diving - Centro de buceo certificado SSI en el Mar Rojo Norte. Implementación basada en diseños de Pencil con estética refinada y animaciones profesionales.

## 🚀 Demo

- **Producción**: [En desarrollo]
- **Repositorio**: [github.com/mandycs/red-sea-norte](https://github.com/mandycs/red-sea-norte)

## ✨ Características

### 🎨 Diseño
- **Tipografía distintiva**: Sora (headings) + DM Sans (body)
- **Paleta cohesiva**: Azules profundos + Naranja coral
- **Animaciones suaves**: fadeInUp, scaleIn, float con delays escalonados
- **Micro-interacciones**: Hover scales, shine effects, glassmorphism

### 🏗️ Arquitectura
- **Next.js 16** con App Router
- **TypeScript** strict mode
- **Tailwind CSS v4** con design tokens personalizados
- **Atomic Design** pattern

### 📱 Páginas Implementadas
- ✅ **Homepage** - Hero + Why Section + Spec Section + Carousel funcional
- ⏳ **Ruta Norte 7 Días**
- ⏳ **Blog Listing** - Masonry layout
- ⏳ **Blog Post** - StreamField blocks
- ⏳ **Curso/Especialidad**
- ⏳ **Experiencia Pecios**
- ⏳ **Landing Oferta Early Bird**

## 📦 Instalación

\`\`\`bash
# Clonar repositorio
git clone https://github.com/mandycs/red-sea-norte.git
cd red-sea-norte

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Diseño

El diseño base está definido en el archivo \`design.pen\` (Pencil). 

## 📁 Estructura del Proyecto

\`\`\`
red_sea_norte/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   │   ├── atoms/             # Basic components
│   │   ├── molecules/         # Composed components
│   │   ├── organisms/         # Complex components
│   │   └── ui/                # Primitives
│   └── lib/                   # Utilities & mock data
├── design.pen                 # Pencil design file
└── tailwind.config.ts
\`\`\`

## 🚢 Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## 👥 Autor

**Claude Sonnet 4.5** - Implementación para Red Sea Diving

---

**Nota**: Este es un proyecto frontend independiente. La integración con el backend (Wagtail) se realizará en fase posterior.
