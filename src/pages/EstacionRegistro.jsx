import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { QRScanner } from '../components/QRScanner'
import './Estaciones.css'

export const EstacionRegistro = () => {
  const navigate = useNavigate()
  const { setUsuario } = useUserStore()
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [edadUsuario, setEdadUsuario] = useState('')
  const [qrScaneado, setQrScaneado] = useState('')

  const handleQRScan = (usuarioId) => {
    setQrScaneado(usuarioId)
  }

  const handleContinuar = (e) => {
    e.preventDefault()
    if (qrScaneado && nombreUsuario && edadUsuario) {
      setUsuario({
        id: qrScaneado,
        nombre: nombreUsuario,
        edad: edadUsuario,
        fechaRegistro: new Date().toISOString()
      })
      navigate('/estacion-medidas')
    }
  }

  return (
    <div className="estacion-container">
      <div className="estacion-header">
        <h1>🔍 Estación 1: Registro de Usuario</h1>
        <p>Lee el QR del carnet y completa los datos</p>
      </div>

      <div className="estacion-content">
        <div className="estacion-card">
          <h2>Escanear QR</h2>
          <QRScanner onScan={handleQRScan} />
          {qrScaneado && (
            <div className="badge badge-success">
              ✓ QR Escaneado: {qrScaneado}
            </div>
          )}
        </div>

        <form onSubmit={handleContinuar} className="estacion-form">
          <div className="form-group">
            <label>Nombre del Usuario</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ej: Juan Pérez"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Edad</label>
            <input
              type="number"
              className="input-field"
              placeholder="Ej: 25"
              value={edadUsuario}
              onChange={(e) => setEdadUsuario(e.target.value)}
              required
              min="1"
              max="120"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!qrScaneado || !nombreUsuario || !edadUsuario}
          >
            Continuar a Medidas →
          </button>
        </form>
      </div>
    </div>
  )
}
