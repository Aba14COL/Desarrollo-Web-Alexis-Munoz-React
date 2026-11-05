import { useState } from 'react'
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
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null) // { imc, categoria } | { error }

  function calcular(e) {
    e.preventDefault()
    const p = parseFloat(peso)
    const a = parseFloat(altura)
    if (!(p > 0 && a > 0)) {
      setResultado({ error: 'Por favor ingresa valores válidos para peso y altura.' })
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
                <label htmlFor="peso">Peso (kg)</label>
                <input type="number" id="peso" placeholder="Ej: 70" min="1" max="500" step="0.1"
                  value={peso} onChange={(e) => setPeso(e.target.value)} />
              </div>
              <div className="campo">
                <label htmlFor="altura">Altura (m)</label>
                <input type="number" id="altura" placeholder="Ej: 1.75" min="0.5" max="2.5" step="0.01"
                  value={altura} onChange={(e) => setAltura(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primario btn-bloque">Calcular mi IMC</button>
            </form>
          </div>
        </div>

        <p style={{
          fontWeight: 'bold', fontSize: '1.15rem', minHeight: '1.6em', textAlign: 'center', marginTop: '1.5rem',
          color: resultado?.error ? 'var(--color-terciario)' : colores[categoria]
        }}>
          {resultado?.error ?? (resultado && `Tu IMC es ${resultado.imc.toFixed(2)}. ${mensajes[categoria]}`)}
        </p>

        {categoria && (
          <ListaRutinas titulo={etiquetas[categoria]} color={colores[categoria]} rutinas={recomendadas} />
        )}
      </div>
    </section>
  )
}