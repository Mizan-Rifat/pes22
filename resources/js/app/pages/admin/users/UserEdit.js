import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteUser, fetchUser, showDialog } from 'app/redux/slices/usersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import UserDialog from './UserDialog';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';

const UserEdit = () => {
  const { user: userId } = useParams();

  const { user } = useSelector(state => state.users);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deleteUser(user.id)).unwrap();
    navigate(`/admin/users`);
  };

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: user.id
      },
      {
        label: 'Name',
        value: user.name
      },
      {
        label: 'Email',
        value: user.email
      },
      user.roles && {
        label: 'Roles',
        value: user.roles.join(', ')
      },
      user.permissions && {
        label: 'Permissions',
        value: user.permissions.map(permission => permission.name).join(', ')
      }
    ];

    setData(data.filter(item => item));
  }, [user]);

  return (
    <>
      <BackToLIstButton onClick={() => navigate('/admin/users')} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="User" color="primary" />
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

      <UserDialog title="Update user" type="update" />
    </>
  );
};

export default UserEdit;
