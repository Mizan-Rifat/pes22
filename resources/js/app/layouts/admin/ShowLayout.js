import React from 'react';
import { Button, Paper } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ActionToolbar from 'app/components/common/ActionToolbar';
import BackToLIstButton from 'app/components/common/BackToLIstButton';

const ShowLayout = ({
  title,
  data,
  handleDelete,
  backLink,
  editLink = 'edit',
  fullColumn = true,
  actions
}) => {
  const navigate = useNavigate();

  return (
    <>
      <BackToLIstButton onClick={() => navigate(backLink)} />

      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title={title} color="primary" />
        <ActionToolbar justifyContent="flex-start">
          {actions}
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            size="small"
            component={Link}
            to={editLink}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<EditIcon />}
            size="small"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ActionToolbar>
        <DetailsGrid data={data} fullColumn={fullColumn} />
      </Paper>
    </>
  );
};

export default ShowLayout;
