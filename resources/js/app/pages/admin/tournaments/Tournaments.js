import { Button, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React, { useEffect } from 'react';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTournament,
  fetchTournaments,
  showDialog
} from 'app/redux/slices/tournamentSlice';
import { useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { Add } from '@mui/icons-material';
import { useConfirmation } from 'app/providers/ConfirmationProvider';

const Tournaments = () => {
  const { tournaments, fetching, loading } = useSelector(
    state => state.tournaments
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirm = useConfirmation();

  const rowActions = [
    {
      title: 'View',
      handler: id => {
        navigate(`${id}`);
      }
    },
    {
      title: 'Delete',
      handler: async id => {
        console.log('Delete', id);
        await confirm({
          variant: 'error'
        });
        await dispatch(deleteTournament(id)).unwrap();
      }
    }
  ];

  const bulkActions = {
    delete: {
      title: 'Delete',
      handler: selectedIds => {
        console.log('Delete', selectedIds);
      }
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Format',
        accessor: 'format'
      },
      {
        Header: 'Rounds',
        accessor: 'rounds'
      },
      {
        Header: 'Leg',
        accessor: 'leg'
      },
      {
        Header: 'Active',
        accessor: 'active',
        Cell: rowData => (rowData.row.original.active ? 'Yes' : 'No')
      }
    ],
    []
  );

  useEffect(async () => {
    dispatch(fetchTournaments());
  }, []);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Tournaments" color="primary" />

        <ActionToolbar>
          <Button
            variant="outlined"
            startIcon={<Add />}
            size="small"
            onClick={() => navigate('create')}
          >
            New
          </Button>
        </ActionToolbar>

        <Table
          title="Tournaments"
          columns={columns}
          data={tournaments}
          loading={fetching || loading}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default Tournaments;
