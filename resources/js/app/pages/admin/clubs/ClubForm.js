import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Switch,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Upload from '@mui/icons-material/Upload';
import { updateClub } from 'app/redux/slices/clubsSlice';

const ClubForm = ({ club }) => {
  const [logo, setLogo] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const handleFileChange = e => {
    setLogo(e.target.files[0]);
  };

  const onSubmit = async data => {
    const formData = new FormData();
    if (logo) {
      formData.append('logo', logo);
    }
    formData.append('name', data.name);
    formData.append('approved', data.approved);
    try {
      await dispatch(updateClub({ clubId: club.id, formData })).unwrap();
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
        defaultValue={club?.name}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mt: 3 }}
        {...register('name', { required: 'This field is required' })}
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
        sx={{ mt: 1.5, ml: 0 }}
      />

      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <FormLabel sx={{ mr: 2 }}>Logo :</FormLabel>
        <div>
          <Button
            variant="contained"
            component="label"
            size="small"
            startIcon={<Upload />}
            sx={{ mb: 2 }}
          >
            Upload image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {logo && (
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
                onClick={() => setLogo(null)}
                sx={{
                  height: 100,
                  width: 150,
                  cursor: 'pointer'
                }}
              >
                <img
                  src={URL.createObjectURL(logo)}
                  alt=""
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'contain', display: 'block' }}
                />
              </Badge>
            </Box>
          )}
        </div>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default ClubForm;
