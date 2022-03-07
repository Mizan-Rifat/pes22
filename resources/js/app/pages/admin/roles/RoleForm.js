import { TextField } from '@mui/material';
import { addRole, updateRole } from 'app/redux/slices/rolesSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const RoleForm = ({ formId, type }) => {
  const { role } = useSelector(state => state.roles);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    if (type === 'add') {
      await dispatch(addRole({ formData: data, setError }));
    } else {
      await dispatch(updateRole({ roleId: role.id, formData: data, setError }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        defaultValue={type !== 'add' ? role.name : undefined}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 1 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        defaultValue={type !== 'add' ? role.guard_name : undefined}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 1 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default RoleForm;
