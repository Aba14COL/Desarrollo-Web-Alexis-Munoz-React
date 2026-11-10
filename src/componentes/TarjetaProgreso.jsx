import { useToggle } from '../hooks/useToggle'

export default function TarjetaProgreso({ rutina, fecha, duracionReal, estado, nota }) {
  const { value: mostrarNota, toggle: toggleNota } = useToggle(false)
  const tieneNota = Boolean(nota && nota.trim())

  return (
    <div className="tarjeta-registro">
      <div className="tarjeta-registro-cabecera">
        <h3>{rutina}</h3>
        <span className="registro-fecha">{fecha}</span>
      </div>
      <p className="registro-meta">
        Duración: {duracionReal} &nbsp;|&nbsp;
        Estado: <span className={'estado ' + (estado === 'completada' ? 'respondida' : 'sin-responder')}>
          {estado}
        </span>
      </p>
      {tieneNota && (
        <div className="registro-acciones">
          <button
            type="button"
            className="btn btn-borde btn-sm"
            onClick={toggleNota}
            aria-expanded={mostrarNota}
          >
            {mostrarNota ? 'Ocultar nota' : 'Ver nota'}
          </button>
        </div>
      )}
      {tieneNota && mostrarNota && <p className="registro-nota">{nota}</p>}
    </div>
  )
}
