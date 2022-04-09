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
import UserDialog from './UserDialog';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import axios from 'axios';

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
      }
    ],
    []
  );

  useEffect(async () => {
    // const user = await axios.post('/api/login', {
    //   email: 'mizan@mail.com',
    //   password: 'password'
    // });

    // console.log({ user });
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
      <UserDialog title="Add a new user" type="add" />
    </>
  );
};

export default Users;
