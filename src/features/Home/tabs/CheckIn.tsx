import React from 'react'
import SpriteSheet from '../../../components/SpriteSheet'

export default function CheckIn() {
  return (
    <div>
      <SpriteSheet
        src='src/assets/images/enemies/dark_knight.png'
        frameWidth={64}
        frameHeight={48}
        frameCount={7}
        frameRow={2}
        scale={3}
        loop={true}
        fps={10}
      />
      <SpriteSheet
        src='src/assets/images/enemies/pig_lord.png'
        frameWidth={64}
        frameHeight={48}
        frameCount={6}
        frameRow={2}
        scale={3}
        loop={true}
        fps={8}
      />
    </div>
  )
}
