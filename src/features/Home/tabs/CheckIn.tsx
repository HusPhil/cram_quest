import React, { useEffect } from 'react'
import SpriteSheet from '../../../components/SpriteSheet'
import useFightAnimation from '../../../hooks/useFightAnimation'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import { enemyAssets } from '../../Battle/configs/animations/animationConfig'

export default function CheckIn() {
  const {getAnimationParams: getEvilShogunParams, animationConfig: evilShogunConfig, setCurrentAction: setEvilShogunAction} = useCharacterAnimation("evil_shogun")
  const {getAnimationParams: getSkeletonLordParams, animationConfig: skeletonLordConfig, setCurrentAction: setSkeletonLordAction} = useCharacterAnimation("skeleton_lord")
  const {getAnimationParams: getOrcLordParams, animationConfig: orcLordConfig, setCurrentAction: setOrcLordAction} = useCharacterAnimation("orc_lord")
  const {getAnimationParams: getDarkKnightParams, animationConfig: darkKnightConfig, setCurrentAction: setDarkKnightAction} = useCharacterAnimation("dark_knight")
  const {getAnimationParams: getPigLordParams, animationConfig: pigLordConfig, setCurrentAction: setPigLordAction} = useCharacterAnimation("pig_lord")
  
  const {getAnimationParams: getPigParams, animationConfig: pigConfig, setCurrentAction: setPigAction} = useCharacterAnimation("pig")
  const {getAnimationParams: getSkeletonParams, animationConfig: SkeletonConfig, setCurrentAction: setSkeletonAction} = useCharacterAnimation("skeleton")
  const {getAnimationParams: getOrcParams, animationConfig: OrcConfig, setCurrentAction: setOrcAction} = useCharacterAnimation("orc")
  
  const {getAnimationParams: getPlayerAnimationParams, animationConfig: PlayerAnimationConfig, setCurrentAction: setPlayerAnimationAction} = useCharacterAnimation("player", 'default', "default_1")

  
  const currentState = "walk"

  useEffect(() => {
    setEvilShogunAction(currentState)
    setOrcLordAction(currentState)
    setSkeletonLordAction(currentState)
    setDarkKnightAction(currentState)
    setPigLordAction(currentState)

    setPigAction(currentState)
    setSkeletonAction(currentState)
    setOrcAction(currentState)

    setPlayerAnimationAction("hurt")

  })
  
  return (
    <div>
      
    </div>
  )
}
