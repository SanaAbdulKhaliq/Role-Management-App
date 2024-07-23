import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useTokenStore from '../Hooks/useToken';
import useUser from '../Hooks/useUser';

const Navbar = () => {
  const navigate = useNavigate();
  const {setToken} = useTokenStore();
  const {user} = useUser()

  const handleLogout = async () => {
    try {
      setToken("");
      navigate('/')
      console.log('User has logged out');
    } catch (error) {
      console.log('Logout error', error);
    }
  }

  return (
    <div className='bg-gradient-to-t from-blue-200 border border-b-blue-300 px-5 py-6 rounded-b-2xl shadow-md h-20 flex justify-between text-gray-500 font-semibold'>
      <ul className='flex gap-8 ml-5'>
      {user?.permissions?.includes("Home Page")?
        <li>
          <Link to={'/'} className='hover:text-blue-500 duration-300'>Home</Link>
        </li> : null
      }

      {user?.permissions?.includes("Admin Page")?
      <li>
        <Link to={'/admin'} className='hover:text-blue-500 duration-300'>Admin Page</Link>
      </li> : null
      }

      {user?.permissions?.includes("User Details")?
        <li>
          <Link to={'/userdetails'} className='hover:text-blue-500 duration-300'>User Details Page</Link>
        </li> : null
      }
      
      {user?.permissions?.includes("Role Details")?
      <li>
        <Link to={'/roledetails'} className='hover:text-blue-500 duration-300'>Role Details Page</Link>
      </li> : null
      }

      {user?.permissions?.includes("Permission")?
      <li>
        <Link to={'/permission'} className='hover:text-blue-500 duration-300'>Permission Page</Link>
      </li> : null
      }
</ul>

      <div className='mr-5'>
        <Link to={'/'} onClick={handleLogout} className=' text-blue-500 py-2 px-4 text-center rounded-lg shadow-md border border-blue-200 hover:bg-blue-300 hover:text-white duration-300'>
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Navbar