import { memo } from "react"

interface LevelBadgeProps {
    playerTitle: String,
    currentLevel: number
}

export function LevelBadge({
    playerTitle,
    currentLevel,
}: LevelBadgeProps) {
  return (
    <>
        {/* Level Badge */}
        <div className="flex items-center gap-2">
            <div className=" text-center lg:hidden">
                <span className="text-sm text-accent/80">{playerTitle}</span>
            </div>
            <div className="relative lg:mb-2 ">
                <span className="relative px-3 py-[0.5] text-xs bg-accent/10 text-text rounded-full border border-accent/20">
                    Lvl. {currentLevel}
                </span>
            </div>
        </div>  
    </>
  )
}

export default memo(LevelBadge)
