import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'

const AddPermission = () => {
    const [permissionstatus, setPermisisonstatus] = useState('')
    const [defaultRoute, setDefaultRoute] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/permission/add-permission', {permissionstatus})
            console.log('Permission has been added', response.data);
        } catch (error) {
            console.error('Error adding permission', error);   
        }
    }

  return (
    <div>
        <Navbar />
        <div className='ml-10 mt-5'>
            <Link to={'/admin'} className='flex gap-3 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                <p className='text-blue-500 font-medium hover:underline'>Go To Admin Page</p>
            </Link>
        </div>

        <div className='bg-gradient-to-t from-blue-100 rounded-lg w-[30%] h-72 mx-auto mt-20 border border-blue-200 shadow-lg'>
            <form onSubmit={handleSubmit}>
                <h1 className='font-medium text-3xl text-blue-400 text-center my-5'>Add Permission</h1>

                <div className='w-full flex flex-col px-8 gap-5'>
                    <input 
                    type="text" 
                    placeholder='Enter Permission Name' 
                    value={permissionstatus}
                    onChange={(e) => setPermisisonstatus(e.target.value)}
                    className='py-2 px-4 rounded-lg outline-none border border-blue-300 text-blue-500'/>

                    <input 
                    type="text" 
                    placeholder='Enter Route' 
                    value={defaultRoute}
                    onChange={(e) => setDefaultRoute(e.target.value)}
                    className='py-2 px-4 rounded-lg outline-none border border-blue-300 text-blue-500'/>
                </div>

                <button className='font-medium text-blue-500 bg-white w-48 mx-28 mt-8 py-2 rounded-lg shadow-md hover:bg-blue-400 hover:text-white duration-300'>
                    Add Permission
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddPermission