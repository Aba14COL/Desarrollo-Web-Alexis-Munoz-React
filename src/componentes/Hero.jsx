export default function Hero() {
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
            <a className="btn btn-primario" href="#">Ver rutinas</a>
            <a className="btn btn-borde" href="#">Crear cuenta gratis</a>
          </div>
        </div>
        <aside className="panel-amarillo">
          <h2>Empieza por tu punto de partida</h2>
          <p>Calcula tu IMC en segundos y elige la rutina que mejor se ajusta a ti.</p>
          <a className="btn btn-negro" href="#calculadora">Calcular mi IMC</a>
        </aside>
      </div>
    </section>
  )
}