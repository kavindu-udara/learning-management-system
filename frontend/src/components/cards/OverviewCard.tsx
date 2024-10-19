import React from 'react'

type Props = {
  title: string,
  count: number
}

const OverviewCard:React.FC<Props> = ({title, count} : Props) => {
  return (
    <div className='rounded-2xl bg-[#EFF4FF] w-[215px] h-[135px] p-5'>
        <div className='text-xl font-bold text-[#2563EB]'>{title}</div>
        <div className='text-3xl font-bold mt-3'>{count}</div>
    </div>
  )
}

export default OverviewCard