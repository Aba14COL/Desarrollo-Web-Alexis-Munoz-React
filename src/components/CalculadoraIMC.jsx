import { useId, useState } from 'react'
import { rutinas, obtenerCategoriaIMC } from '../datos'
import ListaRutinas from './ListaRutinas'

const etiquetas = {
  bajo_peso: 'Bajo peso — Rutinas para ganar fuerza y masa muscular',
  normal: 'Peso saludable — Rutinas para mantenerte en forma',
  sobrepeso: 'Sobrepeso — Rutinas para quemar grasa y tonificar',
  obesidad: 'Obesidad — Rutinas suaves y progresivas para empezar'
}
const colores = {
  bajo_peso: '#29b6f6',
  normal: '#b3c000',
  sobrepeso: '#ff8800',
  obesidad: '#ef5350'
}
const mensajes = {
  bajo_peso: 'Estás por debajo de tu peso ideal.',
  normal: 'Tienes un peso saludable.',
  sobrepeso: 'Tienes sobrepeso.',
  obesidad: 'Tienes obesidad.'
}

export default function CalculadoraIMC() {
  const id = useId()
  const idPeso = `${id}-peso`
  const idAltura = `${id}-altura`
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null) // { imc, categoria } | { error }

  function calcular(e) {
    e.preventDefault()
    const p = parseFloat(peso)
    const a = parseFloat(altura)
    if (!p || p <= 0 || p > 200) {
      setResultado({ error: 'Por favor ingresa un peso válido entre 1 y 200 kg.' })
      return
    }
    if (!a || a < 0.5 || a > 2.0) {
      setResultado({ error: 'Por favor ingresa una altura válida entre 0.5 y 2.0 metros.' })
      return
    }
    const imc = p / (a * a)
    setResultado({ imc, categoria: obtenerCategoriaIMC(imc) })
  }

  const categoria = resultado?.categoria
  const recomendadas = categoria ? rutinas.filter((r) => r.categoriaIMC === categoria) : []

  return (
    <section className="seccion" id="calculadora">
      <div className="contenedor">
        <h2 className="titulo-seccion">Calcula tu IMC</h2>
        <p className="texto-suave" style={{ maxWidth: '60ch', marginBottom: '2rem' }}>
          Ingresa tu peso y altura para conocer tu Índice de Masa Corporal y recibir
          rutinas personalizadas según tu condición física actual.
        </p>

        <div className="imc-centrado">
          <div className="panel">
            <form className="formulario" onSubmit={calcular}>
              <div className="campo">
                <label htmlFor={idPeso}>Peso (kg)</label>
                <input
                  type="number"
                  id={idPeso}
                  placeholder="Ej: 70"
                  min="1"
                  max="500"
                  step="0.1"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  required
                />
              </div>
              <div className="campo">
                <label htmlFor={idAltura}>Altura (m)</label>
                <input
                  type="number"
                  id={idAltura}
                  placeholder="Ej: 1.75"
                  min="0.5"
                  max="2.5"
                  step="0.01"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primario btn-bloque">
                Calcular mi IMC
              </button>
            </form>
          </div>
        </div>

        <p
          style={{
            fontWeight: 'bold',
            fontSize: '1.15rem',
            minHeight: '1.6em',
            textAlign: 'center',
            marginTop: '1.5rem',
            color: resultado?.error ? 'var(--color-error)' : colores[categoria] || 'inherit'
          }}
          role="status"
        >
          {resultado?.error ?? (resultado && `Tu IMC es ${resultado.imc.toFixed(2)}. ${mensajes[categoria]}`)}
        </p>

        {categoria && (
          <ListaRutinas titulo={etiquetas[categoria]} color={colores[categoria]} rutinas={recomendadas} />
        )}
      </div>
    </section>
  )
}
