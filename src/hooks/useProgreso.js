import { useState, useEffect, useCallback } from 'react'
import * as progresoService from '../services/progresoService'

/**
 * useProgreso - Hook que coordina la consulta, dependencias,
 * limpieza con AbortController y los cuatro estados de consulta:
 * - cargando: true mientras la petición está en curso
 * - error: mensaje de fallo si la promesa rechaza
 * - datos: arreglo de registros recuperados
 * - recargar: función para reintentar o forzar actualización
 */
export function useProgreso() {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  const recargar = useCallback(() => {
    setTick((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setCargando(true)
    setError(null)

    progresoService
      .obtener(controller.signal)
      .then((resultado) => {
        setDatos(resultado)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      })

    // Limpieza: cancela lectura previa al desmontar o al recargar
    return () => controller.abort()
  }, [tick])

  return {
    datos,
    registros: datos, // alias
    cargando,
    error,
    recargar
  }
}
