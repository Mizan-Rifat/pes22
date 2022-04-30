import React, { useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Paper } from '@mui/material';
import ActionToolbar from 'app/components/common/ActionToolbar';
import PaperHeader from 'app/components/paper/PaperHeader';
import Table from 'app/components/table/Table';
import { deleteClub, fetchClubs } from 'app/redux/slices/clubsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import dayjs from 'dayjs';

const Clubs = () => {
  const { clubs, fetching, loading } = useSelector(state => state.clubs);
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
        await dispatch(deleteClub(id)).unwrap();
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
      // {
      //   Header: 'ID',
      //   accessor: 'id'
      // },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: rowData => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={rowData.row.original.logo} alt="" width={25} />
            <p style={{ margin: 0, marginLeft: 12 }}>
              {rowData.row.original.name}
            </p>
          </Box>
        )
      },
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Established',
        Cell: rowData =>
          dayjs(rowData.row.original.establishedIn).format('DD MMM, YYYY')
      },
      {
        Header: 'Approved',
        Cell: rowData => (rowData.row.original.approved ? 'Yes' : 'No')
      }
    ],
    []
  );

  useEffect(async () => {
    dispatch(fetchClubs());
  }, []);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Clubs" color="primary" />

        <ActionToolbar>
          <Button
            variant="outlined"
            startIcon={<Add />}
            size="small"
            // onClick={() => dispatch(showDialog())}
          >
            New
          </Button>
        </ActionToolbar>

        <Table
          title="Users"
          columns={columns}
          data={clubs}
          loading={fetching || loading}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default Clubs;
