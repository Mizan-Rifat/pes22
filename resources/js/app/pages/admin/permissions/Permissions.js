import { Button, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React, { useEffect } from 'react';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { Add } from '@mui/icons-material';
import { useConfirmation } from 'app/providers/ConfirmationProvider';
import {
  deletePermission,
  fetchPermissions
} from 'app/redux/slices/permissionsSlice';

const Permissions = () => {
  const { permissions, fetching, loading } = useSelector(
    state => state.permissions
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
        await dispatch(deletePermission(id)).unwrap();
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

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

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
          data={permissions}
          loading={fetching || loading}
          // minRow={10}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default Permissions;
