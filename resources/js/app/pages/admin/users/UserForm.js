import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import { updateUser } from 'app/redux/slices/usersSlice';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const UserForm = ({ formId, type, roles, permissions }) => {
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    watch,
    formState: { errors }
  } = useForm();

  const selectedRoles = watch('roles');
  const selectedPermissions = watch('permissions');

  console.log({ selectedRoles });

  const onSubmit = async data => {
    console.log({ data });
    // await dispatch(updateUser({ userId: user.id, formData: data, setError }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        defaultValue={type !== 'add' ? user.name : undefined}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 1 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        type="email"
        label="Email"
        variant="standard"
        defaultValue={type !== 'add' ? user.email : undefined}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mt: 1 }}
        {...register('email', { required: 'This field is required' })}
      />

      <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
        <InputLabel>Roles</InputLabel>
        <Select
          multiple
          defaultValue={user.roles}
          renderValue={selected => selected.map(item => item.name).join(', ')}
          {...register('roles', { value: user.roles })}
        >
          {roles.map(role => (
            <MenuItem key={role.name} value={role}>
              <Checkbox
                size="small"
                value={role.id}
                checked={selectedRoles?.some(item => item.id === role.id)}
              />
              <ListItemText primary={role.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
        <InputLabel>Permissions</InputLabel>
        <Select
          multiple
          defaultValue={user.permissions}
          renderValue={selected => selected.map(item => item.name).join(', ')}
          {...register('permissions', { value: user.permissions })}
        >
          {permissions.map(permission => (
            <MenuItem key={permission.name} value={permission}>
              <Checkbox
                size="small"
                checked={selectedPermissions?.some(
                  item => item.id === permission.id
                )}
              />
              <ListItemText primary={permission.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default UserForm;
