import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Privacidad | Buceo en el Mar Rojo",
  description:
    "Informacion sobre el tratamiento de datos personales en buceoenelmarrojo.com. Conoce tus derechos GDPR y como protegemos tu informacion.",
}

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="bg-bg-gray min-h-screen py-16 md:py-24">
      <article className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ocean-deep mb-12">
          Politica de Privacidad
        </h1>

        <div className="space-y-10 text-text-secondary leading-relaxed text-base">
          {/* Responsable del tratamiento */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Responsable del Tratamiento
            </h2>
            <ul className="space-y-2">
              <li>
                <strong className="text-text-primary">Nombre comercial:</strong> Buceo en el Mar
                Rojo
              </li>
              <li>
                <strong className="text-text-primary">Sitio web:</strong> buceoenelmarrojo.com
              </li>
              <li>
                <strong className="text-text-primary">Ubicacion:</strong> Hurghada, Egipto
              </li>
              <li>
                <strong className="text-text-primary">Correo de contacto:</strong>{" "}
                info@buceoenelmarrojo.com
              </li>
            </ul>
          </section>

          {/* Datos que recopilamos */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Datos que Recopilamos
            </h2>
            <p className="mb-4">
              A traves del formulario de captacion de leads de nuestro sitio web, recopilamos los
              siguientes datos personales:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Nombre</strong> — para dirigirnos a ti de
                forma personalizada.
              </li>
              <li>
                <strong className="text-text-primary">Correo electronico</strong> — para
                comunicarnos contigo sobre tu consulta.
              </li>
              <li>
                <strong className="text-text-primary">Telefono</strong> — para contactarte en
                relacion con tu interes en viajes de buceo.
              </li>
              <li>
                <strong className="text-text-primary">Nivel de certificacion de buceo</strong> —
                para recomendarte experiencias adecuadas a tu nivel.
              </li>
              <li>
                <strong className="text-text-primary">Mes preferido de viaje</strong> — para
                ofrecerte las mejores opciones segun la temporada.
              </li>
            </ul>
          </section>

          {/* Finalidad del tratamiento */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Finalidad del Tratamiento
            </h2>
            <p>Los datos personales recogidos se utilizan para las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Gestion de leads e interesados en viajes de buceo en Hurghada y el Mar Rojo.
              </li>
              <li>
                Contactar a los usuarios para responder a sus consultas sobre safaris de buceo,
                cursos y experiencias.
              </li>
              <li>
                Enviar informacion relevante sobre las opciones de viaje y buceo disponibles.
              </li>
            </ul>
          </section>

          {/* Marketing por WhatsApp */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Marketing por WhatsApp
            </h2>
            <p className="mb-4">
              Si otorgas tu consentimiento explicito a traves de la casilla de verificacion en
              nuestro formulario, aceptas recibir mensajes promocionales e informativos a traves de
              WhatsApp. En particular:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Quien envia los mensajes:</strong> Buceo en
                el Mar Rojo (buceoenelmarrojo.com).
              </li>
              <li>
                <strong className="text-text-primary">Tipo de mensajes:</strong> Promociones,
                ofertas especiales, informacion sobre rutas de buceo, nuevos cursos y contenido
                relacionado con safaris de buceo en el Mar Rojo.
              </li>
              <li>
                <strong className="text-text-primary">Canal:</strong> WhatsApp.
              </li>
              <li>
                <strong className="text-text-primary">Como darte de baja:</strong> Puedes revocar
                tu consentimiento en cualquier momento respondiendo &quot;STOP&quot; a cualquier
                mensaje de WhatsApp o enviando un correo a info@buceoenelmarrojo.com.
              </li>
            </ul>
            <p className="mt-4">
              El envio de mensajes de marketing por WhatsApp cumple con las politicas de mensajeria
              de Meta y la normativa aplicable en materia de comunicaciones comerciales.
            </p>
          </section>

          {/* Base legal */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Base Legal del Tratamiento
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Consentimiento (Art. 6.1.a GDPR):</strong>{" "}
                Para el envio del formulario de contacto y para la recepcion de mensajes de
                marketing por WhatsApp. El consentimiento se recoge de forma explicita mediante
                casillas de verificacion independientes.
              </li>
              <li>
                <strong className="text-text-primary">Interes legitimo:</strong> Para responder a
                las consultas iniciadas por el usuario sobre viajes y cursos de buceo.
              </li>
            </ul>
          </section>

          {/* Derechos del usuario */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Derechos del Usuario (GDPR)
            </h2>
            <p className="mb-4">
              Como titular de los datos, tienes derecho a ejercer los siguientes derechos en
              cualquier momento:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Derecho de acceso:</strong> Solicitar
                informacion sobre los datos personales que tenemos sobre ti.
              </li>
              <li>
                <strong className="text-text-primary">Derecho de rectificacion:</strong> Corregir
                datos inexactos o incompletos.
              </li>
              <li>
                <strong className="text-text-primary">Derecho de supresion:</strong> Solicitar la
                eliminacion de tus datos personales.
              </li>
              <li>
                <strong className="text-text-primary">Derecho a la portabilidad:</strong> Recibir
                tus datos en un formato estructurado y de uso comun.
              </li>
              <li>
                <strong className="text-text-primary">Derecho de limitacion:</strong> Solicitar la
                restriccion del tratamiento de tus datos.
              </li>
              <li>
                <strong className="text-text-primary">Derecho de oposicion:</strong> Oponerte al
                tratamiento de tus datos en determinadas circunstancias.
              </li>
            </ul>
            <p className="mt-4">
              Para ejercer cualquiera de estos derechos, puedes enviarnos un correo electronico a{" "}
              <a
                href="mailto:info@buceoenelmarrojo.com"
                className="text-coral-fire hover:underline"
              >
                info@buceoenelmarrojo.com
              </a>
              . Responderemos a tu solicitud en el plazo legalmente establecido.
            </p>
          </section>

          {/* Conservacion de datos */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Conservacion de Datos
            </h2>
            <p>
              Los datos personales se conservaran mientras exista una relacion comercial o de
              interes mutuo, o durante el tiempo necesario para cumplir con las obligaciones legales
              aplicables. El consentimiento para recibir comunicaciones de marketing por WhatsApp
              puede ser retirado en cualquier momento, lo que supondra el cese inmediato del envio
              de dichos mensajes.
            </p>
          </section>

          {/* Destinatarios */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-text-heading mb-4">
              Destinatarios de los Datos
            </h2>
            <p>
              Los datos personales se almacenan en nuestro sistema de gestion de relaciones con
              clientes (Odoo CRM). No compartimos tus datos personales con terceros, salvo que sea
              requerido por ley o autoridad competente.
            </p>
          </section>

          {/* Fecha de actualizacion */}
          <section className="border-t border-ocean-deep/10 pt-8">
            <p className="text-text-muted text-sm">
              Ultima actualizacion: marzo 2026
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
