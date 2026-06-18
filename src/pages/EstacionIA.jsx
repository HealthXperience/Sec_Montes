import { useState, useEffect } from 'react'
import { useUserStore } from '../store/userStore'
import { TypewriterText } from '../components/TypewriterText'
import './EstacionIA.css'

export const EstacionIA = () => {
  const { usuario, datos } = useUserStore()
  const [recomendaciones, setRecomendaciones] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    generarRecomendaciones()
  }, [])

  const generarRecomendaciones = async () => {
    setCargando(true)

    // Simulación de respuesta de IA
    // En producción, conectarías con Anthropic Claude API
    const textoSimulado = `🤖 Análisis Personalizado para ${usuario?.nombre}

Basándome en tus datos físicos:
• Peso: ${datos.peso} kg
• Altura: ${datos.altura} m
• IMC: ${datos.imc?.toFixed(1) || 'N/A'}

Aquí están mis recomendaciones:

📋 PLATO DEL BUEN COMER:
✓ 50% Verduras y frutas
✓ 25% Proteínas (pollo, pescado, legumbres)
✓ 25% Cereales integrales

💧 JARRA DEL BUEN BEBER:
✓ 8-10 vasos de agua diaria
✓ Evita bebidas azucaradas
✓ Incluso té verde o infusiones

😴 SUEÑO:
✓ 8 horas diarias mínimo
✓ Acuéstate a la misma hora
✓ Evita pantallas 1 hora antes

🏃 PLAN DE CARRERA:
✓ Fortalecimiento 3 días/semana
✓ Cardio 2 días/semana
✓ Flexibilidad y descanso 2 días/semana

¡Estás en buen camino! Mantén la consistencia. 🎯`

    setTimeout(() => {
      setRecomendaciones(textoSimulado)
      setCargando(false)
    }, 1000)
  }

  return (
    <div className="estacion-ia">
      <div className="estacion-header">
        <h1>🤖 Estación 4: Recomendaciones de IA</h1>
        <p>Análisis personalizado para {usuario?.nombre}</p>
      </div>

      <div className="ia-container">
        {cargando ? (
          <div className="loading-ia">
            <div className="spinner"></div>
            <p>La IA está analizando tus datos...</p>
          </div>
        ) : recomendaciones ? (
          <TypewriterText text={recomendaciones} speed={30} />
        ) : null}

        {recomendaciones && !cargando && (
          <div className="acciones-ia">
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = `/HX-IBIME-001`}
            >
              Ver Carnet Digital
            </button>
            <button className="btn btn-secondary" onClick={generarRecomendaciones}>
              Generar Nuevo Análisis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
