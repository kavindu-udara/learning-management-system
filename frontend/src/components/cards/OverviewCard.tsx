import React from 'react'

type Props = {
  title: string,
  count: number
}

const OverviewCard:React.FC<Props> = ({title, count} : Props) => {
  return (
    <div className='rounded-[21px] bg-secondary-color w-[215px] h-[135px] p-5'>
        <div className='text-xl font-bold text-dark-acent-color'>{title}</div>
        <div className='text-3xl font-bold mt-3 text-primary-color'>{count}</div>
    </div>
  )
}

export default OverviewCard