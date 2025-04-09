import { useFloatingScreen } from '../../context/FloatingScreenContext'

interface FloatingScreenProps {
  children?: React.ReactNode
  className?: string
}

export default function FloatingScreen({ children, className }: FloatingScreenProps) {
  const { isScreenOpen, screenContent } = useFloatingScreen()

  return (
    <div
      className={`absolute inset-0 z-50 bg-background transition-all duration-500 ease-in-out ${
        isScreenOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className={`flex flex-col h-full w-full ${className}`}>
        {screenContent}
      </div>
    </div>
  )
}
