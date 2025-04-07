import React from 'react'
import { useFloatingScreen } from '../../context/FloatingScreenContext'

export default function FloatingScreen() {
  const { isScreenOpen, closeScreen, screenContent } = useFloatingScreen()

  return (
    <div
      className={`absolute inset-0 z-50 bg-secondary transition-all duration-500 ease-in-out ${
        isScreenOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full w-full p-4">
        <button onClick={closeScreen} className="mb-4 px-4 py-2 bg-accent text-white rounded">
          Close
        </button>
        {screenContent}
      </div>
    </div>
  )
}
