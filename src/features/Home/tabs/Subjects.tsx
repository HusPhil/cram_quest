import React from 'react'
import RpgCard from '../../../components/RpgCard'
import RankRibbonRpg from '../../../components/RankRibbonRpg'



export default function Subjects() {
  return (
    <div className="py-5 flex flex-1 h-full justify-center lg:max-w-5xl">
      <RpgCard className='flex-1'>
        Subject
        <RankRibbonRpg text='NOOBIE' color='silver' className='w-full flex-1'/>
        
      </RpgCard>
    </div>
  )
}
