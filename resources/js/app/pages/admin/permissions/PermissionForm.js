import { TextField } from '@mui/material';
import {
  addPermission,
  updatePermission
} from 'app/redux/slices/permissionsSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const PermissionForm = ({ formId, type }) => {
  const { permission } = useSelector(state => state.permissions);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    if (type === 'add') {
      await dispatch(addPermission({ formData: data, setError }));
    } else {
      await dispatch(
        updatePermission({
          permissionId: permission.id,
          formData: data,
          setError
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        defaultValue={type !== 'add' ? permission.name : undefined}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 1 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        defaultValue={type !== 'add' ? permission.guard_name : undefined}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 1 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default PermissionForm;
