import { useEffect } from 'react'
import SpriteSheet from '../../../components/SpriteSheet'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'


export default function Quests() {
  const {getAnimationParams: getPlayerAnimationParams, animationConfig: PlayerAnimationConfig, setCurrentAction: setPlayerAnimationAction} = useCharacterAnimation("player", 'armored_knight', "armored_knight_gold")

  
  useEffect(() => {
    console.log("Quests re rendered")
  }, [])

  return (
    <div>
      <SpriteSheet
        src={getPlayerAnimationParams().characterAsset}
        frameRow={getPlayerAnimationParams().row}
        fps={getPlayerAnimationParams().fps}
        frameCount={getPlayerAnimationParams().frameCount}
        loop={true}
        frameWidth={48}
        frameHeight={48}
        offsetX={1}
        scale={3.5}
      />

    </div>
  )
}
