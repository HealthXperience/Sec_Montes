import { motion } from 'framer-motion'
import './AnimacionPrueba.css'

export const AnimacionPrueba = ({ tipo, valor, unidad }) => {
  const iconos = {
    lanzamiento: '🎯',
    saltoCuerda: '⛹️',
    atletismo: '🏃'
  }

  const labels = {
    lanzamiento: 'Lanzamiento',
    saltoCuerda: 'Salto de Cuerda',
    atletismo: '100m Sprint'
  }

  return (
    <motion.div
      className="animacion-prueba"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="prueba-icono">{iconos[tipo] || '🏆'}</div>

      <motion.div
        className="prueba-valor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="numero">{valor}</span>
        <span className="unidad">{unidad}</span>
      </motion.div>

      <motion.div
        className="prueba-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {labels[tipo]}
      </motion.div>

      <motion.div
        className="prueba-barra"
        initial={{ width: 0 }}
        animate={{ width: '80%' }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.div>
  )
}
