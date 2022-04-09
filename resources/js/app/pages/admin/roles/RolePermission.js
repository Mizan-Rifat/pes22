import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import { updateRolePermissions } from 'app/redux/slices/rolesSlice';
import { fetchPermissions } from 'app/redux/slices/permissionsSlice';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';

const RolePermission = ({ roleId, title, data, loading }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();
  const { permissions } = useSelector(state => state.permissions);
  const confirm = useConfirmation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async data => {
    console.log({ data });

    try {
      await confirm({
        variant: 'warning',
        description: `Are you sure you want to update role's permissions?`
      });

      await dispatch(
        updateRolePermissions({
          formData: { role: roleId, permission: data },
          setError
        })
      );
    } catch (error) {}
  };

  useEffect(async () => {
    dispatch(fetchPermissions()).unwrap();
  }, []);

  return (
    !loading && (
      <Box>
        <p style={{ fontWeight: 400 }}>{title}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container sx={{ mb: 2 }}>
            {permissions.map(item => (
              <Grid item md={3} key={item.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={data?.some(value => value.id == item.id)}
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

export default RolePermission;
