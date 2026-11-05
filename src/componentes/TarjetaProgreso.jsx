export default function TarjetaProgreso({ rutina, fecha, duracionReal, estado, nota }) {
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
      {nota && <p className="registro-nota">{nota}</p>}
    </div>
  )
}
