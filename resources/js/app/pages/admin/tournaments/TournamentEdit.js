import React, { useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import TournamentForm from './TournamentForm';
import {
  fetchTournament,
  updateTournament
} from 'app/redux/slices/tournamentSlice';

const TournamentEdit = () => {
  const { tournament: tournamentId } = useParams();

  const { tournament, fetching, loading } = useSelector(
    state => state.tournaments
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async data => {
    console.log({ data });
    await dispatch(
      updateTournament({ tournamentId: tournament.id, formData: data })
    ).unwrap();
  };

  useEffect(() => {
    if (tournamentId) {
      dispatch(fetchTournament(tournamentId));
    }
  }, []);

  return (
    <>
      <BackToLIstButton onClick={() => navigate(-1)} />

      <Box>
        <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
          <PaperHeader title="Role" color="primary" />
          <BackdropContainer
            loading={fetching || loading}
            hideContent={fetching}
          >
            <ActionToolbar justifyContent="flex-start" />
            <TournamentForm
              tournament={tournament}
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

export default TournamentEdit;
