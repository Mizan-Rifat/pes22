import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import {
  deleteTournament,
  fetchTournament
} from 'app/redux/slices/tournamentSlice';
import { snakeCaseToTitleCase } from 'app/config/utils';
import { Button, Grid, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import UpdateClubsDialog from './UpdateClubsDialog';
import { fetchClubs } from 'app/redux/slices/clubsSlice';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import PaperHeader from 'app/components/paper/PaperHeader';
import ActionToolbar from 'app/components/common/ActionToolbar';
import Edit from '@mui/icons-material/Edit';
import DetailsGrid from 'app/components/common/DetailsGrid';
import TournamentSidebar from './TournamentSidebar';

const Tournament = () => {
  const { tournament: tournamentId } = useParams();

  const { tournament } = useSelector(state => state.tournaments);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    await dispatch(deleteTournament(tournament.id)).unwrap();
    navigate(`/admin/tournaments`);
  };

  useEffect(() => {
    dispatch(fetchTournament(tournamentId));
  }, []);

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: tournament.id
      },
      {
        label: 'Tournament',
        value: tournament.name
      },
      {
        label: 'Slug',
        value: tournament.slug
      },
      {
        label: 'Format',
        value: snakeCaseToTitleCase(tournament.format || '')
      },
      {
        label: 'Rounds',
        value: tournament.rounds
      },
      {
        label: 'Leg',
        value: tournament.leg
      },
      {
        label: 'Active',
        value: tournament.active ? 'Yes' : 'No'
      },
      {
        label: 'Clubs',
        render: (
          <ul style={{ padding: '0 16px', margin: 0 }}>
            {tournament.clubs?.map(club => (
              <li key={club.id}>
                <Link
                  to={`/admin/clubs/${club.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {club.name}
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    ];

    setData(data);
  }, [tournament]);

  const actions = (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => setOpenDialog(true)}
    >
      Update Clubs
    </Button>
  );

  return (
    <>
      <BackToLIstButton onClick={() => navigate('/admin/tournaments')} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title={tournament.name} color="primary" />
        <ActionToolbar justifyContent="flex-start">
          {actions}
          <Button
            variant="outlined"
            startIcon={<Edit />}
            size="small"
            component={Link}
            to="edit"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            size="small"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ActionToolbar>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <TournamentSidebar />
          </Grid>
          <Grid item xs={12} md={10}>
            <Outlet />
            {/* <DetailsGrid data={data} fullColumn={true} /> */}
          </Grid>
        </Grid>
      </Paper>

      <UpdateClubsDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default Tournament;
