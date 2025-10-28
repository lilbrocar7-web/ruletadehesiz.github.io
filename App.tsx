"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { INITIAL_OPTIONS, SPIN_DURATION_MS, DEFAULT_COLORS } from "./constants"
import type { WheelOption } from "./types"
import RouletteWheel from "./components/RouletteWheel"
import ResultDisplay from "./components/ResultDisplay"
import OptionsEditor from "./components/OptionsEditor"

const App: React.FC = () => {
  const [options, setOptions] = useState<WheelOption[]>(INITIAL_OPTIONS)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [rotation, setRotation] = useState<number>(0)
  const [currentResult, setCurrentResult] = useState<WheelOption | null>(null)

  const handleSpin = useCallback(() => {
    if (isSpinning || options.length < 2) return

    setIsSpinning(true)
    setCurrentResult(null)

    const totalOptions = options.length
    const segmentAngle = 360 / totalOptions

    // --- Force red to be the winner ---
    const redOptionIndexes = options
      .map((opt, index) => (opt.color === "#f44336" ? index : -1))
      .filter((index) => index !== -1)

    let winningIndex: number
    if (redOptionIndexes.length > 0) {
      // Pick a random red option to land on
      winningIndex = redOptionIndexes[Math.floor(Math.random() * redOptionIndexes.length)]
    } else {
      // Fallback: no red options, spin to a random winner
      winningIndex = Math.floor(Math.random() * totalOptions)
    }
    // --- End force red ---

    const fullSpins = 8
    const baseRotation = fullSpins * 360
    // The pointer is at the top (0 degrees). We want the winning segment's center to align with it.
    // The conic gradient starts relative to the top, so we calculate the angle to the winner.
    const winningAngle = winningIndex * segmentAngle

    // Add a random offset within the segment for variability
    const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.8

    const targetRotation = baseRotation - winningAngle - randomOffset

    setRotation((prev) => {
      // Use a non-additive rotation to prevent massive numbers and ensure a smooth transition
      // This takes the current rotation, removes the remainder, and adds the new spin target.
      return prev - (prev % 360) + targetRotation
    })

    setTimeout(() => {
      setIsSpinning(false)
      const finalWinningOption = options[winningIndex] // Re-evaluate in case options changed
      setCurrentResult(finalWinningOption)
    }, SPIN_DURATION_MS)
  }, [isSpinning, options])

  const handleAddOption = useCallback(() => {
    setOptions((prev) => {
      const nextColor = DEFAULT_COLORS[prev.length % DEFAULT_COLORS.length]
      const newOption: WheelOption = {
        id: crypto.randomUUID(),
        label: `Option ${prev.length + 1}`,
        color: nextColor,
      }
      return [...prev, newOption]
    })
  }, [])

  const handleUpdateOption = useCallback((id: string, label: string) => {
    setOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, label } : opt)))
  }, [])

  const handleDeleteOption = useCallback((id: string) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id))
  }, [])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white p-4 font-sans overflow-y-auto">
      <header className="text-center my-4 md:my-8">
        <h1
          className="text-4xl md:text-6xl font-bold text-yellow-400 tracking-wider"
          style={{ textShadow: "0 0 10px #facc15" }}
        >
          Wheel of Fortune
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Add your options and spin the wheel!</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-5 items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left Column */}
        <div className="lg:col-span-2 w-full max-w-md mx-auto lg:max-w-none flex flex-col gap-4">
          <OptionsEditor
            options={options}
            onAddOption={handleAddOption}
            onUpdateOption={handleUpdateOption}
            onDeleteOption={handleDeleteOption}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 w-full flex flex-col items-center gap-6">
          <div className="relative flex justify-center items-center">
            <div
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20"
              style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))" }}
            >
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-yellow-400"></div>
            </div>
            <RouletteWheel rotation={rotation} options={options} />
          </div>

          <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
            <ResultDisplay result={currentResult} isSpinning={isSpinning} />
            <button
              onClick={handleSpin}
              disabled={isSpinning || options.length < 2}
              className={`
                    w-full py-4 px-8 text-2xl font-bold rounded-lg transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-4 focus:ring-yellow-500/50
                    ${
                      isSpinning || options.length < 2
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-yellow-400 text-gray-900 hover:bg-yellow-500 transform hover:scale-105 active:scale-100"
                    }
                    `}
            >
              {isSpinning ? "Spinning..." : "SPIN"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
