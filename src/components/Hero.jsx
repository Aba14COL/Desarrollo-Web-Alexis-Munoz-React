import { Link } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

export default function Hero() {
  const sesion = useSesion()

  return (
    <section className="hero">
      <div className="contenedor hero-grid">
        <div>
          <h1>Entrena a tu manera. Sin excusas.</h1>
          <p className="hero-texto">
            FITPLAN es tu plataforma para entrenar en casa o en el gimnasio, sin importar
            tu nivel. Elige una rutina, síguela paso a paso y lleva el control de tu
            progreso desde cualquier dispositivo.
          </p>
          <div className="hero-acciones">
            <Link className="btn btn-primario" to="/rutinas">
              Ver rutinas
            </Link>
            {!sesion && (
              <Link className="btn btn-borde" to="/registro">
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </div>
        <aside className="panel-amarillo">
          <h2>Empieza por tu punto de partida</h2>
          <p>Calcula tu IMC en segundos y elige la rutina que mejor se ajusta a ti.</p>
          <a className="btn btn-negro" href="#calculadora">
            Calcular mi IMC
          </a>
        </aside>
      </div>
    </section>
  )
}
