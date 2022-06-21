import React, { useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { Add } from '@mui/icons-material';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import { useGetFixturesQuery } from 'app/redux/apiSlices/tournamentFixturesApi';

const TournamentFixtures = () => {
  const {
    data: fixtures = [],
    error,
    isLoading,
    isFetching
  } = useGetFixturesQuery(1);
  console.log({ fixtures, error, isLoading, isFetching });

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
        // await dispatch(deletePermission(id)).unwrap();
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
        Header: 'Team_1 ',
        accessor: 'team1.name',
        Cell: rowData => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={rowData.row.original.avatar} alt="" width={30} />
            <p style={{ margin: 0, marginLeft: 12 }}>
              {rowData.row.original.name}
            </p>
          </Box>
        )
      },
      {
        Header: 'Permission',
        accessor: 'name'
      },
      {
        Header: 'Guard',
        accessor: 'guard_name'
      }
    ],
    []
  );

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader
          title="Permissions"
          subTitle="Choose user permissions"
          color="primary"
        />

        <ActionToolbar>
          <Button
            variant="outlined"
            startIcon={<Add />}
            size="small"
            component={Link}
            to="create"
          >
            New
          </Button>
        </ActionToolbar>

        <Table
          title="Permissions"
          columns={columns}
          data={fixtures}
          loading={isFetching || isLoading}
          // minRow={10}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default TournamentFixtures;
