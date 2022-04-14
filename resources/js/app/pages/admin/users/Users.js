import { Button, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React, { useEffect } from 'react';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  fetchUsers,
  showDialog
} from 'app/redux/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { Add } from '@mui/icons-material';
import { useConfirmation } from 'app/providers/ConfirmationProvider';

const Users = () => {
  const { users, fetching, loading } = useSelector(state => state.users);
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
        await dispatch(deleteUser(id)).unwrap();
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
        Header: 'User',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Roles',
        cellProps: {
          sx: {
            whiteSpace: 'normal'
          }
        },
        Cell: rowData =>
          rowData.row.original.roles.map(role => role.name).join(', ')
      }
    ],
    []
  );

  useEffect(async () => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Users" color="primary" />

        <ActionToolbar>
          <Button
            variant="outlined"
            startIcon={<Add />}
            size="small"
            onClick={() => dispatch(showDialog())}
          >
            New
          </Button>
        </ActionToolbar>

        <Table
          title="Users"
          columns={columns}
          data={users}
          loading={fetching || loading}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default Users;
