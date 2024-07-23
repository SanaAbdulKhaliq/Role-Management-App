import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios';

const RegisterPage = () => {

  const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const signup = async (e) => {
      e.preventDefault();
      console.log('----');
      const {username, email, password} = data
      // console.log(name, email, password);


      try {
        const {data} = await axios.post('http://localhost:4000/user/register', {
          username, email, password
        })
        console.log("---??",!data.error)
        if (data.error) {
console.log("in error")
          toast.error(data.error)
        } else {
          setData({})
          toast.success('Registration successful')
          navigate('/login')
        }
      } catch (error) {
        console.log('signup error',error);
      }
  }

  return (
    <div className='bg-blue-200 w-96 h-[65%] pb-8 relative top-32 left-[35%] rounded-2xl shadow-lg'>
        <h1 className='text-white font-semibold text-3xl text-center py-5' >Register</h1>

        <form onSubmit={signup} className='mx-5 mt-8'>
            <input type="text" 
            placeholder='Enter Your Name'
            value={data.username}
            onChange={(e) => setData({...data, username: e.target.value})} 
            className='w-full py-2 px-4 rounded-xl outline-none text-blue-800 mb-5 shadow-md'/>

            <input 
            type="email" 
            placeholder='Enter Your Email'
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})} 
            className='w-full py-2 px-4 rounded-xl outline-none text-blue-800 mb-5 shadow-md'/>

            <input 
            type="password" 
            placeholder='Enter Your Password'
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})} 
            className='w-full py-2 px-4 rounded-xl outline-none text-blue-800 mb-5 shadow-md'/>

            <button type='submit' className='bg-white py-2 w-32 font-semibold text-blue-800 rounded-xl shadow-md mt-5 flex mx-auto justify-center hover:bg-blue-500 hover:text-white duration-300 hover:-translate-y-2'>
                Signup
            </button>
        </form>

        <div className='mx-5 mt-4 text-sm text-white'>
            <p>Already have an account. <Link to={'/'} className='text-[16px] font-semibold hover:text-blue-700 duration-300 hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage