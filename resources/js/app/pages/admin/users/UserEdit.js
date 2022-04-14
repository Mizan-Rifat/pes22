import React, { useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteUser, fetchUser } from 'app/redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import { fetchRoles } from 'app/redux/slices/rolesSlice';
import UserBasicForm from './UserBasicForm';
import UserRoleForm from './UserRoleForm';

const UserEdit = () => {
  const { user: userId } = useParams();

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
            <UserBasicForm user={user} />
            <UserRoleForm user={user} roles={roles} />
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default UserEdit;
