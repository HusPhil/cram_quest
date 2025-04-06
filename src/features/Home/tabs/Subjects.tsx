import React from 'react'
import RpgCard from '../../../components/RpgCard'
import RankTitle from '../../../components/RankTitle'



export default function Subjects() {
  return (
    <div className='flex flex-1 h-full w-full'>
      <RpgCard className='flex-1'>
        Subject
        <RankTitle text='NOOBIE' color='silver' className='w-full flex-1'/>
        
      </RpgCard>
    </div>
  )
}
