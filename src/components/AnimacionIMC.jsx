import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './AnimacionIMC.css'

export const AnimacionIMC = ({ peso, altura, imc, estado }) => {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 3000)
    return () => clearTimeout(timer)
  }, [imc])

  const getColor = () => {
    if (imc < 18.5) return '#3498db'
    if (imc < 25) return '#2ecc71'
    if (imc < 30) return '#f39c12'
    return '#e74c3c'
  }

  return (
    <div className="animacion-imc">
      <motion.div
        className="imc-calc-step"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="calc-formula">
          <span className="valor">{peso}</span>
          <span className="operador">÷</span>
          <span className="valor">({altura} × {altura})</span>
          <span className="operador">=</span>
        </div>
      </motion.div>

      <motion.div
        className="imc-resultado"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div
          className="imc-valor"
          style={{
            background: getColor(),
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}
        >
          {imc.toFixed(1)}
        </div>
      </motion.div>

      <motion.div
        className="imc-estado"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p style={{ fontSize: '20px', fontWeight: '600', color: getColor() }}>
          {estado}
        </p>
      </motion.div>
    </div>
  )
}
