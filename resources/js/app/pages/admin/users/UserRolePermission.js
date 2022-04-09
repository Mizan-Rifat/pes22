import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import { fetchRoles, updateUserRoles } from 'app/redux/slices/rolesSlice';
import {
  fetchPermissions,
  updateUserPermissions
} from 'app/redux/slices/permissionsSlice';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';

const UserRolePermission = ({ title, data, loading }) => {
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    watch,
    formState: { errors }
  } = useForm();
  const { user } = useSelector(state => state.users);
  const confirm = useConfirmation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async data => {
    console.log({ data });

    try {
      await confirm({
        variant: 'warning',
        description: `Are you sure you want to update user ${title}?`
      });
      if (title === 'Roles') {
        await dispatch(
          updateUserRoles({
            formData: { user: user.id, role: data.roles },
            setError
          })
        );
      }
      if (title === 'Permissions') {
        await dispatch(
          updateUserPermissions({
            formData: { user: user.id, permission: data.roles },
            setError
          })
        );
      }
    } catch (error) {}
    // await dispatch(updateUser({ userId: user.id, formData: data, setError }));
  };

  useEffect(async () => {
    dispatch(fetchPermissions()).unwrap();
    dispatch(fetchRoles()).unwrap();
  }, []);

  return (
    !loading && (
      <Box
        sx={{
          p: 2,
          borderBottom: theme => `1px solid ${theme.palette.grey[300]}`
        }}
      >
        <p style={{ fontWeight: 400 }}>{title}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container sx={{ mb: 2 }}>
            {data.map(item => (
              <Grid item md={3} key={item.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={user[title.toLowerCase()]?.some(
                        value => value.id == item.id
                      )}
                      size="small"
                      value={item.id}
                      {...register(title.toLowerCase())}
                    />
                  }
                  label={item.name}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              size="small"
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    )
  );
};

export default UserRolePermission;
