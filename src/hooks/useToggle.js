import { useState } from 'react'

/**
 * Hook personalizado para gestionar un estado booleano de alternancia.
 * Cada invocación de este hook conserva su propio estado de forma totalmente independiente.
 *
 * @param {boolean} [initialValue=false] - Valor inicial del estado booleano.
 * @returns {{
 *   value: boolean,
 *   toggle: () => void,
 *   setTrue: () => void,
 *   setFalse: () => void
 * }}
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue((prev) => !prev)
  }

  const setTrue = () => {
    setValue(true)
  }

  const setFalse = () => {
    setValue(false)
  }

  return { value, toggle, setTrue, setFalse }
}

