import { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './GaugeIMC.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export const GaugeIMC = ({ imc }) => {
  const getState = () => {
    if (imc < 18.5) return { label: 'Bajo Peso', color: '#3498db' }
    if (imc < 25) return { label: 'Normal', color: '#2ecc71' }
    if (imc < 30) return { label: 'Sobrepeso', color: '#f39c12' }
    return { label: 'Obesidad', color: '#e74c3c' }
  }

  const state = getState()

  const data = {
    labels: ['Tu IMC', 'Rango Normal'],
    datasets: [
      {
        data: [imc, 40 - imc],
        backgroundColor: [state.color, '#e0e0e0'],
        borderColor: ['white', 'white'],
        borderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    circumference: 180,
    rotation: 270,
    cutout: '70%'
  }

  return (
    <div className="gauge-container">
      <Doughnut data={data} options={options} />
      <div className="gauge-info">
        <p className="gauge-value" style={{ color: state.color }}>
          {imc.toFixed(1)}
        </p>
        <p className="gauge-label">{state.label}</p>
      </div>
    </div>
  )
}
