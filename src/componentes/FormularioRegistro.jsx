import { useState, useId } from 'react'
import { rutinas } from '../datos'

const valoresIniciales = {
  rutina: '',
  fecha: '',
  duracion: '',
  estado: 'completada',
  nota: ''
}

export default function FormularioRegistro({ onAgregar }) {
  const id = useId()
  const [campos, setCampos] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [mensajeExito, setMensajeExito] = useState('')

  const idRutina = `${id}-rutina`
  const idListaRutinas = `${id}-lista-rutinas`
  const idErrorRutina = `${id}-error-rutina`
  const idFecha = `${id}-fecha`
  const idErrorFecha = `${id}-error-fecha`
  const idDuracion = `${id}-duracion`
  const idErrorDuracion = `${id}-error-duracion`
  const idEstado = `${id}-estado`
  const idNota = `${id}-nota`

  function handleChange(event) {
    const { name, value } = event.target
    setCampos((anteriores) => ({
      ...anteriores,
      [name]: value
    }))

    if (mensajeExito) {
      setMensajeExito('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nuevosErrores = {}
    const rutinaTrim = campos.rutina.trim()
    const fechaTrim = campos.fecha.trim()
    const duracionStr = String(campos.duracion).trim()
    const duracionNum = Number(duracionStr)
    const hoy = new Date().toLocaleDateString('en-CA')

    if (!rutinaTrim) {
      nuevosErrores.rutina = 'La rutina es obligatoria.'
    }

    if (!fechaTrim) {
      nuevosErrores.fecha = 'La fecha es obligatoria.'
    } else if (fechaTrim > hoy) {
      nuevosErrores.fecha = 'La fecha no puede ser futura.'
    }

    if (!duracionStr || !Number.isInteger(duracionNum) || duracionNum < 1 || duracionNum > 300) {
      nuevosErrores.duracion = 'La duración debe ser un número entero entre 1 y 300 minutos.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const nuevoRegistro = {
      id: crypto.randomUUID(),
      rutina: rutinaTrim,
      fecha: fechaTrim,
      duracionReal: `${duracionNum} min`,
      estado: campos.estado,
      nota: campos.nota.trim()
    }

    onAgregar(nuevoRegistro)
    setCampos(valoresIniciales)
    setErrores({})
    setMensajeExito('Sesión registrada.')
  }

  return (
    <form className="formulario panel" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor={idRutina}>Rutina</label>
        <input
          type="text"
          id={idRutina}
          name="rutina"
          list={idListaRutinas}
          value={campos.rutina}
          onChange={handleChange}
          placeholder="Selecciona o escribe una rutina..."
          aria-invalid={Boolean(errores.rutina)}
          aria-describedby={errores.rutina ? idErrorRutina : undefined}
        />
        <datalist id={idListaRutinas}>
          {rutinas.map((r) => (
            <option key={r.id} value={r.nombre} />
          ))}
        </datalist>
        {errores.rutina && (
          <p id={idErrorRutina} className="mensaje error" role="alert">
            {errores.rutina}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor={idFecha}>Fecha</label>
        <input
          type="date"
          id={idFecha}
          name="fecha"
          value={campos.fecha}
          onChange={handleChange}
          aria-invalid={Boolean(errores.fecha)}
          aria-describedby={errores.fecha ? idErrorFecha : undefined}
        />
        {errores.fecha && (
          <p id={idErrorFecha} className="mensaje error" role="alert">
            {errores.fecha}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor={idDuracion}>Duración (minutos)</label>
        <input
          type="number"
          id={idDuracion}
          name="duracion"
          value={campos.duracion}
          onChange={handleChange}
          min="1"
          max="300"
          step="1"
          placeholder="Ej: 30"
          aria-invalid={Boolean(errores.duracion)}
          aria-describedby={errores.duracion ? idErrorDuracion : undefined}
        />
        {errores.duracion && (
          <p id={idErrorDuracion} className="mensaje error" role="alert">
            {errores.duracion}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor={idEstado}>Estado</label>
        <select
          id={idEstado}
          name="estado"
          value={campos.estado}
          onChange={handleChange}
        >
          <option value="completada">Completada</option>
          <option value="parcial">Parcial</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor={idNota}>Nota (opcional)</label>
        <textarea
          id={idNota}
          name="nota"
          value={campos.nota}
          onChange={handleChange}
          rows="3"
          placeholder="Comentarios sobre la sesión..."
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primario">
          Guardar sesión
        </button>
      </div>

      {mensajeExito && (
        <p className="mensaje ok" role="status">
          {mensajeExito}
        </p>
      )}
    </form>
  )
}

