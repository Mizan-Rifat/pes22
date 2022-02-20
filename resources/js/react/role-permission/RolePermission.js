import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RolePermission = () => {
  const [permissions, setPermissions] = useState([]);
  const [userPermission, setUserPermission] = useState([]);
  const [adminPermission, setAdminPermission] = useState([]);

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setAdminPermission([...adminPermission, id]);
    } else {
      setAdminPermission(adminPermission.filter(item => item != id));
    }
  };

  const handleSubmit = async () => {
    const permissions = await axios.post('/api/role/permission', {
      role: 1,
      permission: adminPermission
    });
    console.log({ permissions });
    setAdminPermission(permissions.data.permissions.map(item => item.id));
  };
  useEffect(async () => {
    const permissions = await axios.get('/api/user/1/permission');
    setUserPermission(permissions.data);

    const adminPermissions = await axios.get('/api/role/1/permission');
    setAdminPermission(adminPermissions.data.map(item => item.id));

    const allPermissions = await axios.get('/api/permissions');
    setPermissions(allPermissions.data);

    const roles = await axios.get('/api/user/1/role');
    console.log({ roles });
  }, []);

  return (
    <div>
      <h4>User Permission</h4>
      <ul>
        {userPermission.map(permission => (
          <li>{permission.name}</li>
        ))}
      </ul>
      <h4>super admins permission</h4>
      {permissions.map(permission => (
        <>
          <input
            type="checkbox"
            id={`permission${permission.id}`}
            value={`${permission.id}`}
            checked={adminPermission.includes(permission.id)}
            onChange={e => handleChange(e, permission.id)}
          />
          <label for={`permission${permission.id}`}> {permission.name}</label>
          <br />
        </>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RolePermission;
