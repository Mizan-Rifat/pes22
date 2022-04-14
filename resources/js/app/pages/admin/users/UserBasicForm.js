import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { updateUser } from 'app/redux/slices/usersSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const UserBasicForm = ({ user }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    try {
      await dispatch(updateUser({ userId: user.id, formData: data })).unwrap();
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default UserBasicForm;
