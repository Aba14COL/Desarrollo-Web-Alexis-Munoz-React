import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { entrarConCorreo, entrarConGoogle } from '../supabaseClient'
import { useSesion } from '../contexto/SesionContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  const [cargando, setCargando] = useState(false)
  const sesion = useSesion()
  const navigate = useNavigate()

  if (sesion) {
    navigate('/', { replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setMensaje({ texto: 'Entrando...', tipo: 'ok' })

    try {
      await entrarConCorreo(email.trim(), password)
      navigate('/')
    } catch (error) {
      if (error.message && error.message.includes('Email not confirmed')) {
        setMensaje({ texto: 'Confirma tu correo antes de entrar. Revisa tu bandeja.', tipo: 'error' })
      } else {
        setMensaje({ texto: 'Correo o contraseña incorrectos.', tipo: 'error' })
      }
    } finally {
      setCargando(false)
    }
  }

  async function handleGoogle() {
    setMensaje({ texto: 'Abriendo Google...', tipo: 'ok' })
    try {
      await entrarConGoogle()
    } catch {
      setMensaje({ texto: 'No se pudo iniciar con Google. Intenta de nuevo.', tipo: 'error' })
    }
  }

  return (
    <main className="auth">
      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        <p>
          Accede a tu cuenta para ver tus rutinas personalizadas y hacer seguimiento
          de tu progreso.
        </p>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primario btn-bloque" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="separador" aria-hidden="true">
          <span>o</span>
        </div>

        <button type="button" className="btn btn-google" onClick={handleGoogle}>
          <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Continuar con Google
        </button>

        {mensaje.texto && (
          <p className={`mensaje ${mensaje.tipo}`} role="status">
            {mensaje.texto}
          </p>
        )}

        <p className="auth-pie">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </section>
    </main>
  )
}
