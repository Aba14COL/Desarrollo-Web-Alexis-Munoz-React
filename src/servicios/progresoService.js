import { supabase } from '../supabaseClient'

/**
 * Capa de servicio de datos para registros de entrenamiento.
 * Encapsula la comunicación con la API de Supabase REST.
 */

export async function obtener(signal) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay una sesión activa para autenticar la petición.')

  let query = supabase
    .from('registros_entrenamiento')
    .select('*')
    .order('fecha', { ascending: false })

  if (signal) {
    query = query.abortSignal(signal)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data || []
}

export async function crear(datos) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay una sesión activa para autenticar la petición.')

  const { data, error } = await supabase
    .from('registros_entrenamiento')
    .insert({
      user_id: user.id,
      rutina_id: datos.rutina_id,
      fecha: datos.fecha,
      duracion_min: datos.duracion_min,
      nota: datos.nota || null
    })
    .select()

  if (error) throw new Error(error.message)
  if (!data || data.length !== 1) {
    throw new Error('No se pudo verificar la creación del registro.')
  }
  return data[0]
}

export async function editar(id, cambios) {
  if (!id) throw new Error('Se requiere el id del registro para editar.')

  const { data, error } = await supabase
    .from('registros_entrenamiento')
    .update({
      rutina_id: cambios.rutina_id,
      fecha: cambios.fecha,
      duracion_min: cambios.duracion_min,
      nota: cambios.nota || null
    })
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  if (!data || data.length === 0) {
    throw new Error('No se encontró el registro.')
  }
  return data[0]
}

export async function eliminar(id) {
  if (!id) throw new Error('Se requiere el id del registro para eliminar.')

  const { data, error } = await supabase
    .from('registros_entrenamiento')
    .delete()
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  if (!data || data.length !== 1) {
    throw new Error('No se pudo eliminar el registro o ya no existe.')
  }
  return data[0]
}

// Aliases para compatibilidad
export const listarRegistros = obtener
export const crearRegistro = crear
export const editarRegistro = editar
export const eliminarRegistro = eliminar
