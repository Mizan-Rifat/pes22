import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { addPermission } from 'app/redux/slices/permissionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import PermissionForm from './PermissionForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const PermissionAdd = () => {
  const { loading } = useSelector(state => state.permissions);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async data => {
    const res = await dispatch(addPermission({ formData: data })).unwrap();
    navigate(`/admin/permissions/${res.id}`);
  };

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Permission" color="primary" />
          <BackdropContainer loading={loading}>
            <ActionToolbar justifyContent="flex-start" />
            <PermissionForm
              formId="permissionForm"
              onFormSubmit={handleSubmit}
            />
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                form="permissionForm"
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

export default PermissionAdd;
