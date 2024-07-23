import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import RoleModel from './Model/RoleModel';

const RoleDetailsPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const roleResponse = await axios.get('http://localhost:4000/role/');
      setRoles(roleResponse.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissionResponse = await axios.get('http://localhost:4000/permission/');
      setPermissions(permissionResponse.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const deleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/role/delete-role/${id}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
      console.log('Role deleted successfully');
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };


  const closeRoleModal = () => {
    setShowRoleModal(false);
    setSelectedRole(null);
  };

  const handleRoleUpdate = (updatedRole) => {
    setRoles((prevRoles) => prevRoles.map((role) => (role._id === updatedRole._id ? updatedRole : role)));
  };


  return (
    <div>
      <Navbar />
      <h1 className='ml-10 my-5 font-semibold text-2xl text-blue-400 underline'>
        Role Details Page
      </h1>

      <div className='mx-10 rounded-xl border border-blue-200'>
        <table className='bg-gradient-to-t from-blue-100 w-full rounded-xl shadow-md'>
          <thead className='text-blue-500 text-lg border-b border-blue-300'>
            <tr>
              <th>SR No.</th>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {roles.map((role, index) => (
              <tr key={role._id}>
                <td>{index + 1}</td>
                <td className='py-3'>{role.rolename}</td>
                <td className='py-3'>
                  {role.permissionId && role.permissionId.length > 0 ? (
                    role.permissionId.map(permissionId => {
                      const permission = permissions.find(permission => permission._id === permissionId);
                      return permission ? (
                        <span key={permission._id} className="permission">{permission.permissionstatus}</span>
                      ) : (
                        <span key={permissionId} className="permission">Unknown Permission</span>
                      );
                    })
                  ) : (
                    'No permissions assigned'
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEditRole(role)}
                    className='border border-blue-600 text-blue-600 p-1 rounded-lg shadow-md hover:bg-white/80 duration-300 font-medium mx-2'
                  >
                    Edit Role
                  </button>

                  <button onClick={() => deleteRole(role._id)}
                  className='border border-red-600 text-red-600 p-1 rounded-lg shadow-md hover:bg-red-200/80 duration-300 font-medium ml-2'>
                    Delete Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RoleModel show={showRoleModal} onClose={closeRoleModal} role={selectedRole} onUpdate={handleRoleUpdate} />
    </div>
  );
};

export default RoleDetailsPage;
