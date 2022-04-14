import { Box, Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import {
  deleteUser,
  fetchUser,
  showDialog,
  updateUser
} from 'app/redux/slices/usersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import UserForm from './UserForm';
import { fetchRoles } from 'app/redux/slices/rolesSlice';
import UserRole from './UserRole';
// import UserRolePermission from './UserRole';

const UserEdit = () => {
  const { user: userId } = useParams();

  console.log({ userId });

  const { user, fetching, loading } = useSelector(state => state.users);
  const { roles, fetching: rolesFetching } = useSelector(state => state.roles);
  const confirm = useConfirmation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deleteUser(user.id)).unwrap();
    navigate(`/admin/users`);
  };

  const handleSubmit = async data => {
    await dispatch(updateUser({ userId: user.id, formData: data })).unwrap();
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
    dispatch(fetchRoles());
  }, []);

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Role" color="primary" />
          <BackdropContainer
            loading={fetching || loading || rolesFetching}
            hideContent={fetching || rolesFetching}
          >
            <ActionToolbar justifyContent="flex-start">
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
            <UserForm
              formId="userForm"
              onFormSubmit={handleSubmit}
              user={user}
              roles={roles}
            />
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                form="userForm"
              >
                Submit
              </Button>
            </Box>
            <UserRole roles={roles} user={user} />
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default UserEdit;
