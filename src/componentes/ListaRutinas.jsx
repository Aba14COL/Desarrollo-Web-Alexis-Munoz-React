import TarjetaRutina from './TarjetaRutina'

export default function ListaRutinas({ titulo, color, rutinas }) {
  if (rutinas.length === 0) {
    return <p className="sin-resultados">No se encontraron rutinas para tu categoría.</p>
  }

  return (
    <div>
      <h3 style={{ color, marginBottom: '1rem' }}>{titulo}</h3>
      {rutinas.map((r) => (
        <TarjetaRutina
          key={r.id}
          nombre={r.nombre}
          descripcion={r.descripcion}
          duracion={r.duracion}
          intensidad={r.intensidad}
          color={color}
        />
      ))}
    </div>
  )
}