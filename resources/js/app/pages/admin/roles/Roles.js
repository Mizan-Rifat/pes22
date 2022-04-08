import { Button, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React, { useEffect } from 'react';
import Table from 'app/components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, fetchRoles } from 'app/redux/slices/rolesSlice';
import { Link, useNavigate } from 'react-router-dom';
import ActionToolbar from 'app/components/common/ActionToolbar';
import { Add } from '@mui/icons-material';
import { useConfirmation } from 'app/providers/ConfirmationProvider';

const Roles = () => {
  const { roles, fetching, loading } = useSelector(state => state.roles);
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
        await dispatch(deleteRole(id)).unwrap();
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
      },
      {
        Header: 'Permissions',
        cellProps: {
          sx: {
            whiteSpace: 'normal'
          }
        },
        Cell: rowData => {
          const { permissions } = rowData.row.original;
          console.log({ rowData });
          return permissions.map(permission => permission.name).join(', ');
        }
      }
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader
          title="Roles"
          subTitle="Choose user roles"
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
          title="Roles"
          columns={columns}
          data={roles}
          loading={fetching || loading}
          // minRow={10}
          rowActions={rowActions}
          bulkActions={bulkActions}
        />
      </Paper>
    </>
  );
};

export default Roles;
