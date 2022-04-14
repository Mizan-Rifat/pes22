import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteUser, fetchUser } from 'app/redux/slices/usersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const User = () => {
  const { user: userId } = useParams();

  const { user, fetching: userfetching } = useSelector(state => state.users);

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
    dispatch(fetchUser(userId));
  }, []);

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
        value: user.roles.map(role => role.name).join(', ')
      },
      user.permissions && {
        label: 'Permissions',
        render: (
          <ul style={{ padding: 0, margin: 0 }}>
            {user.permissions?.map(permission => (
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

    setData(data.filter(item => item));
  }, [user]);

  return (
    <>
      <BackToLIstButton onClick={() => navigate('/admin/users')} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="User" color="primary" />
        <BackdropContainer hideContent loading={userfetching}>
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

export default User;
