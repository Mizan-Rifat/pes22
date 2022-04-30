import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import {
  deleteTournament,
  fetchTournament
} from 'app/redux/slices/tournamentSlice';
import { snakeCaseToTitleCase } from 'app/config/utils';

const Tournament = () => {
  const { tournament: tournamentId } = useParams();

  const { tournament } = useSelector(state => state.tournaments);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

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
      }
    ];

    setData(data);
  }, [tournament]);

  return (
    <>
      <ShowLayout
        title="Tournament"
        data={data}
        handleDelete={handleDelete}
        backLink="/admin/tournaments"
      />
    </>
  );
};

export default Tournament;
