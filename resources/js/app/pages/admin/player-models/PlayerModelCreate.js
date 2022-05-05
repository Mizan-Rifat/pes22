import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import PlayerModelBasicForm from './PlayerModelBasicForm';
import { fetchPlayerModel } from 'app/redux/slices/playerModelsSlice';
import AvatarUploadDialog from './AvatarUploadDialog';
import { Upload } from '@mui/icons-material';

const PlayerModelCreate = () => {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  const { playerModel, fetching, loading } = useSelector(
    state => state.playerModels
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
            <ActionToolbar>
              <Button
                variant="contained"
                component="label"
                size="small"
                startIcon={<Upload />}
                sx={{ mb: 2 }}
                onClick={() => setOpenAvatarDialog(true)}
              >
                Upload image
              </Button>
            </ActionToolbar>
            <PlayerModelBasicForm playerModel={playerModel} />
          </BackdropContainer>
        </Paper>
      </Box>

      <AvatarUploadDialog
        open={openAvatarDialog}
        setOpen={setOpenAvatarDialog}
      />
    </>
  );
};

export default PlayerModelCreate;
