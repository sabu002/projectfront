import React from 'react'

import { FaLongArrowAltRight } from "react-icons/fa";
function BannerReuse({ title, image }) {
  return (
    <div className='relative'>
      <img src={image} className='top-0 left-0 right-0 h-86 w-full object-cover object-left-top absolute' />
      <div className='relative z-10  pt-10 h-86 flex flex-col gap-3 items-center justify-center '>
        <div className='text-2xl font-bold'>{title}</div>
        <div className='flex text-[18px] gap-3 items-center font-semibold'>
          <div>Home</div>
          <div className='text-[15px]'>
            <FaLongArrowAltRight />
          </div>
          <div>{title}</div>
        </div>
      </div>
    </div>
  )
}

export default BannerReuse