import { useState, useId } from 'react'
import FormularioRegistro from '../components/FormularioRegistro'
import TarjetaProgreso from '../components/TarjetaProgreso'
import { useProgreso } from '../hooks/useProgreso'
import * as progresoService from '../services/progresoService'
import { buscarRutinaPorId } from '../datos'

export default function Progreso() {
  const id = useId()
  const idBusqueda = `${id}-busqueda`
  const { datos: registros, cargando, error, recargar } = useProgreso()
  const [registroEdicion, setRegistroEdicion] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  const [enviando, setEnviando] = useState(false)

  function handleGuardado() {
    setRegistroEdicion(null)
    setMensaje({ texto: 'Guardado correctamente.', tipo: 'ok' })
    recargar()
  }

  function handleCancelarEdicion() {
    setRegistroEdicion(null)
    setMensaje({ texto: '', tipo: '' })
  }

  async function handleEliminar(registro) {
    const infoRutina = buscarRutinaPorId(Number(registro.rutina_id))
    const nombre = infoRutina ? infoRutina.nombre : `Rutina #${registro.rutina_id}`
    const confirmado = window.confirm(
      `¿Deseas eliminar el registro de "${nombre}" del día ${registro.fecha}?\nEsta acción no se puede deshacer.`
    )
    if (!confirmado) return

    setEnviando(true)
    setMensaje({ texto: '', tipo: '' })
    try {
      await progresoService.eliminar(registro.id)
      if (registroEdicion?.id === registro.id) {
        setRegistroEdicion(null)
      }
      setMensaje({ texto: 'Registro eliminado correctamente.', tipo: 'ok' })
      recargar()
    } catch (err) {
      setMensaje({ texto: err.message || 'No se pudo eliminar el registro.', tipo: 'error' })
    } finally {
      setEnviando(false)
    }
  }

  const termino = busqueda.trim().toLowerCase()
  const registrosFiltrados = registros.filter((reg) => {
    if (!termino) return true
    const info = buscarRutinaPorId(Number(reg.rutina_id))
    const nombre = info ? info.nombre.toLowerCase() : ''
    const nota = (reg.nota || '').toLowerCase()
    return nombre.includes(termino) || nota.includes(termino)
  })

  return (
    <main>
      <section className="seccion">
        <div className="contenedor dos-columnas">
          <FormularioRegistro
            registroEdicion={registroEdicion}
            onGuardado={handleGuardado}
            onCancelarEdicion={handleCancelarEdicion}
          />

          <div>
            <h2 className="titulo-seccion">Mis registros</h2>
            <div className="campo" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor={idBusqueda}>Buscar en mis registros</label>
              <input
                type="search"
                id={idBusqueda}
                placeholder="Buscar por rutina o nota..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            {mensaje.texto && (
              <div className={`mensaje ${mensaje.tipo}`} role="status">
                {mensaje.texto}
              </div>
            )}

            <div id="lista-registros">
              {/* Los 4 estados de la consulta (Paso 2.3): Cargando, Error, Vacío, Resultados */}
              {cargando ? (
                <div className="estado-mensaje">Cargando tus registros…</div>
              ) : error ? (
                <div className="estado-mensaje">
                  <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>
                    Ocurrió un error al cargar tus registros: {error}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primario btn-sm"
                    onClick={recargar}
                  >
                    Reintentar
                  </button>
                </div>
              ) : registros.length === 0 ? (
                <div className="estado-mensaje">
                  Aún no tienes registros de entrenamiento. ¡Completa el formulario para registrar tu primera sesión!
                </div>
              ) : registrosFiltrados.length === 0 ? (
                <div className="estado-mensaje">
                  No se encontraron registros que coincidan con tu búsqueda.
                </div>
              ) : (
                registrosFiltrados.map((reg) => (
                  <TarjetaProgreso
                    key={reg.id}
                    registro={reg}
                    onEditar={(r) => {
                      setRegistroEdicion(r)
                      setMensaje({ texto: '', tipo: '' })
                    }}
                    onEliminar={handleEliminar}
                    enviando={enviando}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
