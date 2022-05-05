import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updatePlayerModel } from 'app/redux/slices/playerModelsSlice';

const PlayerModelBasicForm = ({ playerModel }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    console.log({ data });

    try {
      await dispatch(
        updatePlayerModel({ playerModelId: playerModel.id, formData: data })
      ).unwrap();
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
        defaultValue={playerModel?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 3 }}
        {...register('name', { required: 'This field is required' })}
      />
      <TextField
        fullWidth
        label="Position"
        variant="standard"
        defaultValue={playerModel?.position}
        error={!!errors.position}
        helperText={errors.position?.message}
        sx={{ mt: 3 }}
        {...register('position', { required: 'This field is required' })}
      />

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default PlayerModelBasicForm;
