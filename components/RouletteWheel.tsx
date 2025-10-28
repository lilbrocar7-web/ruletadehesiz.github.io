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
            // Ángulo del centro del segmento
            const segmentCenterAngle = index * segmentAngle + segmentAngle / 2

            // Ajustar tamaño de fuente según número de opciones
            const fontSize = totalOptions > 12 ? "text-[0.6rem]" : totalOptions > 8 ? "text-xs" : "text-sm"
            const fontSizeMd = totalOptions > 12 ? "md:text-xs" : totalOptions > 8 ? "md:text-sm" : "md:text-base"

            // Ancho máximo del texto basado en el número de opciones
            const maxWidth = totalOptions > 12 ? "max-w-[40px]" : totalOptions > 8 ? "max-w-[55px]" : "max-w-[70px]"
            const maxWidthMd =
              totalOptions > 12 ? "md:max-w-[55px]" : totalOptions > 8 ? "md:max-w-[75px]" : "md:max-w-[95px]"

            return (
              <div
                key={option.id}
                className="absolute top-0 left-1/2 origin-bottom"
                style={{
                  height: "50%",
                  transform: `rotate(${segmentCenterAngle}deg)`,
                }}
              >
                <div
                  className={`absolute left-1/2 -translate-x-1/2 ${fontSize} ${fontSizeMd} ${maxWidth} ${maxWidthMd}`}
                  style={{
                    top: "15%",
                  }}
                >
                  
                </div>
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
