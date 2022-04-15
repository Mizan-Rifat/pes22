import React from 'react';
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  TextField
} from '@mui/material';
import { updateUser } from 'app/redux/slices/usersSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const ClubForm = ({ club }) => {
  console.log({ club });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm();

  const logo = watch('logo');

  console.log({ logo });
  const onSubmit = async data => {
    try {
      // await dispatch(updateUser({ clubId: club.id, formData: data })).unwrap();
      console.log({ data });
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
        // defaultValue={club?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 2 }}
        {...register('name', { required: 'This field is required' })}
      />

      <TextField
        fullWidth
        label="Slug"
        variant="standard"
        defaultValue={club?.slug}
        error={!!errors.slug}
        helperText={errors.slug?.message}
        sx={{ mt: 2 }}
        {...register('slug', { required: 'This field is required' })}
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked={club?.approved}
            color="primary"
            {...register('approved')}
          />
        }
        label="Approved : "
        labelPlacement="start"
        sx={{ mt: 2, ml: 0 }}
      />
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <FormLabel>Logo:</FormLabel>
        </Grid>
        <Grid item xs="auto">
          <Box
            sx={{
              height: 100,
              width: 150,
              border: theme => `1px solid ${theme.palette.grey[400]}`,
              display: 'block'
            }}
          >
            <Badge
              color="error"
              badgeContent="x"
              sx={{
                height: 100,
                width: 150
                // border: theme => `1px solid ${theme.palette.grey[400]}`,
                // display: 'block'
              }}
            >
              <img
                src="http://localhost:8000/images/sidebar.jpg"
                alt=""
                width="100%"
                height="100%"
                style={{ objectFit: 'contain', display: 'block' }}
              />
            </Badge>
          </Box>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{ mt: 2 }}
          >
            Upload File
            <input type="file" hidden {...register('logo')} />
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default ClubForm;
