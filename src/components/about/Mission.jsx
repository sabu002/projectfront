import React from 'react'

function Mission() {
  const mission=[
    {
      head:'Freshness',
      para:'We ensure that only the freshest products are aavailable.'
    },
    {
      head:'Quality',
      para:' Every product undergoes stringent quality checks to meet our high standards'
    },
    {
      head:'Customer Satisfaction',
      para:'Our priority is ensuring that every customer is happy with their shopping experience'
    },
    {
      head:'Sustainability',
      para:'We support eco-friendly practices and work with local farmers'
    }
  ]
  return (
    <div className='flex flex-col items-center bg-[#f9f9f4] mt-10 gap-12 py-10'>
      <div className='flex w-full items-center gap-3 flex-col'>
        <h1 className='lg:text-2xl  text-xl text-center font-bold'>Our Mission</h1>
        <p className=' font-semibold text-center text-[14px]  w-6/12 text-[#817f7f]'>
            At PSR Grocery Store, our mission is to make fresh, high-quality
            groceries easily accessible to everyone, promoting healthy living
            and sustainability.
          </p>
      </div>

      <div className='grid lg:grid-cols-4 gap-8 mx-12'>
        {
          mission.map((val,i)=>{
return(
  <div key={i} className='shadow-md bg-[#e1fded] flex justify-center items-center p-5 flex-col gap-2'>
    <h3 className=' text-[22px]  text-center font-semibold'>{val.head}</h3>
             <p className='text-[#787676] text-[13px]  font-semibold text-center'>
              {val.para}
            </p>
  </div>
)
          })
        }
        
      </div>
    </div>
  )
}

export default Mission