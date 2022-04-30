import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import { deleteClub, fetchClub } from 'app/redux/slices/clubsSlice';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

const Club = () => {
  const { club: clubId } = useParams();

  const { club } = useSelector(state => state.clubs);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    console.log('fsdf');
    await dispatch(deleteClub(club.id)).unwrap();
    navigate(`/admin/clubs`);
  };

  useEffect(() => {
    dispatch(fetchClub(clubId));
  }, []);

  console.log({ club });

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: club.id
      },
      {
        label: 'Club',
        value: club.name,
        render: (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={club.logo} alt="" width={25} />
            <p style={{ margin: 0, marginLeft: 12 }}>{club.name}</p>
          </Box>
        )
      },
      {
        label: 'Owner',
        render: (
          <Link
            style={{ textDecoration: 'none' }}
            to={`/admin/users/${club?.owner?.id}`}
          >
            {club?.owner?.name}
          </Link>
        )
      },
      {
        label: 'Slug',
        value: club.slug
      },
      {
        label: 'Established',
        value: dayjs(club.establishedIn).format('DD MMM, YYYY')
      },
      {
        label: 'Approved',
        value: club.approved ? 'Yes' : 'No'
      }
    ];

    setData(data);
  }, [club]);

  return (
    <>
      <ShowLayout
        title="Club"
        data={data}
        handleDelete={handleDelete}
        backLink="/admin/clubs"
      />
    </>
  );
};

export default Club;
