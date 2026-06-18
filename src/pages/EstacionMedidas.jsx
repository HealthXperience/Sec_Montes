import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { AnimacionIMC } from '../components/AnimacionIMC'
import { GaugeIMC } from '../components/GaugeIMC'
import './Estaciones.css'

export const EstacionMedidas = () => {
  const navigate = useNavigate()
  const { usuario, datos, setDatos } = useUserStore()
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [imc, setImc] = useState(null)
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false)

  const calcularIMC = (e) => {
    e.preventDefault()
    if (peso && altura) {
      const alturaMetros = parseFloat(altura)
      const pesoKg = parseFloat(peso)
      const imcCalculado = pesoKg / (alturaMetros * alturaMetros)

      let estado = 'Peso Normal'
      if (imcCalculado < 18.5) estado = 'Peso Bajo'
      else if (imcCalculado < 25) estado = 'Peso Normal'
      else if (imcCalculado < 30) estado = 'Sobrepeso'
      else estado = 'Obesidad'

      setImc(imcCalculado)
      setMostrarAnimacion(true)
      setDatos({ peso: pesoKg, altura: alturaMetros, imc: imcCalculado })
    }
  }

  const handleContinuar = () => {
    navigate('/estacion-pruebas')
  }

  return (
    <div className="estacion-container">
      <div className="estacion-header">
        <h1>⚖️ Estación 2: Medidas y IMC</h1>
        <p>Usuario: {usuario?.nombre}</p>
      </div>

      <div className="estacion-content">
        <form onSubmit={calcularIMC} className="estacion-form">
          <div className="form-group">
            <label>Peso (kg)</label>
            <input
              type="number"
              className="input-field"
              placeholder="Ej: 75"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label>Altura (m)</label>
            <input
              type="number"
              className="input-field"
              placeholder="Ej: 1.75"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              step="0.01"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Calcular IMC
          </button>
        </form>

        {mostrarAnimacion && imc && (
          <div className="animacion-resultado">
            <AnimacionIMC peso={peso} altura={altura} imc={imc} />
            <div className="mt-3">
              <GaugeIMC imc={imc} />
            </div>
          </div>
        )}

        {imc && (
          <button
            onClick={handleContinuar}
            className="btn btn-success mt-4"
          >
            Continuar a Pruebas Físicas →
          </button>
        )}
      </div>
    </div>
  )
}
