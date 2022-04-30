import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { createTournament } from 'app/redux/slices/tournamentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import TournamentForm from './TournamentForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const TournamentAdd = () => {
  const { loading } = useSelector(state => state.tournaments);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async data => {
    console.log({ data });
    const res = await dispatch(createTournament({ formData: data })).unwrap();
    navigate(`/admin/tournaments/${res.id}`);
  };

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Tournament" color="primary" />
          <BackdropContainer loading={loading}>
            <ActionToolbar justifyContent="flex-start" />
            <TournamentForm
              formId="tournamentForm"
              onFormSubmit={handleSubmit}
            />
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                form="tournamentForm"
              >
                Submit
              </Button>
            </Box>
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default TournamentAdd;
