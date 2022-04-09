import React, { useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import {
  deletePermission,
  fetchPermission,
  updatePermission
} from 'app/redux/slices/permissionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import PermissionForm from './PermissionForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const PermissionEdit = () => {
  const { permission: permissionId } = useParams();

  console.log({ permissionId });

  const { permission, fetching, loading } = useSelector(
    state => state.permissions
  );
  const confirm = useConfirmation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deletePermission(permission.id)).unwrap();
    navigate(`/admin/permissions`);
  };

  const handleSubmit = async data => {
    await dispatch(
      updatePermission({ permissionId: permission.id, formData: data })
    ).unwrap();
  };

  useEffect(() => {
    if (permissionId) {
      dispatch(fetchPermission(permissionId));
    }
  }, []);

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Permission" color="primary" />
          <BackdropContainer loading={fetching} hideContent>
            <BackdropContainer loading={loading}>
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
              <PermissionForm
                formId="permissionForm"
                onFormSubmit={handleSubmit}
                permission={permission}
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
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default PermissionEdit;
