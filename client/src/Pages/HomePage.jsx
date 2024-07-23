import React from 'react'
import Navbar from '../Components/Navbar'
import useUser from '../Hooks/useUser'



const HomePage = () => {

  const {user} = useUser()
  console.log( 'user',user);


  return (
    <div>
      <Navbar />

      <div className='bg-gradient-to-tr from-blue-200 h-72 w-[35%] flex mx-auto my-24 rounded-2xl border border-blue-200 shadow-md flex-col text-center gap-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-500'>
        <h1 className='mt-20 text-3xl font-semibold text-blue-400'>Welcome to the Home Page</h1>
        <h2 className='text-2xl text-gray-600 font-semibold'>Hello {user?.username}</h2>
      </div>
    </div>
  )
}

export default HomePage