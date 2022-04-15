import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import { fetchClub } from 'app/redux/slices/clubsSlice';
import dayjs from 'dayjs';

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
    // await dispatch(deletePermission(club.id)).unwrap();
    // navigate(`/admin/permissions`);
  };

  useEffect(() => {
    dispatch(fetchClub(clubId));
  }, []);

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: club.id
      },
      {
        label: 'Club',
        value: club.name
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
    <ShowLayout
      title="Club"
      data={data}
      handleDelete={handleDelete}
      backLink="/admin/clubs"
    />
  );
};

export default Club;
