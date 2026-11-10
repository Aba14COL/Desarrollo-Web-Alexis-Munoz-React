import { useState, useId } from 'react'
import CabeceraProgreso from './CabeceraProgreso'
import TarjetaProgreso from './TarjetaProgreso'
import FormularioRegistro from './FormularioRegistro'
import { useToggle } from '../hooks/useToggle'

export default function SeccionProgreso({ registros: registrosProp = [] }) {
  // SeccionProgreso administra los estados 'registros', 'busqueda' y 'filtroEstado'
  // porque el formulario (para añadir sesiones), el resumen en CabeceraProgreso
  // (para calcular el total y sesiones completadas) y la lista de registros
  // necesitan compartir y estar sincronizados con la misma fuente de datos.
  const [registros, setRegistros] = useState(registrosProp)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  const { value: mostrarFormulario, toggle: toggleFormulario } = useToggle(false)
  const id = useId()
  const idBusqueda = `${id}-busqueda`
  const idEstado = `${id}-estado`

  function agregarRegistro(nuevo) {
    setRegistros((anteriores) => [nuevo, ...anteriores])
  }

  function limpiarFiltros() {
    setBusqueda('')
    setFiltroEstado('todos')
  }

  // 'completadas' y 'resultados' se calculan en cada render a partir del estado (no son estado).
  // Los datos originales en 'registros' no se modifican al filtrar.
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

        {mostrarFormulario && <FormularioRegistro onAgregar={agregarRegistro} />}

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

        <p role="status" className="texto-suave" style={{ marginBottom: '1rem' }}>
          Mostrando {resultados.length} de {registros.length} sesiones
        </p>

        <div className="progreso-lista">
          {registros.length === 0 ? (
            <p className="estado-mensaje">
              Aún no tienes sesiones registradas. ¡Empieza hoy!
            </p>
          ) : resultados.length === 0 ? (
            <p className="estado-mensaje">
              No hay sesiones que coincidan con la búsqueda.
            </p>
          ) : (
            resultados.map((r) => (
              <TarjetaProgreso
                key={r.id}
                rutina={r.rutina}
                fecha={r.fecha}
                duracionReal={r.duracionReal}
                estado={r.estado}
                nota={r.nota}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
