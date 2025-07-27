import React from 'react'
import { FaAngleRight } from "react-icons/fa";

function CustomRightArr({onClick}) {
  return (
    <div className=''>
        <button className='absolute right-2 top-1/2 transform border   p-2 rounded-full  shadow' onClick={onClick}>
      <FaAngleRight size={15}/>
            </button>
    </div>
  )
}

export default CustomRightArr