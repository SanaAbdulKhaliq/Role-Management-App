import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import PermissionModel from './Model/PermissionModel';

const PermissionPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);


  const fetchPermissions = async () => {
    try {
      const permissionResponse = await axios.get('http://localhost:4000/permission/');
      setPermissions(permissionResponse.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const deletePermission = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/permission/delete-permission/${id}`);
      console.log('Permission deleted successfully');
    } catch (error) {
      console.error('Error deleting Permission:', error);
    }
  };

  const handleEditPermission = (permission) => {
    setSelectedPermission(permission);
    setShowPermissionModal(true);
  };

  const closePermissionModal = () => {
    setShowPermissionModal(false);
    setSelectedPermission(null);
  };

  const handlePermissionUpdate = (updatedPermission) => {
    setPermissions((prevPermissions) => prevPermissions.map((permission) => (permission._id === updatedPermission._id ? updatedPermission : permission)));
  };

  return (
    <div>
      <Navbar />
      <h1 className='ml-10 my-5 font-semibold text-2xl text-blue-400 underline'>
        Permission Details Page
      </h1>

      <div className='mx-10 rounded-xl border border-blue-200'>
        <table className='bg-gradient-to-t from-blue-100 w-full rounded-xl shadow-md'>
          <thead className='text-blue-500 text-lg border-b border-blue-300'>
            <tr>
              <th>SR No.</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {permissions.map((permission, index) => (
              <tr key={permission._id}>
                <td>{index + 1}</td>
                <td className='py-3'>
                  {permission.permissionstatus}
                </td>
                <td>
                  <button
                    onClick={() => {handleEditPermission(permission)}}
                    className='border border-blue-600 text-blue-600 p-1 rounded-lg shadow-md hover:bg-white/80 duration-300 font-medium'
                  >
                    Edit Permissions
                  </button>

                  <button onClick={() => deletePermission(permission._id)}
                  className='border border-red-600 text-red-600 p-1 rounded-lg shadow-md hover:bg-red-200/80 duration-300 font-medium ml-2'>
                    Delete Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PermissionModel show={showPermissionModal} onClose={closePermissionModal} permission={selectedPermission} onUpdate={handlePermissionUpdate} />
    </div>
  );
};

export default PermissionPage;
