import { useState } from 'react'

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className={'site-header' + (abierto ? ' abierto' : '')}>
      <div className="contenedor header-inner">
        <a className="logo" href="#" aria-label="FitPlan, inicio">Fit<span>Plan</span></a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={abierto}
          aria-controls="menu"
          aria-label="Abrir o cerrar el menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span></span>
        </button>
        <nav id="menu" aria-label="Principal">
          <ul>
            <li><a href="#" aria-current="page">Inicio</a></li>
            <li><a href="#">Rutinas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <div className="zona-sesion">
          <a className="btn btn-borde btn-sm" href="#">Iniciar sesión</a>
          <a className="btn btn-primario btn-sm" href="#">Únete</a>
        </div>
      </div>
    </header>
  )
}