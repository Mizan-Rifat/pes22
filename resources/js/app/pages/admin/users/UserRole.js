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

const UserRole = ({ user, roles }) => {
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    watch,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = data => {
    console.log({ data });
  };

  return (
    <Box
      sx={
        {
          // p: 2,
          // borderBottom: theme => `1px solid ${theme.palette.grey[300]}`
        }
      }
    >
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
                    {...register('roles')}
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

export default UserRole;
