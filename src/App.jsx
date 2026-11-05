import Encabezado from './componentes/Encabezado'
import Hero from './componentes/Hero'
import CalculadoraIMC from './componentes/CalculadoraIMC'
import SeccionProgreso from './componentes/SeccionProgreso'
import Pie from './componentes/Pie'
import { registrosProgreso } from './datos'

export default function App() {
  return (
    <>
      <Encabezado />
      <main>
        <Hero />
        <CalculadoraIMC />
        <SeccionProgreso registros={registrosProgreso} />
      </main>
      <Pie />
    </>
  )
}