import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from 'app/components/dialog/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import { useForm } from 'react-hook-form';
import { updateTournamentClubs } from 'app/redux/slices/tournamentSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateClubsDialog = ({ open, setOpen }) => {
  const { register, handleSubmit } = useForm();
  const { tournament, loading } = useSelector(state => state.tournaments);
  const dispatch = useDispatch();
  const { clubs, fetching } = useSelector(state => state.clubs);

  const onSubmit = async data => {
    dispatch(
      updateTournamentClubs({ tournamentId: tournament.id, formData: data })
    );
  };
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Update clubs"
      onSubmit={handleSubmit(onSubmit)}
      submitBtnText="Update"
    >
      <BackdropContainer loading={fetching || loading} hideContent={fetching}>
        <Grid container spacing={3}>
          {clubs.map(club => (
            <Grid item xs={12} sm={6} md={3} key={club.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={tournament.clubs?.some(
                      value => value.id == club.id
                    )}
                    size="small"
                    value={club.id}
                    {...register('clubs')}
                  />
                }
                label={club.name}
              />
            </Grid>
          ))}
        </Grid>
      </BackdropContainer>
    </Dialog>
  );
};

export default UpdateClubsDialog;
