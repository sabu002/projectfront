 import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { CiHome } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

function Contactform() {
  const form = [
    { title: "username", type: 'text' },
    { title: 'email', type: 'email' },
    { title: "number", type: 'number'}

  ]

    const schema=Yup.object().shape({
  username:Yup.string().min(3, 'Username must be at least 3 characters')
      .max(15, 'Username must be 15 characters or less')
      .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores are allowed')
      .required('Username is required'),
      email:Yup.string() 
      .email("Invalid email format")
      .required("Email is required"),
      number:Yup.string() 
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
       message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message cannot exceed 500 characters"),
    })


  return (
    <div className='items-center w-full  mx-auto py-18 flex flex-col gap-7'>
      <div className='text-2xl font-bold'>
        <h1>Get In Touch</h1>
      </div>
      <div className='flex  gap-5'>

      <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
          <div className=''>
            <CiHome className='text-primary' />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-[14px] font-semibold text-primary'>SainaMaina-1,Ranibagiya</h1>
            <p className='text-gray-700 text-[13px]'>4343 tinkunechowk</p>
          </div>
        </div>
        <div className='flex gap-5'>
          <div>
            <FaPhone className='text-primary' />
          </div>
          <div>
            <h1  className='text-[14px] font-semibold text-primary'>9803456723</h1>
            <p className='text-gray-700 text-[13px]'>Sun to Sat 7am to 7pm</p>
          </div>
        </div>
             <div className='flex gap-5'>
          <div>
           <MdOutlineEmail  className='text-primary'/>
          </div>
          <div>
            <h1  className='text-[14px] font-semibold text-primary'>abc@gmail.com</h1>
            <p  className='text-gray-700 text-[13px]'>Send us your query anytime</p>
          </div>
        </div>
      </div>
      <Formik initialValues={{
  username:'',
email:"",
number:"",
message:'',
}
}
onSubmit={(values)=>{
  console.log(values)
}}
validationSchema={schema}
    >
{({})=>{
  return(
  <Form className=' flex flex-col shadow-md py-11 bg-[#f8f9f7] px-6 gap-6 '>
    <div className='flex  gap-5'>
    <div className='flex flex-col gap-3'>
    {
      form.map((val,i)=>{
return(
  <div key={i} className='flex flex-col gap-1'>
{/* <label htmlFor={val.title} className='text-base font-semibold capitalize'>{val.title}</label> */}
<Field className="border px-4 py-2 text-[12px] font-semibold w-82 border-gray-500 outline-none " placeholder={val.title}  name={val.title} type={val.type}/>


<ErrorMessage className='text-red-700' component={'span'} name={val.title} />
  </div>
)
      })
    }
    {/* <label htmlFor="message" className='text-base font-semibold capitalize'>Message</label> */}
    </div>
<textarea placeholder='message' className='border px-4 py-2 text-[12px] font-semibold w-82 border-gray-500 outline-none  '></textarea>
    </div>

    <div type='submit' className=' px-4.5 py-2 w-fit rounded bg-primary-dull text-white font-semibold hover:bg-transparent hover:text-primary hover:border transition-all duration-200 ease-in-out'>Submit</div>
  </Form>
  )
}}
</Formik>
      </div>
 <div style={{ width: '100%', height: '450px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4347.407688203672!2d83.46669502045178!3d27.710900360955353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399686f71446a4b1%3A0x712e7c86b3c8d75!2sButwal%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1753435157580!5m2!1sen!2snp"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Butwal Multiple Campus Location"
      ></iframe>
    </div>
    </div>
  )
}

export default Contactform