import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from 'app/components/dialog/Dialog';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import PlayerModelAvatarForm from './PlayerModelAvatarForm';
import { updatePlayerAvatar } from 'app/redux/slices/playerModelsSlice';

const AvatarUploadDialog = ({ open, setOpen }) => {
  const { playerModel, loading, fetching } = useSelector(
    state => state.playerModels
  );
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    await dispatch(
      updatePlayerAvatar({ playerModelId: playerModel.id, formData })
    ).unwrap();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Upload avatar"
      onSubmit={handleSubmit}
      submitBtnText="Upload"
      maxWidth="xs"
    >
      <BackdropContainer
        loading={fetching || loading}
        hideContent={fetching}
        sx={{
          minHeight: 'auto',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <PlayerModelAvatarForm
          playerModel={playerModel}
          setAvatar={setAvatar}
        />
      </BackdropContainer>
    </Dialog>
  );
};

export default AvatarUploadDialog;
