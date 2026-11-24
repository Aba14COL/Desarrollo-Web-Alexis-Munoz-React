import { Routes, Route } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import Pie from './components/Pie'
import Inicio from './pages/Inicio'
import Rutinas from './pages/Rutinas'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Progreso from './pages/Progreso'
import Confirmacion from './pages/Confirmacion'
import RutaProtegida from './rutas/RutaProtegida'
import { useAuthNotification } from './context/SesionContext'

export default function App() {
  const { errorAuth, mensajeAuth, limpiarAvisos } = useAuthNotification()

  return (
    <>
      <Encabezado />

      {/* Banner de éxito */}
      {mensajeAuth && (
        <div
          style={{
            background: 'var(--color-principal)',
            color: '#000',
            padding: '0.85rem 1rem',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}
          role="status"
        >
          <span>🎉 {mensajeAuth}</span>
          <button
            type="button"
            className="btn btn-negro btn-sm"
            onClick={limpiarAvisos}
            style={{ padding: '0.2rem 0.6rem' }}
          >
            Aceptar
          </button>
        </div>
      )}

      {/* Banner de aviso / error */}
      {errorAuth && (
        <div
          style={{
            background: '#2a1215',
            borderBottom: '1px solid var(--color-error)',
            color: '#ffcdd2',
            padding: '0.85rem 1rem',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.95rem'
          }}
          role="alert"
        >
          <span>ℹ️ {errorAuth}</span>
          <button
            type="button"
            className="btn btn-borde btn-sm"
            onClick={limpiarAvisos}
            style={{ borderColor: 'var(--color-error)', color: '#fff', padding: '0.2rem 0.6rem' }}
          >
            Entendido
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
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
