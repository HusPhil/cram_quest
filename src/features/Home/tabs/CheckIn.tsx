import React, { useEffect } from 'react'
import SpriteSheet from '../../../components/SpriteSheet'
import useFightAnimation from '../../../hooks/useFightAnimation'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import { characterAssets } from '../../Battle/configs/animationConfig'

export default function CheckIn() {
  const {getAnimationParams: getEvilShogunParams, animationConfig: evilShogunConfig, setCurrentAction: setEvilShogunAction} = useCharacterAnimation("evil_shogun")
  const {getAnimationParams: getSkeletonLordParams, animationConfig: skeletonLordConfig, setCurrentAction: setSkeletonLordAction} = useCharacterAnimation("skeleton_lord")
  const {getAnimationParams: getOrcLordParams, animationConfig: orcLordConfig, setCurrentAction: setOrcLordAction} = useCharacterAnimation("orc_lord")
  const {getAnimationParams: getDarkKnightParams, animationConfig: darkKnightConfig, setCurrentAction: setDarkKnightAction} = useCharacterAnimation("dark_knight")
  const {getAnimationParams: getPigLordParams, animationConfig: pigLordConfig, setCurrentAction: setPigLordAction} = useCharacterAnimation("pig_lord")
  
  const {getAnimationParams: getPigParams, animationConfig: pigConfig, setCurrentAction: setPigAction} = useCharacterAnimation("pig")
  const {getAnimationParams: getSkeletonParams, animationConfig: SkeletonConfig, setCurrentAction: setSkeletonAction} = useCharacterAnimation("skeleton")
  const {getAnimationParams: getOrcParams, animationConfig: OrcConfig, setCurrentAction: setOrcAction} = useCharacterAnimation("orc")

  
  const currentState = "attack"

  useEffect(() => {
    setEvilShogunAction(currentState)
    setOrcLordAction(currentState)
    setSkeletonLordAction(currentState)
    setDarkKnightAction(currentState)
    setPigLordAction(currentState)

    setPigAction(currentState)
    setSkeletonAction(currentState)
    setOrcAction(currentState)
  })
  
  return (
    <div>
      <div className='flex'>
        <SpriteSheet
          src={getEvilShogunParams().characterAsset}
          frameCount={getEvilShogunParams().frameCount}
          frameRow={getEvilShogunParams().row}
          fps={getEvilShogunParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getOrcLordParams().characterAsset}
          frameCount={getOrcLordParams().frameCount}
          frameRow={getOrcLordParams().row}
          fps={getOrcLordParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getSkeletonLordParams().characterAsset}
          frameCount={getSkeletonLordParams().frameCount}
          frameRow={getSkeletonLordParams().row}
          fps={getSkeletonLordParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getDarkKnightParams().characterAsset}
          frameCount={getDarkKnightParams().frameCount}
          frameRow={getDarkKnightParams().row}
          fps={getDarkKnightParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getPigLordParams().characterAsset}
          frameCount={getPigLordParams().frameCount}
          frameRow={getPigLordParams().row}
          fps={getPigLordParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
      </div>
      <div className='flex'>
        <SpriteSheet
          src={getOrcParams().characterAsset}
          frameCount={getOrcParams().frameCount}
          frameRow={getOrcParams().row}
          fps={getOrcParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getPigParams().characterAsset}
          frameCount={getPigParams().frameCount}
          frameRow={getPigParams().row}
          fps={getPigParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
        <SpriteSheet
          src={getSkeletonParams().characterAsset}
          frameCount={getSkeletonParams().frameCount}
          frameRow={getSkeletonParams().row}
          fps={getSkeletonParams().fps}
          frameWidth={64}
          frameHeight={48}
          scale={2.5}
          loop={true}
        />
      </div>
    </div>
  )
}
