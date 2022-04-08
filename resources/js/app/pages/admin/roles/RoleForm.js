import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { addRole, clearRole, updateRole } from 'app/redux/slices/rolesSlice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoleForm = ({ formId, role, onFormSubmit }) => {
  const {
    register,

    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    try {
      await onFormSubmit(data);
    } catch (error) {
      console.log({ error });
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(error => {
          setError(error, {
            type: 'manual',
            message: errors[error]
          });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        defaultValue={role?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 2 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        defaultValue={role?.guard_name}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 2 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default RoleForm;
