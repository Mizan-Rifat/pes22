import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import {
  deletePermission,
  fetchPermission
} from 'app/redux/slices/permissionsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';

const Permission = () => {
  const { permission: permissionId } = useParams();

  const { permission } = useSelector(state => state.permissions);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deletePermission(permission.id)).unwrap();
    navigate(`/admin/permissions`);
  };

  useEffect(() => {
    dispatch(fetchPermission(permissionId));
  }, []);

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: permission.id
      },
      {
        label: 'Name',
        value: permission.name
      },
      {
        label: 'Guard Name',
        value: permission.guard_name
      }
    ];

    setData(data);
  }, [permission]);

  return (
    <>
      <BackToLIstButton onClick={() => navigate('/admin/permissions')} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Permission" color="primary" />
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
      </Paper>
    </>
  );
};

export default Permission;
