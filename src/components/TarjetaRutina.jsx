export default function TarjetaRutina({ nombre, descripcion, duracion, intensidad, color }) {
  return (
    <div className="tarjeta-rutina" style={{ borderLeftColor: color }}>
      <h4>{nombre}</h4>
      <p>{descripcion}</p>
      <div className="rutina-meta">
        <span> {duracion}</span>
        <span> {intensidad}</span>
      </div>
    </div>
  )
}