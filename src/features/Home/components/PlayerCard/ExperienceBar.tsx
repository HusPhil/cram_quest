
interface ExperienceBarProps {
    currentExp: number,
    nextLvlExp: number,
}

export default function ExperienceBar({
    currentExp,
    nextLvlExp
}: ExperienceBarProps) {
  return (
    <div className="w-full space-y-2">
        <div className="flex justify-between items-center text-xs">
            <span className="text-text/80">Exp: </span>
            <span className="text-accent font-medium">{currentExp}/{nextLvlExp}</span>
        </div>
        <div className="relative h-2.5">
            {/* Background Bar */}
            <div className="absolute inset-0 bg-gray-700/50 rounded-full"></div>
            {/* Progress Bar */}
            <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent/80 to-accent/60 rounded-full transition-all duration-300"
                style={{ width: `${(currentExp/nextLvlExp) * 100}%` }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-accent/20 blur-md"></div>
            </div>
        </div>
    </div>
  )
}
