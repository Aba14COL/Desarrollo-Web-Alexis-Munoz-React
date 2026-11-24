import { useState, useId, useEffect } from 'react'
import { rutinas } from '../datos'
import { crearRegistro, editarRegistro } from '../services/progresoService'

function fechaHoy() {
  return new Date().toLocaleDateString('en-CA')
}

export default function FormularioRegistro({ registroEdicion, onGuardado, onCancelarEdicion }) {
  const id = useId()
  const [rutinaId, setRutinaId] = useState('')
  const [fecha, setFecha] = useState(fechaHoy())
  const [duracion, setDuracion] = useState('')
  const [nota, setNota] = useState('')
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [errorApi, setErrorApi] = useState(null)

  useEffect(() => {
    if (registroEdicion) {
      setRutinaId(String(registroEdicion.rutina_id))
      setFecha(registroEdicion.fecha || fechaHoy())
      setDuracion(String(registroEdicion.duracion_min || ''))
      setNota(registroEdicion.nota || '')
    } else {
      setRutinaId('')
      setFecha(fechaHoy())
      setDuracion('')
      setNota('')
    }
    setErrores({})
    setErrorApi(null)
  }, [registroEdicion])

  async function handleSubmit(e) {
    e.preventDefault()

    const nuevosErrores = {}
    const rId = parseInt(rutinaId, 10)
    if (!rId || Number.isNaN(rId)) {
      nuevosErrores.rutina = 'Por favor selecciona una rutina válida.'
    }

    const fTrim = fecha.trim()
    if (!fTrim || Number.isNaN(Date.parse(fTrim))) {
      nuevosErrores.fecha = 'Por favor ingresa una fecha válida.'
    }

    const dNum = parseInt(duracion, 10)
    if (!Number.isInteger(dNum) || dNum <= 0) {
      nuevosErrores.duracion = 'La duración debe ser un número entero mayor a 0 minutos.'
    }

    if (nota.length > 200) {
      nuevosErrores.nota = 'La nota no puede exceder los 200 caracteres.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setErrores({})
    setGuardando(true)
    setErrorApi(null)

    const payload = {
      rutina_id: rId,
      fecha: fTrim,
      duracion_min: dNum,
      nota: nota.trim() || null
    }

    try {
      if (registroEdicion) {
        await editarRegistro(registroEdicion.id, payload)
      } else {
        await crearRegistro(payload)
      }
      onGuardado()
    } catch (err) {
      setErrorApi(err.message || 'Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <aside className="panel" style={{ height: 'fit-content' }}>
      <h2 className="titulo-seccion">
        {registroEdicion ? 'Editar entrenamiento' : 'Registrar entrenamiento'}
      </h2>
      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor={`${id}-rutina`}>Rutina realizada</label>
          <select
            id={`${id}-rutina`}
            value={rutinaId}
            onChange={(e) => setRutinaId(e.target.value)}
            disabled={guardando}
            required
          >
            <option value="">Selecciona una rutina</option>
            {rutinas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
          {errores.rutina && <p className="mensaje error" role="alert">{errores.rutina}</p>}
        </div>

        <div className="campo">
          <label htmlFor={`${id}-fecha`}>Fecha</label>
          <input
            type="date"
            id={`${id}-fecha`}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            disabled={guardando}
            required
          />
          {errores.fecha && <p className="mensaje error" role="alert">{errores.fecha}</p>}
        </div>

        <div className="campo">
          <label htmlFor={`${id}-duracion`}>Duración (minutos)</label>
          <input
            type="number"
            id={`${id}-duracion`}
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            placeholder="Ej. 30"
            min="1"
            disabled={guardando}
            required
          />
          {errores.duracion && <p className="mensaje error" role="alert">{errores.duracion}</p>}
        </div>

        <div className="campo">
          <label htmlFor={`${id}-nota`}>Nota (opcional)</label>
          <textarea
            id={`${id}-nota`}
            rows="3"
            maxLength="200"
            placeholder="¿Cómo te sentiste hoy?"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            disabled={guardando}
          ></textarea>
          {errores.nota && <p className="mensaje error" role="alert">{errores.nota}</p>}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primario" disabled={guardando}>
            {guardando ? 'Guardando...' : registroEdicion ? 'Guardar cambios' : 'Guardar'}
          </button>
          {registroEdicion && (
            <button
              type="button"
              className="btn btn-borde"
              onClick={onCancelarEdicion}
              disabled={guardando}
            >
              Cancelar edición
            </button>
          )}
        </div>

        {errorApi && <p className="mensaje error" role="alert">{errorApi}</p>}
      </form>
    </aside>
  )
}
