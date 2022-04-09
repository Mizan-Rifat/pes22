import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { addRole } from 'app/redux/slices/rolesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import RoleForm from './RoleForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const RoleAdd = () => {
  const { loading } = useSelector(state => state.roles);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async data => {
    const res = await dispatch(addRole({ formData: data })).unwrap();
    navigate(`/admin/roles/${res.id}`);
  };

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Role" color="primary" />
          <BackdropContainer loading={loading}>
            <ActionToolbar justifyContent="flex-start" />
            <RoleForm formId="roleForm" onFormSubmit={handleSubmit} />
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                form="roleForm"
              >
                Submit
              </Button>
            </Box>
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default RoleAdd;
