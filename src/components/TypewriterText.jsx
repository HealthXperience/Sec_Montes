import { useEffect, useState } from 'react'
import './TypewriterText.css'

export const TypewriterText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    let index = 0
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index])
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <div className="typewriter-container">
      <div className="typewriter-text">
        {displayedText}
        {!isComplete && <span className="cursor">|</span>}
      </div>
    </div>
  )
}
