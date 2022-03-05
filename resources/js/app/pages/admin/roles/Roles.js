import { Button, Paper, Stack, Toolbar } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React, { useEffect } from 'react';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from 'app/redux/slices/rolesSlice';
import { useNavigate } from 'react-router-dom';

const Roles = () => {
  const { roles, fetching, loading } = useSelector(state => state.roles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowActions = [
    {
      title: 'View',
      handler: id => {
        navigate(`${id}`);
        console.log('view', id);
      }
    },
    {
      title: 'Delete',
      handler: id => {
        console.log('Delete', id);
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
        Header: 'Role',
        accessor: 'name'
      },
      {
        Header: 'Guard',
        accessor: 'guard_name'
      }
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  return (
    <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
      <PaperHeader title="Roles" subTitle="Choose user roles" color="primary" />

      <Table
        title="Roles"
        columns={columns}
        data={roles}
        loading={fetching || loading}
        // minRow={10}
        rowActions={rowActions}
        bulkActions={bulkActions}
      />
    </Paper>
  );
};

export default Roles;
