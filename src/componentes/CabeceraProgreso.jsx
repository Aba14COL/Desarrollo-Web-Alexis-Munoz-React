export default function CabeceraProgreso({ total, completadas }) {
  return (
    <div className="progreso-cabecera">
      <div>
        <h2 className="titulo-seccion">Mi Progreso</h2>
        <p className="texto-suave">
          Lleva el control de tus sesiones de entrenamiento y observa tu avance semana a semana.
        </p>
      </div>
      <div className="progreso-resumen">
        <div className="resumen-dato">
          <span className="resumen-numero">{total}</span>
          <span className="resumen-etiqueta">Sesiones</span>
        </div>
        <div className="resumen-dato">
          <span className="resumen-numero">{completadas}</span>
          <span className="resumen-etiqueta">Completadas</span>
        </div>
      </div>
    </div>
  )
}
