import Hero from '../componentes/Hero'
import CalculadoraIMC from '../componentes/CalculadoraIMC'

export default function Inicio() {
  return (
    <>
      <Hero />
      <div className="franja">
        <div className="contenedor franja-inner">
          <span>3 niveles de rutina</span>
          <span>En casa o en el gimnasio</span>
          <span>Tu progreso en cualquier dispositivo</span>
        </div>
      </div>

      <section className="seccion" id="about">
        <div className="contenedor dos-columnas">
          <div>
            <h2 className="titulo-seccion">¿Qué es FITPLAN?</h2>
            <p className="texto-suave">
              Somos una plataforma pensada para personas que quieren empezar a ejercitarse
              de forma segura y organizada. Ofrecemos rutinas clasificadas por nivel,
              explicadas de manera clara para que cualquier persona pueda seguirlas sin
              necesidad de un entrenador presencial.
            </p>
          </div>
          <aside className="nota">
            <h3>Dato importante</h3>
            <p>
              Antes de empezar cualquier rutina, recuerda calentar al menos 5 minutos
              y mantenerte hidratado durante todo el entrenamiento.
            </p>
          </aside>
        </div>
      </section>

      <CalculadoraIMC />
    </>
  )
}
