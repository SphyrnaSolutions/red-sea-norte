# Homepage

Fuente principal: tarea Odoo `#508 Homepage`.

## Objetivo

Replantear la home para que venda primero el producto real:

- vida a bordo en el Mar Rojo
- safari de buceo desde Hurghada
- Ruta Norte y Pecios

El `Advanced SSI` debe quedar como valor anadido, no como eje central de toda la pagina.

## Problemas detectados en Odoo

- La home no esta alineada con las keywords que realmente traen trafico.
- El H1 actual es demasiado generico y demasiado centrado en curso.
- El formulario aparece tarde para una pagina que debe generar leads.

## Propuesta de estructura

### Hero

- H1 orientado a negocio:
  `Vida a bordo en el Mar Rojo desde Hurghada`
- Subtitulo:
  `Safari de buceo de 7 dias, pecios legendarios y opcion de Advanced SSI a bordo`
- CTA primario:
  `Consultar fechas`
- CTA secundario:
  `Ver ruta norte`

### Seccion 2

- `Por que bucear en el Mar Rojo`
- argumentos: visibilidad, temperatura, biodiversidad, facilidad para liveaboard

### Seccion 3

- `Rutas del Mar Rojo`
- cards minimas:
  `Ruta Norte`
  `Brothers / Daedalus / Elphinstone`
  `St. Johns`

### Seccion 4

- `Puntos de inmersion`
- conservar y reforzar la parte ya existente de spots

### Seccion 5

- `Programa del viaje`
- resumen dia a dia con expectativa clara por bloque

### Seccion 6

- `Proximas salidas`
- imprescindible para conversion

### Seccion 7

- `Formulario lead`
- visible sin obligar al usuario a llegar al final

## Cambios concretos para este repo

- Reescribir el contenido de [src/lib/mock-data/homepage.ts](/home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/lib/mock-data/homepage.ts).
- Cambiar la narrativa principal de [src/app/page.tsx](/home/mandycs/Proyectos/Clientes/Karlos/red-sea-norte/src/app/page.tsx).
- Revisar si `LeadFormModal` debe seguir siendo modal o convertirse en bloque inline.
- Añadir una seccion real de `proximas salidas`.

## Decision de mensaje

Mensaje recomendado:

- principal: `viaje de vida a bordo`
- secundario: `ruta norte + pecios`
- terciario: `advanced a bordo`

Mensaje a evitar como eje unico:

- `curso advanced` como promesa central de toda la web
