import { useState, useId } from 'react'
import CabeceraProgreso from './CabeceraProgreso'
import TarjetaProgreso from './TarjetaProgreso'
import FormularioRegistro from './FormularioRegistro'
import { useToggle } from '../hooks/useToggle'
import { useProgreso } from '../hooks/useProgreso'
import { eliminarProgreso } from '../servicios/progresoService'

export default function SeccionProgreso() {
  // 'refrescar' se incrementa tras crear o eliminar → fuerza nueva consulta a Supabase
  const [refrescar, setRefrescar] = useState(0)
  const { registros, cargando, error } = useProgreso(refrescar)

  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [errorAccion, setErrorAccion] = useState(null)

  const { value: mostrarFormulario, toggle: toggleFormulario, setFalse: cerrarFormulario } = useToggle(false)

  const id = useId()
  const idBusqueda = `${id}-busqueda`
  const idEstado = `${id}-estado`

  // Tras guardar en la API, cerramos el formulario y forzamos recarga
  function handleRegistroGuardado() {
    cerrarFormulario()
    setRefrescar((n) => n + 1)
  }

  async function handleEliminar(idRegistro) {
    setErrorAccion(null)
    try {
      await eliminarProgreso(idRegistro)
      setRefrescar((n) => n + 1)
    } catch (err) {
      setErrorAccion('No se pudo eliminar el registro: ' + err.message)
    }
  }

  function limpiarFiltros() {
    setBusqueda('')
    setFiltroEstado('todos')
  }

  // Valores calculados — no son estado independiente
  const completadas = registros.filter((r) => r.estado === 'completada').length
  const terminoBusqueda = busqueda.trim().toLowerCase()
  const resultados = registros.filter((r) => {
    const coincideRutina = r.rutina.toLowerCase().includes(terminoBusqueda)
    const coincideEstado = filtroEstado === 'todos' || r.estado === filtroEstado
    return coincideRutina && coincideEstado
  })
  const hayFiltrosActivos = busqueda.trim() !== '' || filtroEstado !== 'todos'

  return (
    <section className="seccion" id="progreso">
      <div className="contenedor">
        <CabeceraProgreso total={registros.length} completadas={completadas} />

        <div style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            className="btn btn-primario"
            onClick={toggleFormulario}
            aria-expanded={mostrarFormulario}
          >
            {mostrarFormulario ? 'Cerrar formulario' : 'Registrar sesión'}
          </button>
        </div>

        {mostrarFormulario && (
          <FormularioRegistro onGuardado={handleRegistroGuardado} />
        )}

        {errorAccion && (
          <p className="mensaje error" role="alert">{errorAccion}</p>
        )}

        <div className="progreso-herramientas">
          <div className="campo">
            <label htmlFor={idBusqueda}>Buscar por rutina</label>
            <input
              type="search"
              id={idBusqueda}
              placeholder="Buscar por rutina..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor={idEstado}>Filtrar por estado</label>
            <select
              id={idEstado}
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="completada">Completada</option>
              <option value="parcial">Parcial</option>
            </select>
          </div>
          {hayFiltrosActivos && (
            <button
              type="button"
              className="btn btn-borde btn-sm"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="progreso-lista">
          {cargando ? (
            <p className="estado-mensaje">Cargando sesiones…</p>
          ) : error ? (
            <p className="estado-mensaje mensaje error" role="alert">
              {error}
              <button
                type="button"
                className="btn btn-borde btn-sm"
                style={{ marginLeft: '1rem' }}
                onClick={() => setRefrescar((n) => n + 1)}
              >
                Reintentar
              </button>
            </p>
          ) : registros.length === 0 ? (
            <p className="estado-mensaje">
              Aún no tienes sesiones registradas. ¡Empieza hoy!
            </p>
          ) : resultados.length === 0 ? (
            <p className="estado-mensaje">
              No hay sesiones que coincidan con la búsqueda.
            </p>
          ) : (
            <>
              <p role="status" className="texto-suave" style={{ marginBottom: '1rem' }}>
                Mostrando {resultados.length} de {registros.length} sesiones
              </p>
              {resultados.map((r) => (
                <TarjetaProgreso
                  key={r.id}
                  id={r.id}
                  rutina={r.rutina}
                  fecha={r.fecha}
                  duracionReal={`${r.duracion} min`}
                  estado={r.estado}
                  nota={r.nota}
                  onEliminar={handleEliminar}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
