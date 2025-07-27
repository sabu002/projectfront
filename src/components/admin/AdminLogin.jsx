import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import api from '../../API/axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { isAdmin, setIsAdmin } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/admin/login', { email, password },{withCredentials:true});
      if (data.success) {
        setIsAdmin(true);
        navigate('/admin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  return !isAdmin && (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
          <p className='text-2xl font-medium m-auto'><span className='text-primary'>Admin</span> Login</p>
          
          <div className='w-full'>
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              required
            />
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              required
            />
          </div>

          <button type="submit" className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
