import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useSesion, nombreVisible } from '../context/SesionContext'

export default function Confirmacion() {
  const [segundos, setSegundos] = useState(4)
  const [estado, setEstado] = useState('procesando') // 'procesando' | 'exito' | 'error'
  const [mensajeError, setMensajeError] = useState('')
  const sesion = useSesion()
  const navigate = useNavigate()

  useEffect(() => {
    // 1. Revisar si la URL trajo algún error en el hash
    const hash = window.location.hash
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace(/^#/, ''))
      const errorDesc = params.get('error_description') || ''
      const errorCode = params.get('error_code') || ''

      if (errorCode === 'otp_expired' || errorDesc.includes('expired')) {
        // En muchos casos el token ya se canjeó y la cuenta está lista
        setEstado('exito')
      } else {
        setEstado('error')
        setMensajeError(decodeURIComponent(errorDesc.replace(/\+/g, ' ')) || 'El enlace de confirmación no es válido.')
      }
      window.history.replaceState(null, '', window.location.pathname)
      return
    }

    // 2. Si no hay error, verificar sesión o token de confirmación
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setEstado('exito')
      } else {
        // Puede ser que el enlace haya completado la confirmación sin sesión automática
        setEstado('exito')
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    })
  }, [])

  // Cuenta regresiva y redirección automática cuando es éxito
  useEffect(() => {
    if (estado !== 'exito') return

    const interval = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Si está logueado va a /progreso, de lo contrario a /login
          navigate(sesion ? '/progreso' : '/login')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [estado, sesion, navigate])

  return (
    <main className="auth" style={{ minHeight: '70vh' }}>
      <section className="auth-card" style={{ textAlign: 'center' }}>
        {estado === 'procesando' && (
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Verificando cuenta...</h1>
            <p className="texto-suave">Estamos confirmando tu enlace de correo electrónico con Supabase.</p>
            <div className="estado-mensaje" style={{ marginTop: '1.5rem' }}>
              Cargando...
            </div>
          </div>
        )}

        {estado === 'exito' && (
          <div>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <h1 style={{ color: 'var(--color-principal)', fontSize: '2.4rem', marginBottom: '0.75rem' }}>
              ¡Cuenta confirmada con éxito!
            </h1>
            <p className="texto-suave" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              {sesion
                ? `Hola, ${nombreVisible(sesion.user)}. Tu cuenta ya está activa y lista para entrenar.`
                : 'Tu correo ha sido verificado correctamente. Ya puedes acceder a todas tus rutinas.'}
            </p>

            <div
              style={{
                background: 'var(--color-superficie)',
                border: '1px solid var(--color-borde)',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}
            >
              <p style={{ margin: 0, color: 'var(--color-texto)' }}>
                Redireccionando automáticamente en <strong>{segundos}</strong> segundos...
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={sesion ? '/progreso' : '/login'} className="btn btn-primario">
                {sesion ? 'Ir a Mi Progreso ahora' : 'Iniciar sesión ahora'}
              </Link>
              <Link to="/" className="btn btn-borde">
                Ir al Inicio
              </Link>
            </div>
          </div>
        )}

        {estado === 'error' && (
          <div>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h1 style={{ color: 'var(--color-error)', fontSize: '2.2rem', marginBottom: '0.75rem' }}>
              Enlace de confirmación no válido
            </h1>
            <p className="mensaje error" style={{ marginBottom: '1.5rem' }}>
              {mensajeError}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primario">
                Intentar Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-borde">
                Volver a Registrarse
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
