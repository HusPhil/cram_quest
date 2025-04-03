
import SpriteSheet from '../../../../components/SpriteSheet'
import RpgCard from '../../../../components/RpgCard'

interface PlayerCardProps {
    characterAsset: string;
    row: number;
    fps: number;
    frameCount: number;
    currentScreenSize: string;
    playerTitle: String;
    playerName: String;
    currentExp: number;
    nextLvlExp: number;
    currentLevel: number;
}

export default function PlayerCard({
    characterAsset,
    row,
    fps,
    frameCount,
    currentScreenSize,
    playerTitle,
    playerName,
    currentExp,
    nextLvlExp,
    currentLevel
}: PlayerCardProps) {
  return (
        <>
        <div className="flex flex-col lg:flex-row items-center">
            {/* Character Sprite */}
            <div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-2xl font-bold text-text tracking-wide">{playerTitle}</h1>
                        <div className='relative'>
                        <div className="absolute inset-3 bg-accent/10 blur-xl"></div>
                            <SpriteSheet
                                src={characterAsset}
                                frameRow={row}
                                fps={fps}
                                frameCount={frameCount}
                                loop={true}
                                frameWidth={48}
                                frameHeight={48}
                                scale={currentScreenSize === "SMALL" ? 3 : 3.5}
                            />
                        </div>
                    </div>
            </div>

            {/* Character Stats */}
            <div className="flex flex-col items-center lg:items-start space-y-3">
            <h2 className="font-bold text-text tracking-wide">{playerName}</h2>
            <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium bg-amber-400/10 text-text rounded-full">
                {`Lvl. ${currentLevel}`}
                </span>
            </div>
            {/* XP Bar */}
            <div className="w-full max-w-[200px]">
                <div className="text-xs text-text/80 mb-1 text-center lg:text-start">{`XP: ${currentExp}/${nextLvlExp}`}</div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    style={{ width: `${(currentExp/nextLvlExp) * 100}%` }}
                ></div>
                </div>
            </div>
            </div>
        </div>
        </>
  )
}
