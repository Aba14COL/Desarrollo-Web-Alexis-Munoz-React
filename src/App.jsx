import { Routes, Route } from 'react-router-dom'
import Encabezado from './componentes/Encabezado'
import Pie from './componentes/Pie'
import Inicio from './paginas/Inicio'
import Rutinas from './paginas/Rutinas'
import Contacto from './paginas/Contacto'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Progreso from './paginas/Progreso'
import RutaProtegida from './rutas/RutaProtegida'

export default function App() {
  return (
    <>
      <Encabezado />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/progreso"
          element={
            <RutaProtegida>
              <Progreso />
            </RutaProtegida>
          }
        />
        <Route
          path="*"
          element={
            <main className="seccion">
              <div className="contenedor" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <h2>Página no encontrada</h2>
                <p className="texto-suave" style={{ margin: '1.5rem 0' }}>
                  La página que buscas no existe o fue movida.
                </p>
                <a className="btn btn-primario" href="/">
                  Volver al inicio
                </a>
              </div>
            </main>
          }
        />
      </Routes>
      <Pie />
    </>
  )
}
