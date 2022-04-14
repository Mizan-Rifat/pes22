import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import { updateUser } from 'app/redux/slices/usersSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const UserForm = ({ formId, onFormSubmit, user, roles }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    if (!Array.isArray(data.roles)) {
      data.roles = [data.roles];
    }
    console.log({ data });
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
        defaultValue={user?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 2 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        type="email"
        label="Email"
        variant="standard"
        defaultValue={user?.email}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mt: 2 }}
        {...register('email', { required: 'This field is required' })}
      />
    </form>
  );
};

export default UserForm;
