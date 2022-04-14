import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserRoles } from 'app/redux/slices/rolesSlice';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';

const UserRoleForm = ({ user, roles }) => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async data => {
    if (!Array.isArray(data.roles)) {
      data.roles = [data.roles];
    }
    console.log({ data });
    await dispatch(
      updateUserRoles({ formData: { user: user.id, ...data } })
    ).unwrap();
  };

  return (
    <Box>
      <p style={{ fontWeight: 400 }}>Roles</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mb: 2 }}>
          {roles.map(item => (
            <Grid item md={3} key={item.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={user.roles?.some(
                      value => value.id == item.id
                    )}
                    size="small"
                    value={item.id}
                    {...register('role')}
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
  );
};

export default UserRoleForm;
