import { buscarRutinaPorId } from '../datos'

export default function TarjetaProgreso({ registro, onEditar, onEliminar, enviando }) {
  const infoRutina = buscarRutinaPorId(Number(registro.rutina_id))
  const nombreRutina = infoRutina ? infoRutina.nombre : `Rutina #${registro.rutina_id}`

  return (
    <article className="tarjeta-registro">
      <div className="tarjeta-registro-cabecera">
        <h3>{nombreRutina}</h3>
        <span className="registro-fecha">{registro.fecha || ''}</span>
      </div>
      <div className="registro-meta">
        ⏱ Duración: {registro.duracion_min} minutos
      </div>
      {registro.nota && registro.nota.trim() && (
        <p className="registro-nota">{registro.nota}</p>
      )}
      <div className="registro-acciones">
        <button
          type="button"
          className="btn btn-borde btn-sm"
          onClick={() => onEditar(registro)}
          disabled={enviando}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-borde btn-sm"
          onClick={() => onEliminar(registro)}
          disabled={enviando}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}
