import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import api from '../API/axios';
const Login = () => {
    const{setShowUserLogin, setUser}= useAppContext();
    const navigate=useNavigate();
      const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async(event) =>{
          event.preventDefault();
        if (state === "register") {
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
    if (!usernameRegex.test(name)) {
      return toast.error("Username must start with a letter and contain only letters and numbers.");
    }
  }
    // Email validation for both login and registration
  const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return toast.error("Please enter a valid email address.");
  }
       try{
         event.preventDefault()
         const {data} = await api.post(`/user/${state}`,{name,email,password});
         if(data.success){
            navigate('/')
            setUser(data.user)
              setShowUserLogin(false)
         }else{
            toast.error(data.message)
         }
       }catch(error){
         toast.error(error.message)
       }

        
      
    }
    
    return (
    <div onClick={()=>setShowUserLogin(false)}  className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>
       <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()}  className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
               
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
           <div className="forget-password">
      <button
        type="button"
        className="text-primary hover:underline"
        onClick={() => {
          setShowUserLogin(false);          // close modal
          navigate("/forgetpassword");     // go to page
        }}
      >
        Forgot Password?
      </button>
    </div>

            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form> 
    </div>
  )
}

export default Login