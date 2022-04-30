import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const TournamentForm = ({ formId, tournament, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  console.log({ errors });

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
        defaultValue={tournament?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name', { required: 'This field is required' })}
      />
      <FormControl variant="standard" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>Format</InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue={tournament?.format}
          {...register('format', { required: 'This field is required' })}
        >
          <MenuItem value="round_robin_league">Round Robin League</MenuItem>
          <MenuItem value="knockout">Knockout</MenuItem>
          <MenuItem value="round_robin_knockout">Round Robin Knockout</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>Leg</InputLabel>
        <Select
          fullWidth
          displayEmpty
          defaultValue={tournament?.leg}
          {...register('leg', { required: 'This field is required' })}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="number"
        label="Rounds"
        variant="standard"
        defaultValue={tournament?.rounds}
        error={!!errors.rounds}
        helperText={errors.rounds?.message}
        sx={{ mt: 2 }}
        {...register('rounds', { required: 'This field is required' })}
      />

      <FormControlLabel
        control={
          <Switch
            defaultChecked={Boolean(tournament?.active)}
            color="primary"
            {...register('active')}
          />
        }
        label="Active : "
        labelPlacement="start"
        sx={{ mt: 2, ml: 0 }}
      />
    </form>
  );
};

export default TournamentForm;
