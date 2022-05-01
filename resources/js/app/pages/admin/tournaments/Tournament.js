import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import {
  deleteTournament,
  fetchTournament
} from 'app/redux/slices/tournamentSlice';
import { snakeCaseToTitleCase } from 'app/config/utils';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import UpdateClubsDialog from './UpdateClubsDialog';
import { fetchClubs } from 'app/redux/slices/clubsSlice';

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
    dispatch(fetchClubs());
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
      <ShowLayout
        title="Tournament"
        data={data}
        handleDelete={handleDelete}
        backLink="/admin/tournaments"
        actions={actions}
      />

      <UpdateClubsDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default Tournament;
