import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSesion, nombreVisible } from '../contexto/SesionContext'
import { cerrarSesion } from '../supabaseClient'

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  const sesion = useSesion()
  const navigate = useNavigate()

  async function handleCerrarSesion() {
    try {
      await cerrarSesion()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className={'site-header' + (abierto ? ' abierto' : '')}>
      <div className="contenedor header-inner">
        <Link className="logo" to="/" aria-label="FitPlan, inicio">
          Fit<span>Plan</span>
        </Link>
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
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'activo' : '')}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/rutinas" className={({ isActive }) => (isActive ? 'activo' : '')}>
                Rutinas
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'activo' : '')}>
                Contacto
              </NavLink>
            </li>
            {sesion && (
              <li>
                <NavLink to="/progreso" className={({ isActive }) => (isActive ? 'activo' : '')}>
                  Mi progreso
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="zona-sesion">
          {sesion ? (
            <>
              <span className="saludo">
                Hola, <strong>{nombreVisible(sesion.user)}</strong>
              </span>
              <button
                type="button"
                className="btn btn-borde btn-sm"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-borde btn-sm" to="/login">
                Iniciar sesión
              </Link>
              <Link className="btn btn-primario btn-sm" to="/registro">
                Únete
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
