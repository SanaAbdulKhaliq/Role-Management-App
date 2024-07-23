import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios';

const UserDetailsPage = () => {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

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

  return (
    <div>
      <Navbar />
      <h1 className='ml-10 my-5 font-semibold text-2xl text-blue-400 underline'>
        User Details Page
      </h1>

      <div className='mx-10 rounded-xl border border-blue-200'>
        <table className='bg-gradient-to-t from-blue-100 w-full rounded-xl shadow-md'>
          <thead className='text-blue-500 text-lg border-b border-blue-300'>
            <tr>
              <th className='p-3'>User</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map(user => (
              <tr key={user._id}>
                <td className='py-3'>{user.username}</td>
                <td className='py-3'>{user.email}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDetailsPage