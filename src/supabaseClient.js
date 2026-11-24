import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key, {
  auth: { flowType: 'implicit', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
})

const INICIO = window.location.origin + '/'

export async function entrarConGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: INICIO }
  })
  if (error) throw error
}

export async function registrarConCorreo(nombre, correo, password) {
  const { data, error } = await supabase.auth.signUp({
    email: correo,
    password,
    options: { data: { nombre }, emailRedirectTo: INICIO }
  })
  if (error) throw error
  return data
}

export async function entrarConCorreo(correo, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: correo, password })
  if (error) throw error
  return data
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  if (error) throw error
}
