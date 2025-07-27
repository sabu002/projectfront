import React from 'react'
import { FaAngleLeft } from "react-icons/fa";
function CustomLeftArr({onClick}) {
  return (
    <div>
      <button className='absolute left-2 top-1/2 transform border p-2 rounded-full  shadow' onClick={onClick}>
<FaAngleLeft size={15}/>
      </button>
    </div>
  )
}

export default CustomLeftArr