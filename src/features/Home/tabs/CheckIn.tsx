import { useEffect } from 'react'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import useScreenResize from '../../../hooks/useScreenResize';
import SpriteSheet from '../../../components/SpriteSheet';


export default function CheckIn() {
    const currentScreenSize = useScreenResize();
    const {getAnimationParams: getPlayerAnimationParams, animationConfig: PlayerAnimationConfig, setCurrentAction: setPlayerAnimationAction} = useCharacterAnimation("player", 'knight', "knight_1")

  
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
          scale={currentScreenSize == "SMALL" ? 3 : 3.5}
        />
  
      </div>
    )
}
