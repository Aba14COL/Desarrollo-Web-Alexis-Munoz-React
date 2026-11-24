import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SesionContext = createContext(undefined)

/**
 * Proveedor de sesión — envuelve toda la app.
 * sesion === undefined → todavía comprobando
 * sesion === null      → no autenticado
 * sesion === objeto    → usuario autenticado
 */
export function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(undefined)
  const [errorAuth, setErrorAuth] = useState(null)
  const [mensajeAuth, setMensajeAuth] = useState(null)

  useEffect(() => {
    // 1. Detectar si la URL trae un error de confirmación en el hash (#error=...)
    const hash = window.location.hash
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace(/^#/, ''))
      const errorDesc = params.get('error_description')
      const errorCode = params.get('error_code')

      if (errorCode === 'otp_expired' || (errorDesc && errorDesc.includes('expired'))) {
        setErrorAuth(
          'Tu correo ya fue confirmado exitosamente (el enlace de un solo uso ya se procesó). ¡Ya puedes iniciar sesión con tu cuenta!'
        )
      } else if (errorDesc) {
        setErrorAuth(decodeURIComponent(errorDesc.replace(/\+/g, ' ')))
      }

      window.history.replaceState(null, '', window.location.pathname)
    }

    // 2. Detectar si la URL trae un token exitoso de confirmación de correo (#access_token=...&type=signup)
    if (hash && hash.includes('access_token=') && hash.includes('type=signup')) {
      setMensajeAuth('¡Correo electrónico confirmado con éxito! Bienvenido a FITPLAN.')
      window.history.replaceState(null, '', window.location.pathname)
    }

    // 3. Obtener sesión inicial
    supabase.auth.getSession().then(({ data }) => setSesion(data.session ?? null))

    // 4. Escuchar cambios de autenticación
    const { data: listener } = supabase.auth.onAuthStateChange((event, s) => {
      setSesion(s ?? null)
      if (event === 'SIGNED_IN' && s) {
        setMensajeAuth('Sesión iniciada correctamente.')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  function limpiarAvisos() {
    setErrorAuth(null)
    setMensajeAuth(null)
  }

  return (
    <SesionContext.Provider value={{ sesion, errorAuth, mensajeAuth, limpiarAvisos }}>
      {children}
    </SesionContext.Provider>
  )
}

export function useSesion() {
  const context = useContext(SesionContext)
  return context?.sesion
}

export function useAuthNotification() {
  const context = useContext(SesionContext)
  return {
    errorAuth: context?.errorAuth,
    mensajeAuth: context?.mensajeAuth,
    limpiarAvisos: context?.limpiarAvisos
  }
}

export function nombreVisible(usuario) {
  const meta = usuario?.user_metadata || {}
  const nombre = meta.nombre || meta.full_name || meta.name || (usuario?.email || '').split('@')[0]
  return nombre.split(' ')[0]
}
