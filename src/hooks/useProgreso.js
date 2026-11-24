import { useState, useEffect } from 'react'
import { listarRegistros } from '../servicios/progresoService'

export function useProgreso(refrescar = 0) {
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setCargando(true)
    setError(null)

    listarRegistros(controller.signal)
      .then(setRegistros)
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

    return () => controller.abort()
  }, [refrescar])

  return { registros, cargando, error }
}
