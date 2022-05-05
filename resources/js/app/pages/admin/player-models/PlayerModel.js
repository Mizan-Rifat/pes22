import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import ShowLayout from 'app/layouts/admin/ShowLayout';
import {
  deletePlayerModel,
  fetchPlayerModel
} from 'app/redux/slices/playerModelsSlice';
import { Box } from '@mui/material';

const PlayerModel = () => {
  const { playerModel: playerModelId } = useParams();

  const { playerModel } = useSelector(state => state.playerModels);
  const confirm = useConfirmation();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    console.log('fsdf');
    await dispatch(deletePlayerModel(playerModel.id)).unwrap();
    navigate(`/admin/player-models`);
  };

  useEffect(() => {
    dispatch(fetchPlayerModel(playerModelId));
  }, []);

  console.log({ playerModel });

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: playerModel.id
      },
      {
        label: 'Player',
        value: playerModel.name,
        render: (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={playerModel.avatar} alt="" width={25} />
            <p style={{ margin: 0, marginLeft: 12 }}>{playerModel.name}</p>
          </Box>
        )
      },
      {
        label: 'Position',
        value: playerModel.position
      }
    ];

    setData(data);
  }, [playerModel]);

  return (
    <>
      <ShowLayout
        title="PlayerModel"
        data={data}
        handleDelete={handleDelete}
        backLink="/admin/player-models"
      />
    </>
  );
};

export default PlayerModel;
