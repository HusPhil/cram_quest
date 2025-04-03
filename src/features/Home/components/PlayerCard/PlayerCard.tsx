
import SpriteSheet from '../../../../components/SpriteSheet'

interface PlayerCardProps {
    characterAsset: string;
    row: number;
    fps: number;
    frameCount: number;
    currentScreenSize: string;
}

export default function PlayerCard({
    characterAsset,
    row,
    fps,
    frameCount,
    currentScreenSize
}: PlayerCardProps) {
  return (
    <div className="relative p-6 rounded-lg bg-gray-800/50 border border-amber-500/20 backdrop-blur-sm shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-lg"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Character Sprite */}
            <div className="relative">
            <div className="absolute inset-0 bg-amber-400/10 blur-xl"></div>
            <div className="relative">
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

            {/* Character Stats */}
            <div className="flex flex-col items-center md:items-start space-y-3">
            <h1 className="text-2xl font-bold text-amber-400 tracking-wide">NOOBIE</h1>
            <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium bg-amber-400/10 text-amber-400 rounded-full">
                Lv. 10
                </span>
            </div>
            {/* XP Bar */}
            <div className="w-full max-w-[200px]">
                <div className="text-xs text-amber-400/80 mb-1">XP: 213/312</div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    style={{ width: `${(213/312) * 100}%` }}
                ></div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
