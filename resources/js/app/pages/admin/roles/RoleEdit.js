import React, { useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { deleteRole, fetchRole, updateRole } from 'app/redux/slices/rolesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import RoleForm from './RoleForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import RolePermission from './RolePermission';

const RoleEdit = () => {
  const { role: roleId } = useParams();

  const { role, fetching, loading } = useSelector(state => state.roles);
  const confirm = useConfirmation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deleteRole(role.id)).unwrap();
    navigate(`/admin/roles`);
  };

  const handleSubmit = async data => {
    await dispatch(updateRole({ roleId: role.id, formData: data })).unwrap();
  };

  useEffect(() => {
    if (roleId) {
      dispatch(fetchRole(roleId));
    }
  }, []);

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Role" color="primary" />
          <BackdropContainer
            loading={fetching || loading}
            hideContent={fetching}
          >
            <ActionToolbar justifyContent="flex-start">
              {roleId && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </ActionToolbar>
            <RoleForm
              formId="roleForm"
              onFormSubmit={handleSubmit}
              role={role}
            />
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
            <RolePermission
              title="Permissions"
              roleId={roleId}
              data={role.permissions || []}
              // loading={loading || fetching}
            />
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default RoleEdit;
