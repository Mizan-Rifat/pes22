import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const PermissionForm = ({ formId, permission, onFormSubmit }) => {
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
        defaultValue={permission?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 1 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Guard Name"
        variant="standard"
        defaultValue={permission?.guard_name}
        error={!!errors.guard_name}
        helperText={errors.guard_name?.message}
        sx={{ mt: 1 }}
        {...register('guard_name', { required: 'This field is required' })}
      />
    </form>
  );
};

export default PermissionForm;
