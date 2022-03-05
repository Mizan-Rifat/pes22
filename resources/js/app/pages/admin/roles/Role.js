import { Button, Paper, Stack } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import { fetchRole } from 'app/redux/slices/rolesSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RoleDialog from './RoleDialog';
import { toast } from 'react-toastify';

const Role = () => {
  const { role: roleId } = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add');

  const { role, loading, fetching } = useSelector(state => state.roles);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleActionClick = type => {
    setOpenDialog(true);
    setDialogType(type);
  };

  useEffect(() => {
    dispatch(fetchRole(roleId));
  }, []);

  useEffect(() => {
    const data = [
      {
        label: 'ID',
        value: role.id
      },
      {
        label: 'Name',
        value: role.name
      },
      {
        label: 'Guard Name',
        value: role.guard_name
      }
    ];

    setData(data);
  }, [role]);

  return (
    <>
      <Paper variant="layout" sx={{ width: '100%', bgcolor: 'transparent' }}>
        <PaperHeader title="Role" color="primary" />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ my: 3 }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={() => handleActionClick('add')}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            size="small"
            onClick={() => handleActionClick('update')}
          >
            Edit
          </Button>
        </Stack>
        <DetailsGrid data={data} fullColumn />
      </Paper>

      {openDialog && (
        <RoleDialog
          title={dialogType === 'add' ? 'Add a new role' : 'Update role'}
          type={dialogType}
          open={openDialog}
          setOpen={setOpenDialog}
          loading={loading || fetching}
        />
      )}
    </>
  );
};

export default Role;
