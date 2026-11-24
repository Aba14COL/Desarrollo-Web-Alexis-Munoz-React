import { Navigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

/**
 * Protege rutas privadas.
 * - undefined (comprobando) → muestra spinner
 * - null (no autenticado)  → redirige a /acceso
 * - sesión válida          → muestra children
 */
export default function RutaProtegida({ children }) {
  const sesion = useSesion()
  if (sesion === undefined) return <p className="estado-mensaje">Verificando sesión…</p>
  if (!sesion) return <Navigate to="/acceso" replace />
  return children
}

