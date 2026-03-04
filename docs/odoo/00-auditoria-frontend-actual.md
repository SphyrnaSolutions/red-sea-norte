# Auditoria frontend actual

## Contexto

El frontend ya tiene una base funcional en Next.js con estas rutas principales:

- `/`
- `/rutas`
- `/blog`
- `/cursos`
- `/experiencias`

Referencias del repo:

- [src/app/page.tsx](/home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/app/page.tsx)
- [src/lib/mock-data/homepage.ts](/home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/lib/mock-data/homepage.ts)
- [src/app/rutas/page.tsx](/home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/app/rutas/page.tsx)

## Hallazgo principal

La web actual esta orientada a `Advanced SSI` como producto principal, pero las tareas de Odoo empujan otra estrategia:

- foco principal en `vida a bordo en el Mar Rojo`
- cluster SEO centrado en `Ruta Norte + Pecios desde Hurghada`
- captacion de leads desde trafico informacional
- el `Advanced` pasa a ser gancho secundario, no mensaje principal de toda la home

## Desajustes actuales

### Homepage

- El H1 actual vende curso: `Lleva Tu Buceo al Siguiente Nivel en el Mar Rojo`.
- El subtitulo y los bloques visuales hablan de certificacion y especialidades, no de viaje/ruta/producto.
- El formulario aparece al final via modal, cuando Odoo pide captura de lead mas temprana.

### Arquitectura

- La base de rutas existe, lo cual ayuda.
- Falta una arquitectura clara de pilar + satelites.
- No se ve aun un cluster fuerte para `Ruta Norte y Pecios`.

### Contenido SEO

- Existen paginas y tipos de contenido, pero no un plan editorial documentado en el repo.
- No hay backlog operativo de URLs priorizadas.
- No hay plantilla editorial compartida para generar paginas con el mismo criterio.

## Conclusion operativa

La base tecnica sirve, pero el mensaje y la jerarquia del sitio hay que reorientarlos:

1. home menos `curso`
2. mas `ruta + vida a bordo + salida desde Hurghada`
3. cluster SEO conectado a landings de conversion
4. CTA y formularios antes en el funnel
