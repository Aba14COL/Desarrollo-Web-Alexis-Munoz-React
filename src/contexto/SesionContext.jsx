import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const SesionContext = createContext(undefined)

/**
 * Proveedor de sesión — envuelve toda la app.
 * sesion === undefined → todavía comprobando
 * sesion === null      → no autenticado
 * sesion === objeto    → usuario autenticado
 */
export function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSesion(data.session ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_ev, s) => setSesion(s ?? null))
    return () => listener.subscription.unsubscribe()
  }, [])

  return <SesionContext.Provider value={sesion}>{children}</SesionContext.Provider>
}

export function useSesion() {
  return useContext(SesionContext)
}

export function nombreVisible(usuario) {
  const meta = usuario?.user_metadata || {}
  const nombre = meta.nombre || meta.full_name || meta.name || (usuario?.email || '').split('@')[0]
  return nombre.split(' ')[0]
}

