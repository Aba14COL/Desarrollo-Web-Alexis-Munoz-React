export default function Rutinas() {
  return (
    <>
      <section className="intro-rutinas" id="intro-rutinas">
        <div className="contenedor">
          <h1>Nuestras rutinas</h1>
          <p>
            Tenemos rutinas diseñadas para cada nivel de condición física. Elige la que
            mejor se ajuste a ti y empieza a entrenar hoy mismo. Todas incluyen
            calentamiento, ejercicios principales y enfriamiento.
          </p>
        </div>
      </section>

      <section className="seccion" id="rutina-principiante">
        <div className="contenedor nivel">
          <div className="nivel-cabecera">
            <span className="barras" role="img" aria-label="Nivel 1 de 3">
              <i className="on"></i>
              <i></i>
              <i></i>
            </span>
            <h2>Rutina para principiantes</h2>
            <img
              className="rutina-img"
              src="/img/rutina-principiante.jpg"
              alt="Rutina para principiantes"
              onError={(e) => {
                e.currentTarget.hidden = true
              }}
            />
          </div>
          <div className="pasos">
            <article>
              <h3>Calentamiento</h3>
              <p>
                5 minutos de trote suave en el mismo lugar, seguidos de movilidad
                articular en hombros, cadera y rodillas.
              </p>
            </article>
            <article>
              <h3>Ejercicios principales</h3>
              <p>
                3 series de 12 sentadillas, 3 series de 10 flexiones de rodillas y
                3 series de 20 segundos de plancha abdominal.
              </p>
            </article>
            <article>
              <h3>Enfriamiento</h3>
              <p>
                5 minutos de estiramientos suaves enfocados en piernas y espalda baja
                para relajar los músculos trabajados.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="seccion" id="rutina-intermedio">
        <div className="contenedor nivel">
          <div className="nivel-cabecera">
            <span className="barras" role="img" aria-label="Nivel 2 de 3">
              <i className="on"></i>
              <i className="on"></i>
              <i></i>
            </span>
            <h2>Rutina intermedia</h2>
            <img
              className="rutina-img"
              src="/img/rutina-intermedio.jpg"
              alt="Rutina intermedia"
              onError={(e) => {
                e.currentTarget.hidden = true
              }}
            />
          </div>
          <div className="pasos">
            <article>
              <h3>Circuito de fuerza</h3>
              <p>
                4 series de 15 zancadas por pierna, 4 series de 12 flexiones completas y
                4 series de 15 remo con banda elástica.
              </p>
            </article>
            <article>
              <h3>Cardio intensivo</h3>
              <p>
                4 rondas de 1 minuto de burpees seguidos de 1 minuto de descanso activo
                caminando en el lugar.
              </p>
            </article>
            <aside className="nota">
              <h3>Consejo del entrenador</h3>
              <p>
                Cuida siempre la técnica antes que la velocidad. Es mejor hacer menos
                repeticiones bien hechas que muchas con mala postura.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="seccion" id="rutina-avanzado">
        <div className="contenedor nivel">
          <div className="nivel-cabecera">
            <span className="barras" role="img" aria-label="Nivel 3 de 3">
              <i className="on"></i>
              <i className="on"></i>
              <i className="on"></i>
            </span>
            <h2>Rutina avanzada</h2>
            <img
              className="rutina-img"
              src="/img/rutina-avanzado.jpg"
              alt="Rutina avanzada"
              onError={(e) => {
                e.currentTarget.hidden = true
              }}
            />
          </div>
          <div className="pasos">
            <article>
              <h3>Entrenamiento de alta intensidad</h3>
              <p>
                5 rondas de HIIT: 40 segundos de esfuerzo máximo en sentadilla salto,
                escaladores y burpees, con 20 segundos de descanso entre ejercicio.
              </p>
            </article>
            <article>
              <h3>Resistencia y potencia</h3>
              <p>
                5 series de 20 saltos al cajón, 5 series de 15 dominadas asistidas y
                5 series de sprints de 30 segundos.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
