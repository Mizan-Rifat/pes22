import { TextField } from '@mui/material';
import { updateRole } from 'app/redux/slices/rolesSlice';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const RoleForm = ({ formId, type }) => {
  const { role, pending } = useSelector(state => state.roles);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const createRole = () => {
    useDispatch;
    console.log('createing');
  };

  const onSubmit = async data => {
    if (type === 'add') {
      createRole();
    } else {
      dispatch(updateRole({ roleId: role.id, formData: data, setError }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        defaultValue={type !== 'add' ? role.name : ''}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 1 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        defaultValue={type !== 'add' ? role.guard_name : ''}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 1 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default RoleForm;
