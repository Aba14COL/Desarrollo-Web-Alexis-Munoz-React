import { supabase } from '../supabaseClient'

/**
 * Obtiene todos los registros del usuario autenticado ordenados por fecha desc.
 */
export async function listarRegistros(signal) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay una sesión activa para autenticar la petición')

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

/**
 * Inserta un nuevo registro de entrenamiento.
 */
export async function crearRegistro(datos) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay una sesión activa para autenticar la petición')

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
    throw new Error('No se pudo verificar la creación del registro')
  }
  return data[0]
}

/**
 * Modifica un registro existente filtrando por id.
 */
export async function editarRegistro(id, cambios) {
  if (!id) throw new Error('Se requiere el id del registro para editar')

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
    throw new Error('no se encontró el registro')
  }
  return data[0]
}

/**
 * Elimina un registro por id.
 */
export async function eliminarRegistro(id) {
  if (!id) throw new Error('Se requiere el id del registro para eliminar')

  const { data, error } = await supabase
    .from('registros_entrenamiento')
    .delete()
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  if (!data || data.length !== 1) {
    throw new Error('No se pudo eliminar el registro o ya no existe')
  }
  return data[0]
}
