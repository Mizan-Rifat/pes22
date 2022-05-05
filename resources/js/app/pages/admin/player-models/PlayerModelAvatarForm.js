import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import HoverBox from 'app/components/hoverbox/HoverBox';

const PlayerModelAvatarForm = ({ playerModel, setAvatar }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = e => {
    setAvatar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    setPreview(playerModel.avatar);
  }, [playerModel]);

  return (
    <HoverBox
      sx={{
        height: 100,
        width: 150,
        borderRadius: 1,
        p: 1,
        border: 1,
        borderColor: 'grey.400'
      }}
    >
      <img
        src={preview}
        alt=""
        width="100%"
        height="100%"
        style={{ objectFit: 'contain', display: 'block' }}
      />
      <HoverBox.Content>
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,.5)',
            width: '100%'
          }}
        >
          <Button
            component="label"
            sx={{
              width: '100%',
              height: '100%',
              p: 0,
              color: 'common.white'
            }}
          >
            Upload Avatar
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
      </HoverBox.Content>
    </HoverBox>
  );
};

export default PlayerModelAvatarForm;
