import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:4000/user/');
      setUsers(userResponse.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const fetchRoles = async () => {
    try {
      const roleResponse = await axios.get('http://localhost:4000/role/');
      setRoles(roleResponse.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

  const fetchPermissions = async () => {
    try {
      const permissionResponse = await axios.get('http://localhost:4000/permission/');
      setPermissions(permissionResponse.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);


  const handleAddRole = async () => {
    try {
      const response = await axios.post('http://localhost:4000/user/add-role', {
        userId: selectedUser,
        roleId: selectedRole,
        permissions: selectedPermissions
      });
  
      console.log('Role and permissions added:', response.data);
  
      // Update local state after adding role and permissions
      fetchUsers();
    } catch (error) {
      console.error('Error adding role and permissions:', error);
    }
  }

  const handleAddPermission = async () => {
    try {
      // Ensure that required values are selected
      if (!selectedUser || !selectedPermissions.length) {
        console.error('User and permissions must be selected');
        return;
      }
  
      // Send POST request to add permissions
      const response = await axios.post('http://localhost:4000/user/add-permission', {
        userId: selectedUser,
        permissionId: selectedPermissions
      });
  
      console.log('Permissions added:', response.data);
  
      // Update local state after adding permissions
      fetchUsers();
    } catch (error) {
      console.error('Error adding permissions:', error);
    }
  };

  const handlePermissionChange = (event) => {
    const { options } = event.target;
    const selectedValues = [];
    for (const option of options) {
      if (option.selected) {
        selectedValues.push(option.value);
      }
    }
    setSelectedPermissions(selectedValues);
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-between items-center mr-10'>
      <h1 className='ml-10 my-5 font-semibold text-2xl text-blue-400 underline'>
        Admin Page
      </h1>

      <div className='flex gap-8'>
        <Link to={'/admin/add-new-role'} className='border border-blue-200 py-1 px-3 text-blue-400 font-medium rounded-md shadow-md hover:bg-blue-100 hover:text-blue-600'>
          Add New Role
        </Link>

        <Link to={'/admin/add-new-permission'} className='border border-blue-200 py-1 px-3 text-blue-400 font-medium rounded-md shadow-md hover:bg-blue-100 hover:text-blue-600'>
          Add New Permission
        </Link>
      </div>
      </div>

      <div className='mx-10 rounded-xl border border-blue-200'>
        <table className='bg-gradient-to-t from-blue-100 w-full rounded-xl shadow-md'>
          <thead className='text-blue-500 text-lg border-b border-blue-300'>
            <tr>
              <th className='p-3'>User</th>
              <th>Roles</th>
              <th>Permissions</th>
              <th>Add Role & Permission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map(user => (
              <tr key={user._id}>
                <td className='py-3'>{user.username}</td>
                <td className='py-3'>
                  {user.roleId && user.roleId.length > 0 ? (
                      user.roleId.map(roleId => {
                        const role = roles.find(role => role._id === roleId);
                        return role ? (
                          <span key={role._id} className="role">{role.rolename}</span>
                        ) : (
                          <span key={roleId} className="role">Unknown Role</span>
                        );
                      })
                    ) : (
                      'No roles assigned'
                    )}
                </td>
                <td className='py-3'>
                  {user.permissionId && user.permissionId.length > 0 ? (
                    user.permissionId.map(permissionId => {
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
                <td className='flex gap-2 py-3 justify-center'>
                  <select onChange={(e) => setSelectedRole(e.target.value)} className='rounded-md shadow-md border-none outline-none'>
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role._id} value={role._id}>{role.rolename}</option>
                    ))}
                  </select>
                  <select onChange={handlePermissionChange} className='rounded-md shadow-md border-none outline-none w-36'>
                    <option value="">Select Permission</option>
                    {permissions.map(permission => (
                      <option key={permission._id} value={permission._id}>
                        {permission.permissionstatus}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                <button onClick={() => setSelectedUser(user._id)} className='border border-blue-600 text-blue-600 p-1 rounded-lg shadow-md hover:bg-white/80 duration-300 font-medium'>
                  Select User
                </button>

                <button onClick={handleAddRole} className='border border-blue-600 text-blue-600 p-1 rounded-lg shadow-md hover:bg-white/80 duration-300 font-medium mx-2'>
                  Add Role
                </button>

                <button onClick={handleAddPermission} className='border border-blue-600 text-blue-600 p-1 rounded-lg shadow-md hover:bg-white/80 duration-300 font-medium'>
                  Add Permissions
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
