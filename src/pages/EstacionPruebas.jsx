import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { AnimacionPrueba } from '../components/AnimacionPrueba'
import './Estaciones.css'

export const EstacionPruebas = () => {
  const navigate = useNavigate()
  const { usuario, datos, setDatos } = useUserStore()
  const [pruebas, setPruebas] = useState({
    lanzamiento: '',
    saltoCuerda: '',
    atletismo: ''
  })
  const [pruebaMostrada, setPruebaMostrada] = useState(null)

  const handlePruebaChange = (e) => {
    const { name, value } = e.target
    setPruebas({ ...pruebas, [name]: value })
  }

  const handleRegistrarPrueba = (tipo) => {
    if (pruebas[tipo]) {
      setPruebaMostrada(tipo)
      setTimeout(() => {
        setPruebaMostrada(null)
      }, 2000)
    }
  }

  const handleContinuar = () => {
    if (pruebas.lanzamiento && pruebas.saltoCuerda && pruebas.atletismo) {
      setDatos({
        lanzamiento: parseFloat(pruebas.lanzamiento),
        saltoCuerda: parseInt(pruebas.saltoCuerda),
        atletismo100m: parseFloat(pruebas.atletismo)
      })
      navigate('/estacion-ia')
    }
  }

  return (
    <div className="estacion-container">
      <div className="estacion-header">
        <h1>🏃 Estación 3: Pruebas Físicas</h1>
        <p>Usuario: {usuario?.nombre}</p>
      </div>

      <div className="estacion-content">
        <div className="pruebas-grid">
          {/* Prueba 1: Lanzamiento */}
          <div className="prueba-card">
            <h3>🎯 Lanzamiento</h3>
            <div className="input-group">
              <input
                type="number"
                name="lanzamiento"
                placeholder="Metros"
                value={pruebas.lanzamiento}
                onChange={handlePruebaChange}
                step="0.1"
                className="input-field"
              />
              <button
                className="btn btn-primary"
                onClick={() => handleRegistrarPrueba('lanzamiento')}
                type="button"
              >
                Registrar
              </button>
            </div>
            {pruebaMostrada === 'lanzamiento' && (
              <AnimacionPrueba
                tipo="lanzamiento"
                valor={pruebas.lanzamiento}
                unidad="m"
              />
            )}
          </div>

          {/* Prueba 2: Salto de Cuerda */}
          <div className="prueba-card">
            <h3>⛹️ Salto de Cuerda</h3>
            <div className="input-group">
              <input
                type="number"
                name="saltoCuerda"
                placeholder="Repeticiones"
                value={pruebas.saltoCuerda}
                onChange={handlePruebaChange}
                className="input-field"
              />
              <button
                className="btn btn-primary"
                onClick={() => handleRegistrarPrueba('saltoCuerda')}
                type="button"
              >
                Registrar
              </button>
            </div>
            {pruebaMostrada === 'saltoCuerda' && (
              <AnimacionPrueba
                tipo="saltoCuerda"
                valor={pruebas.saltoCuerda}
                unidad="rep"
              />
            )}
          </div>

          {/* Prueba 3: 100m Sprint */}
          <div className="prueba-card">
            <h3>🏃 100m Sprint</h3>
            <div className="input-group">
              <input
                type="number"
                name="atletismo"
                placeholder="Segundos"
                value={pruebas.atletismo}
                onChange={handlePruebaChange}
                step="0.1"
                className="input-field"
              />
              <button
                className="btn btn-primary"
                onClick={() => handleRegistrarPrueba('atletismo')}
                type="button"
              >
                Registrar
              </button>
            </div>
            {pruebaMostrada === 'atletismo' && (
              <AnimacionPrueba
                tipo="atletismo"
                valor={pruebas.atletismo}
                unidad="s"
              />
            )}
          </div>
        </div>

        <button
          onClick={handleContinuar}
          className="btn btn-success mt-4"
          disabled={!pruebas.lanzamiento || !pruebas.saltoCuerda || !pruebas.atletismo}
        >
          Continuar a Recomendaciones IA →
        </button>
      </div>
    </div>
  )
}
