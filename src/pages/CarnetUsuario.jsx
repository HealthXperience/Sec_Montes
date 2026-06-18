import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TypewriterText } from '../components/TypewriterText'
import { GaugeIMC } from '../components/GaugeIMC'
import './CarnetUsuario.css'

export const CarnetUsuario = () => {
  const { usuarioId } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Simular carga de datos del usuario desde Firebase
    const datosSimulados = {
      id: usuarioId,
      nombre: 'Juan Pérez García',
      edad: 25,
      peso: 75,
      altura: 1.75,
      imc: 24.5,
      lanzamiento: 35,
      saltoCuerda: 120,
      atletismo100m: 12.5,
      recomendaciones: `Basándome en tu perfil, aquí están mis recomendaciones personalizadas...`
    }

    setTimeout(() => {
      setUsuario(datosSimulados)
      setCargando(false)
    }, 1000)
  }, [usuarioId])

  if (cargando) {
    return (
      <div className="carnet-loading">
        <div className="spinner"></div>
        <p>Cargando tu carnet digital...</p>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="carnet-error">
        <h2>❌ Usuario no encontrado</h2>
        <p>El ID {usuarioId} no existe en nuestros registros.</p>
      </div>
    )
  }

  return (
    <div className="carnet-container">
      {/* Carnet Digital */}
      <div className="carnet-digital">
        <div className="carnet-header">
          <h1>HealthXperience</h1>
          <span className="carnet-id">{usuario.id}</span>
        </div>

        <div className="carnet-usuario">
          <div className="usuario-foto">👤</div>
          <div className="usuario-info">
            <h2>{usuario.nombre}</h2>
            <p>{usuario.edad} años</p>
          </div>
        </div>

        <div className="carnet-datos">
          <div className="dato-item">
            <span className="label">Peso</span>
            <span className="valor">{usuario.peso} kg</span>
          </div>
          <div className="dato-item">
            <span className="label">Altura</span>
            <span className="valor">{usuario.altura} m</span>
          </div>
          <div className="dato-item">
            <span className="label">IMC</span>
            <span className="valor" style={{ color: '#2ecc71' }}>
              {usuario.imc.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="carnet-pruebas">
          <h3>Pruebas Físicas</h3>
          <div className="pruebas-list">
            <div className="prueba-item">
              <span>🎯 Lanzamiento</span>
              <span>{usuario.lanzamiento}m</span>
            </div>
            <div className="prueba-item">
              <span>⛹️ Salto de Cuerda</span>
              <span>{usuario.saltoCuerda} rep</span>
            </div>
            <div className="prueba-item">
              <span>🏃 100m Sprint</span>
              <span>{usuario.atletismo100m}s</span>
            </div>
          </div>
        </div>

        <div className="carnet-footer">
          <p>🔐 Carnet Digital Verificado</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            Generado: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      {/* Gauge IMC */}
      <div className="carnet-gauge">
        <h2>Tu Índice de Masa Corporal</h2>
        <GaugeIMC imc={usuario.imc} />
      </div>

      {/* Recomendaciones */}
      <div className="carnet-recomendaciones">
        <h2>🤖 Recomendaciones Personalizadas</h2>
        <TypewriterText text={usuario.recomendaciones} speed={30} />
      </div>
    </div>
  )
}
