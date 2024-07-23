import axios from 'axios';
import React, { useState } from 'react';

const PermissionModel = ({ show, onClose, permission, onUpdate }) => {
  const [permissionStatus, setPermissionStatus] = useState(permission ? permission.permissionstatus : '');

  if (!show) return null;

  const handleInputChange = (e) => {
    setPermissionStatus(e.target.value);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/permission/update-permission/${id}`, {
        permissionstatus: permissionStatus,
      });
      console.log('Permission has been updated', response.data);
      onUpdate(response.data); // Call the onUpdate function to update the role list in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error in Permission updating', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[30%] h-60">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-500">Edit Permission</h2>
          <button onClick={onClose} className='mb-3 hover:translate-x-1 duration-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className='flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); handleSave(permission._id); }}>
          <input
            type="text"
            value={permissionStatus}
            onChange={handleInputChange}
            placeholder='Enter Permission'
            className='border border-blue-400 rounded-lg py-2 px-4 shadow-md'
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PermissionModel;
