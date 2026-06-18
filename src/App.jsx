import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Login } from './pages/Login'
import { EstacionRegistro } from './pages/EstacionRegistro'
import { EstacionMedidas } from './pages/EstacionMedidas'
import { EstacionPruebas } from './pages/EstacionPruebas'
import { EstacionIA } from './pages/EstacionIA'
import { CarnetUsuario } from './pages/CarnetUsuario'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Estaciones para Alumnos */}
          <Route path="/estacion-registro" element={<EstacionRegistro />} />
          <Route path="/estacion-medidas" element={<EstacionMedidas />} />
          <Route path="/estacion-pruebas" element={<EstacionPruebas />} />
          <Route path="/estacion-ia" element={<EstacionIA />} />
          
          {/* Carnet Público del Usuario */}
          <Route path="/:usuarioId" element={<CarnetUsuario />} />
          
          {/* Alternativa con ruta explícita */}
          <Route path="/carnet/:usuarioId" element={<CarnetUsuario />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
