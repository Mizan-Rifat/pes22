import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteRole, fetchRole, showDialog } from 'app/redux/slices/rolesSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import RoleDialog from './RoleDialog';
import ActionToolbar from 'app/components/common/ActionToolbar';

const Role = () => {
  const { role: roleId } = useParams();

  const { role } = useSelector(state => state.roles);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
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
      }
    ];

    setData(data);
  }, [role]);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Role" color="primary" />
        <ActionToolbar justifyContent="flex-start">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            size="small"
            onClick={() => dispatch(showDialog())}
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
      </Paper>

      <RoleDialog title="Update role" type="update" />
    </>
  );
};

export default Role;
