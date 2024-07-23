import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AdminPage from './Pages/AdminPage';
import UserDetailsPage from './Pages/UserDetailsPage';
import RoleDetailsPage from './Pages/RoleDetailsPage';
import { Toaster } from 'react-hot-toast';
import useTokenStore from './Hooks/useToken';
import { useEffect } from 'react';
import useUser from './Hooks/useUser';
import { jwtDecode } from 'jwt-decode';
import AddPermission from './Pages/AddPermission';
import AddRole from './Pages/AddRole';
import PermissionPage from './Pages/PermissionPage';


function App() {

  const navigate = useNavigate()
  const {token , setToken} = useTokenStore();
  const {user, setUser} = useUser();

  useEffect(() => {
    if(token)
      {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser)
        navigate(decodedUser.defaultRoute || '/')
        console.log(decodedUser);
      }else{
        setUser("")
      }
   
  }, [token])

  return (

    <>
      <Toaster />
      {user ? 
        <Routes>
        {user?.permissions?.includes("Home Page")?<Route path='/' element={<HomePage />} />:null}
        {user?.permissions?.includes("Admin Page")?<Route path='/admin' element={<AdminPage />} />:null}
         {user?.permissions?.includes("Add Permission")?<Route path='/admin/add-new-permission' element={<AddPermission />} />:null}
         {user?.permissions?.includes("Add Role")?<Route path='/admin/add-new-role' element={<AddRole />} />:null}
         {user?.permissions?.includes("User Details")?<Route path='/userdetails' element={<UserDetailsPage />} />:null}
         {user?.permissions?.includes("Role Details")?<Route path='/roledetails' element={<RoleDetailsPage />} />:null}
         {user?.permissions?.includes("Permission")?<Route path='/permission' element={<PermissionPage />} />:null}
      </Routes>
        :
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      }
    </>
  );
}

export default App;
