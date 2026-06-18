import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import './QRScanner.css'

export const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    if (!scanning) return

    const scanner = new Html5QrcodeScanner(
      'qr-scanner',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    scanner.render(
      (decodedText) => {
        onScan(decodedText)
        setScanning(false)
        scanner.clear()
      },
      (error) => {
        // Error silencioso durante scanning
      }
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [scanning, onScan])

  return (
    <div className="qr-scanner-container">
      <div id="qr-scanner" />
      {!scanning && (
        <button
          className="btn btn-secondary mt-2"
          onClick={() => setScanning(true)}
        >
          Escanear de nuevo
        </button>
      )}
    </div>
  )
}
