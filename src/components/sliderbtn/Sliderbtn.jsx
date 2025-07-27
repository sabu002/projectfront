import React from 'react'

function Sliderbtn({onClick,active}) {
  return (
    <div className=' '>
   <button className={`w-3 h-3 rounded-full  mx-1 ${active ? 'bg-primary':'bg-white border border-gray-500'}`} onClick={onClick}></button>
    </div>
  )
}

export default Sliderbtn