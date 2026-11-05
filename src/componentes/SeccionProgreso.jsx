import CabeceraProgreso from './CabeceraProgreso'
import TarjetaProgreso from './TarjetaProgreso'

export default function SeccionProgreso({ registros }) {
  const completadas = registros.filter((r) => r.estado === 'completada').length

  return (
    <section className="seccion" id="progreso">
      <div className="contenedor">
        <CabeceraProgreso total={registros.length} completadas={completadas} />

        <div className="progreso-lista">
          {registros.length === 0 ? (
            <p className="estado-mensaje">Aún no tienes sesiones registradas. ¡Empieza hoy!</p>
          ) : (
            registros.map((r) => (
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
