import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteRole, fetchRole } from 'app/redux/slices/rolesSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import UserRolePermission from '../users/UserRolePermission';
import RolePermission from './RolePermission';

const Role = () => {
  const { role: roleId } = useParams();

  const { role, fetching, loading } = useSelector(state => state.roles);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deleteRole(role.id)).unwrap();
    navigate(`/admin/roles`);
  };

  useEffect(() => {
    dispatch(fetchRole(roleId));
  }, []);

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: role.id
      },
      {
        label: 'Name',
        value: role.name
      },
      {
        label: 'Guard Name',
        value: role.guard_name
      },
      {
        label: 'Permissions',
        render: (
          <ul style={{ padding: 0, margin: 0 }}>
            {role.permissions?.map(permission => (
              <li
                key={permission.name}
                style={{
                  listStylePosition: 'inside'
                }}
              >
                {permission.name}
              </li>
            ))}
          </ul>
        )
      }
    ];

    setData(data);
  }, [role]);

  return (
    <>
      <BackToLIstButton onClick={() => navigate('/admin/roles')} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Role" color="primary" />

        <BackdropContainer loading={fetching}>
          <ActionToolbar justifyContent="flex-start">
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              component={Link}
              to="edit"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<EditIcon />}
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ActionToolbar>
          <DetailsGrid data={data} fullColumn />
        </BackdropContainer>
      </Paper>
    </>
  );
};

export default Role;
