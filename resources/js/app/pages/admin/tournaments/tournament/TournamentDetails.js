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

const TournamentDetails = () => {
  const { tournament } = useSelector(state => state.tournaments);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
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

  return (
    <>
      <DetailsGrid data={data} fullColumn={true} />
    </>
  );
};

export default TournamentDetails;
