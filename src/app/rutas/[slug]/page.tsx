import Image from "next/image"
import { notFound } from "next/navigation"
import { getRuta, getAllRutas } from "@/lib/mock-data/rutas"
import type { RutaData } from "@/lib/mock-data/types"

interface RutaPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths para todas las rutas
export async function generateStaticParams() {
  const rutas = getAllRutas()
  return rutas.map((ruta) => ({
    slug: ruta.slug,
  }))
}

export default async function RutaPage({ params }: RutaPageProps) {
  const { slug } = await params
  const ruta = getRuta(slug)

  if (!ruta) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero Ruta */}
      <HeroRuta ruta={ruta} />

      {/* Story Intro */}
      <StoryIntro ruta={ruta} />

      {/* Itinerario - Días 1-3 agrupados */}
      <section className="w-full flex flex-col gap-[2px]">
        {/* Día 1 */}
        <Day1 />

        {/* Día 2 */}
        <Day2 />

        {/* Día 3-4 */}
        <Day3 />
      </section>

      {/* Día 5 (separado) */}
      <Day5 />

      {/* Día 6 (separado) */}
      <Day6 />

      {/* Día 7 (separado) */}
      <Day7 />

      {/* CTA Final */}
      <CTAFinal />
    </div>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroRuta({ ruta }: { ruta: RutaData }) {
  return (
    <section className="w-full flex flex-col">
      {/* Hero Image + Content */}
      <div className="relative w-full h-[800px] max-md:h-[600px]">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1667852976428-3b6f59f0db4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk2MDc0MDl8&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Red Sea Sunset"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-[120px] pb-0 max-lg:px-[48px] max-md:px-[24px]">
          <div className="flex flex-col gap-5 mb-0">
            {/* Badge - CYAN no naranja */}
            <span
              className="text-[13px] font-bold uppercase self-start"
              style={{
                color: "#3DABC2",
                letterSpacing: "3px",
              }}
            >
              7 DÍAS • RUTA NORTE
            </span>

            {/* Title */}
            <h1
              className="text-white max-md:text-4xl"
              style={{
                fontSize: "56px",
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: "Inter, sans-serif",
              }}
            >
              La Aventura Definitiva del Mar Rojo
            </h1>

            {/* Subtitle */}
            <p
              className="text-white max-md:text-base"
              style={{
                fontSize: "18px",
                opacity: 0.7,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Thistlegorm • Ras Mohammed • Straits of Tiran • Gubal Island
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards Bar - FUERA del hero */}
      <div
        className="w-full flex gap-[80px] py-[28px] px-[120px] max-md:flex-col max-md:gap-4 max-md:px-[24px]"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div className="flex flex-col gap-2">
          <span
            className="text-white"
            style={{ fontSize: "28px", fontWeight: 800 }}
          >
            7 días
          </span>
          <span
            className="text-white text-[13px]"
            style={{ opacity: 0.67 }}
          >
            6 noches a bordo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span
            className="text-white"
            style={{ fontSize: "28px", fontWeight: 800 }}
          >
            18-20
          </span>
          <span
            className="text-white text-[13px]"
            style={{ opacity: 0.67 }}
          >
            inmersiones
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span
            style={{ fontSize: "28px", fontWeight: 800, color: "#FF6B35" }}
          >
            Desde 1.400€
          </span>
          <span
            className="text-white text-[13px]"
            style={{ opacity: 0.67 }}
          >
            por persona
          </span>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STORY INTRO
// ============================================================================

function StoryIntro({ ruta }: { ruta: RutaData }) {
  return (
    <section
      className="w-full py-[100px] px-[120px] max-lg:py-[60px] max-lg:px-[48px] max-md:py-[48px] max-md:px-[24px]"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <div className="flex flex-col gap-6 max-w-[900px]">
        <span
          className="text-[11px] font-bold uppercase"
          style={{ color: "#FF6B35", letterSpacing: "4px" }}
        >
          TU AVENTURA →
        </span>

        <h2
          className="text-white max-md:text-3xl"
          style={{
            fontSize: "48px",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "Inter, sans-serif",
          }}
        >
          7 Días que Cambiarán tu Forma de Bucear
        </h2>

        <p
          className="text-white max-md:text-base"
          style={{
            fontSize: "18px",
            opacity: 0.6,
            lineHeight: 1.7,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Esta no es una ruta cualquiera. Es la combinación perfecta de
          historia, adrenalina y naturaleza. Desde pecios de la Segunda Guerra
          Mundial hasta paredes verticales llenas de vida. Cada inmersión cuenta
          una historia diferente.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// DÍA 1 - Overlay LEFT
// ============================================================================

function Day1() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1530213446452-ab94043c4862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk2MDc0ODJ8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 1"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay LEFT */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-7 py-[80px] pl-[120px] pr-0 max-lg:pl-[48px] max-md:pl-[24px]"
        style={{
          background:
            "linear-gradient(270deg, rgba(10,15,26,0.93) 0%, rgba(10,15,26,0.87) 45%, rgba(10,15,26,0.33) 80%, rgba(10,15,26,0) 100%)",
        }}
      >
        <span
          className="text-[13px] font-bold uppercase"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 1
        </span>

        <h3
          className="text-white max-w-[500px] max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Embarque y Primera Inmersión
        </h3>

        <p
          className="text-white max-w-[500px] max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.67,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Subes al barco en Hurghada. Después de instalarte, inmersión de chequeo
          en Sha'ab el Erg. Aguas tranquilas, arrecife vibrante. El Mar Rojo te
          da la bienvenida.
        </p>

        <span
          className="text-[14px]"
          style={{ color: "#FF6B35" }}
        >
          → Sha'ab el Erg (15-20m)
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// DÍA 2 - Overlay RIGHT
// ============================================================================

function Day2() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1758792742999-1b954043f06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk2MDc1MTR8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 2"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay RIGHT */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center gap-7 py-[80px] pr-[120px] pl-0 max-lg:pr-[48px] max-md:pr-[24px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,15,26,0.94) 0%, rgba(10,15,26,0.88) 40%, rgba(10,15,26,0.33) 80%, rgba(10,15,26,0) 100%)",
        }}
      >
        <span
          className="text-[13px] font-bold uppercase text-right"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 2
        </span>

        <h3
          className="text-white max-w-[500px] text-right max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: "Inter, sans-serif",
          }}
        >
          El Thistlegorm
        </h3>

        <p
          className="text-white max-w-[500px] text-right max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.73,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          El momento que estabas esperando. Desciendes a 30 metros y ahí está:
          el carguero británico hundido en 1941. Motocicletas, camiones,
          munición. Historia tangible. Dos inmersiones aquí, no es suficiente.
        </p>

        <span
          className="text-[14px] text-right"
          style={{ color: "#FF6B35" }}
        >
          → SS Thistlegorm (30m) • 2 inmersiones
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// DÍA 3-4 - Overlay LEFT
// ============================================================================

function Day3() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1667673077638-3dbc8f39d357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk2MDc1MjF8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 3-4"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay LEFT */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-7 py-[80px] pl-[120px] pr-0 max-lg:pl-[48px] max-md:pl-[24px]"
        style={{
          background:
            "linear-gradient(270deg, rgba(10,15,26,0.93) 0%, rgba(10,15,26,0.87) 45%, rgba(10,15,26,0.33) 80%, rgba(10,15,26,0) 100%)",
        }}
      >
        <span
          className="text-[13px] font-bold uppercase"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 3-4
        </span>

        <h3
          className="text-white max-w-[500px] max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Ras Mohammed y Straits of Tiran
        </h3>

        <p
          className="text-white max-w-[500px] max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.67,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Parque Nacional. Paredes que caen a 800 metros. Corrientes que traen
          pelágicos. Jackson Reef, Woodhouse Reef. Cada inmersión es diferente.
          Barracudas, napoleones, tortugas. Aquí entiendes por qué el Mar Rojo
          es legendario.
        </p>

        <span
          className="text-[14px]"
          style={{ color: "#FF6B35" }}
        >
          → Shark Reef, Yolanda Reef, Jackson Reef, Woodhouse
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// DÍA 5 - Overlay RIGHT (container separado)
// ============================================================================

function Day5() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1589308945435-38c3f99b3824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzIxNjl8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 5"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay RIGHT */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center gap-4 py-[80px] pr-[120px] pl-0 max-lg:pr-[48px] max-md:pr-[24px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,15,26,1) 0%, rgba(10,15,26,0.96) 50%, rgba(10,15,26,0.53) 80%, rgba(10,15,26,0.13) 100%)",
        }}
      >
        <span
          className="text-[13px] font-semibold uppercase text-right"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 5
        </span>

        <h3
          className="text-white text-right max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Rosalie Moller y Kingston
        </h3>

        <p
          className="text-white max-w-[500px] text-right max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.67,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Dos gigantes hundidos. El Rosalie Moller, a 50 metros, es solo para
          Advanced con experiencia. El Kingston, más accesible a 25m, está
          cubierto de coral blando.
          {"\n\n"}
          Pecios menos visitados, más vírgenes. La sensación de ser explorador.
        </p>

        <span
          className="text-[14px] text-right"
          style={{ color: "#FF6B35" }}
        >
          Rosalie Moller (45-50m) • Kingston (25-30m)
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// DÍA 6 - Overlay LEFT (container separado)
// ============================================================================

function Day6() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1630771076084-51cdc6bdafef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzIxNzB8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 6"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay LEFT */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-4 py-[80px] pl-[120px] pr-0 max-lg:pl-[48px] max-md:pl-[24px]"
        style={{
          background:
            "linear-gradient(270deg, rgba(10,15,26,1) 0%, rgba(10,15,26,0.94) 45%, rgba(10,15,26,0.4) 80%, rgba(10,15,26,0) 100%)",
        }}
      >
        <span
          className="text-[13px] font-semibold uppercase"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 6
        </span>

        <h3
          className="text-white max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Abu Nuhas: El Cementerio de Barcos
        </h3>

        <p
          className="text-white max-w-[500px] max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.67,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Cuatro pecios en un solo arrecife. El Giannis D, el Carnatic, el
          Chrisoula K. Cada uno con su historia, cada uno a diferente
          profundidad.
          {"\n\n"}
          Dos inmersiones aquí son tres historias diferentes. El arrecife que
          hundió imperios comerciales.
        </p>

        <span
          className="text-[14px]"
          style={{ color: "#FF6B35" }}
        >
          Giannis D (18-27m) • Carnatic (20-26m)
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// DÍA 7 - Overlay RIGHT (container separado)
// ============================================================================

function Day7() {
  return (
    <div className="relative w-full h-[550px] max-md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1583297016126-171661ade4e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk1MzIxNzB8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Día 7"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay RIGHT */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center gap-4 py-[80px] pr-[120px] pl-0 max-lg:pr-[48px] max-md:pr-[24px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,15,26,1) 0%, rgba(10,15,26,0.94) 45%, rgba(10,15,26,0.4) 80%, rgba(10,15,26,0) 100%)",
        }}
      >
        <span
          className="text-[13px] font-semibold uppercase text-right"
          style={{ color: "#FF6B35", letterSpacing: "3px" }}
        >
          Día 7
        </span>

        <h3
          className="text-white text-right max-md:text-2xl"
          style={{
            fontSize: "38px",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Última Inmersión y Regreso
        </h3>

        <p
          className="text-white max-w-[500px] text-right max-md:text-sm"
          style={{
            fontSize: "16px",
            opacity: 0.67,
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Una inmersión matutina tranquila. Sha'ab el Erg o similares. Tiempo
          para procesar lo vivido, para ver a los peces de siempre con ojos de
          quien ha visto pecios a 50 metros.
          {"\n\n"}
          Desembarque por la tarde. 18-20 inmersiones completadas. Tu Advanced
          Open Water sellado.
        </p>

        <span
          className="text-[14px] text-right"
          style={{ color: "#FF6B35" }}
        >
          Sha'ab el Erg (15-25m) • Transfer a puerto
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// CTA FINAL
// ============================================================================

function CTAFinal() {
  return (
    <section className="relative w-full h-[500px] max-md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1712621171976-98d05e2dce0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njk2MDc3MjB8&ixlib=rb-4.1.0&q=80&w=1080"
        alt="CTA Background"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-[120px] max-lg:px-[48px] max-md:px-[24px] gap-7"
        style={{ backgroundColor: "rgba(10,15,26,0.6)" }}
      >
        <h2
          className="text-white text-center max-md:text-3xl"
          style={{
            fontSize: "44px",
            fontWeight: 800,
            fontFamily: "Inter, sans-serif",
          }}
        >
          ¿Listo para la Ruta Norte?
        </h2>

        <p
          className="text-white text-center max-md:text-base"
          style={{
            fontSize: "18px",
            opacity: 0.7,
            fontFamily: "Inter, sans-serif",
          }}
        >
          7 días • 18-20 inmersiones • Pecios legendarios • Desde 1.400€
        </p>

        <a
          href="/contacto"
          className="flex items-center justify-center rounded-[12px] transition-transform hover:scale-105"
          style={{
            backgroundColor: "#FF6B35",
            height: "60px",
            width: "300px",
          }}
        >
          <span
            className="text-white font-semibold"
            style={{
              fontSize: "18px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Solicitar Información
          </span>
        </a>
      </div>
    </section>
  )
}
