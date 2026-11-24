import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [estado, setEstado] = useState({ texto: '', tipo: '' })
  const [enviando, setEnviando] = useState(false)

  // Estado para la tabla de preguntas desde Supabase
  const [preguntas, setPreguntas] = useState([])
  const [cargandoPreguntas, setCargandoPreguntas] = useState(true)
  const [errorPreguntas, setErrorPreguntas] = useState(null)

  // Cargar preguntas desde Supabase
  async function cargarPreguntas() {
    setCargandoPreguntas(true)
    setErrorPreguntas(null)
    try {
      const { data, error } = await supabase
        .from('mensajes_contacto')
        .select('*')
        .order('creado_en', { ascending: false })

      if (error) throw error
      setPreguntas(data || [])
    } catch (err) {
      setErrorPreguntas(err.message || 'No se pudieron cargar las preguntas.')
    } finally {
      setCargandoPreguntas(false)
    }
  }

  useEffect(() => {
    cargarPreguntas()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!nombre.trim() || nombre.length > 100) {
      setEstado({ texto: 'Por favor ingresa tu nombre (máximo 100 caracteres).', tipo: 'error' })
      return
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correo.trim() || !regexCorreo.test(correo.trim())) {
      setEstado({ texto: 'Por favor ingresa un correo electrónico válido.', tipo: 'error' })
      return
    }

    if (!asunto.trim() || asunto.length > 150) {
      setEstado({ texto: 'Por favor ingresa un asunto (máximo 150 caracteres).', tipo: 'error' })
      return
    }

    if (!mensaje.trim() || mensaje.length > 1000) {
      setEstado({ texto: 'Por favor escribe tu mensaje (máximo 1000 caracteres).', tipo: 'error' })
      return
    }

    setEnviando(true)
    setEstado({ texto: '', tipo: '' })

    try {
      const { error } = await supabase.from('mensajes_contacto').insert({
        nombre: nombre.trim(),
        correo: correo.trim(),
        asunto: asunto.trim(),
        mensaje: mensaje.trim(),
        respondida: false // por defecto no contestada
      })

      if (error) throw error

      setEstado({ texto: 'Mensaje enviado. Gracias por escribirnos.', tipo: 'ok' })
      setNombre('')
      setCorreo('')
      setAsunto('')
      setMensaje('')
      // Recargar preguntas para que aparezca la nueva
      cargarPreguntas()
    } catch (err) {
      setEstado({
        texto: `Error al enviar mensaje: ${err.message || 'Intenta de nuevo.'}`,
        tipo: 'error'
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main>
      <section className="seccion">
        <div className="contenedor contacto-grid">
          <div>
            <h1 className="titulo-seccion">Contáctanos</h1>
            <p className="texto-suave" style={{ marginBottom: '1.5rem' }}>
              ¿Tienes alguna pregunta sobre nuestras rutinas? Escríbenos y nuestro equipo
              te responderá lo antes posible.
            </p>
            <div className="panel">
              <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                  <label htmlFor="nombre-contacto">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre-contacto"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label htmlFor="correo-contacto">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo-contacto"
                    name="correo"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label htmlFor="asunto">Asunto</label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    placeholder="¿En qué podemos ayudarte?"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="6"
                    placeholder="Escribe tu mensaje aquí"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primario btn-bloque" disabled={enviando}>
                  {enviando ? 'Enviando mensaje...' : 'Enviar mensaje'}
                </button>
              </form>
              {estado.texto && (
                <p className={`mensaje ${estado.tipo}`} role="status">
                  {estado.texto}
                </p>
              )}
            </div>
          </div>

          <div className="info-contacto" id="informacion-contacto">
            <h2 className="titulo-seccion">También puedes encontrarnos</h2>
            <article>
              <h3>Correo electrónico</h3>
              <p>
                <a href="mailto:contacto@fitplan.com">contacto@fitplan.com</a>
              </p>
            </article>
            <article>
              <h3>Horario de atención</h3>
              <p>De lunes a viernes, de 9:00 a 18:00 horas.</p>
            </article>
            <aside className="nota">
              <h3>Respuesta del equipo</h3>
              <p>
                Revisamos cada mensaje con atención y normalmente respondemos en un plazo
                máximo de 48 horas hábiles.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="titulo-seccion" style={{ margin: 0 }}>Preguntas de la comunidad</h2>
            <button
              type="button"
              className="btn btn-borde btn-sm"
              onClick={cargarPreguntas}
              disabled={cargandoPreguntas}
            >
              {cargandoPreguntas ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>

          <div className="tabla-wrap">
            <table className="tabla-preguntas">
              <thead>
                <tr>
                  <th>ID pregunta</th>
                  <th>Email</th>
                  <th>Asunto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cargandoPreguntas ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '1.5rem' }}>
                      Cargando preguntas desde Supabase...
                    </td>
                  </tr>
                ) : errorPreguntas ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--color-error)', padding: '1.5rem' }}>
                      {errorPreguntas}
                    </td>
                  </tr>
                ) : preguntas.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-texto-suave)' }}>
                      No hay preguntas enviadas todavía. ¡Sé el primero en escribirnos!
                    </td>
                  </tr>
                ) : (
                  preguntas.map((p, index) => {
                    const idVisible = p.id ? `#${String(p.id).slice(0, 5)}` : `#00${index + 1}`
                    const estaRespondida = Boolean(p.respondida)

                    return (
                      <tr key={p.id || index}>
                        <td>{idVisible}</td>
                        <td>{p.correo}</td>
                        <td>{p.asunto}</td>
                        <td>
                          <span className={`estado ${estaRespondida ? 'respondida' : 'sin-responder'}`}>
                            {estaRespondida ? 'Respondida' : 'Sin responder'}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
