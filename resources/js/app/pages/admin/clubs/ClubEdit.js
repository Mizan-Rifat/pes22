import React, { useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import BackToLIstButton from 'app/components/common/BackToLIstButton';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import ClubForm from './ClubForm';
import { fetchClub } from 'app/redux/slices/clubsSlice';

const ClubEdit = () => {
  const { club: clubId } = useParams();

  const { club, fetching, loading } = useSelector(state => state.clubs);
  const confirm = useConfirmation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await confirm({
      variant: 'error'
    });
    // await dispatch(deleteUser(user.id)).unwrap();
    navigate(`/admin/users`);
  };

  useEffect(() => {
    if (clubId) {
      dispatch(fetchClub(clubId));
    }
  }, []);

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
            <ActionToolbar justifyContent="flex-start" />
            <ClubForm club={club} />
          </BackdropContainer>
        </Paper>
      </Box>
    </>
  );
};

export default ClubEdit;
