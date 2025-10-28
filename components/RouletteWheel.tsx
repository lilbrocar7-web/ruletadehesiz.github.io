import type React from "react"
import { SPIN_DURATION_S } from "../constants"
import type { WheelOption } from "../types"

const RouletteWheel: React.FC<{ rotation: number; options: WheelOption[] }> = ({ rotation, options }) => {
  const totalOptions = options.length

  if (totalOptions === 0) {
    return (
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-8 border-yellow-600 bg-gray-700 shadow-2xl flex items-center justify-center">
        <div className="text-gray-400 text-center p-4">Add options to play!</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center z-10">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    )
  }

  const segmentAngle = 360 / totalOptions

  const gradientStops = options
    .map((option, index) => `${option.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`)
    .join(", ")

  const gradientStyle = {
    // Offset the gradient so the pointer aligns with the center of a segment
    background: `conic-gradient(from -${segmentAngle / 2}deg, ${gradientStops})`,
  }

  return (
    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-8 border-yellow-600 bg-gray-700 shadow-2xl">
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${SPIN_DURATION_S}s linear`,
        }}
      >
        <div className="absolute w-full h-full rounded-full" style={gradientStyle} />
        <div className="absolute w-full h-full">
          {options.map((option, index) => {
            const angle = index * segmentAngle
            const labelAngle = angle + segmentAngle / 2
            const isFlipped = labelAngle > 90 && labelAngle < 270

            // Ajustar tamaño de fuente según número de opciones
            const fontSize = totalOptions > 12 ? "0.6rem" : totalOptions > 8 ? "0.75rem" : "0.9rem"
            const fontSizeMd = totalOptions > 12 ? "0.75rem" : totalOptions > 8 ? "0.9rem" : "1.1rem"

            // Radio donde se posiciona el texto (70% del radio de la rueda)
            const radius = window.innerWidth >= 768 ? 225 * 0.65 : 150 * 0.65

            // Calcular posición X e Y usando trigonometría
            const angleRad = (labelAngle - 90) * (Math.PI / 180)
            const x = 50 + Math.cos(angleRad) * (radius / (window.innerWidth >= 768 ? 225 : 150)) * 50
            const y = 50 + Math.sin(angleRad) * (radius / (window.innerWidth >= 768 ? 225 : 150)) * 50

            // Ancho máximo del texto basado en el ángulo del segmento
            const maxWidth = totalOptions > 12 ? "45px" : totalOptions > 8 ? "60px" : "80px"
            const maxWidthMd = totalOptions > 12 ? "60px" : totalOptions > 8 ? "80px" : "100px"

            return (
              <div
                key={option.id}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${isFlipped ? labelAngle + 180 : labelAngle}deg)`,
                }}
              >
                <span
                  className="text-white font-bold text-center leading-tight block"
                  style={{
                    maxWidth: window.innerWidth >= 768 ? maxWidthMd : maxWidth,
                    fontSize: window.innerWidth >= 768 ? fontSizeMd : fontSize,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9)",
                    wordBreak: "break-word",
                    hyphens: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {option.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center z-10">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  )
}

export default RouletteWheel
