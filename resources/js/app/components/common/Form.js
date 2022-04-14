import {
  Box,
  Button,
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

const Form = ({ onFormSubmit, children }) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Form;
