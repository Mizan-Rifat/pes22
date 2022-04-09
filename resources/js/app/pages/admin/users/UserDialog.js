import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { closeDialog } from 'app/redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import UserForm from './UserForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';
import { fetchRoles } from 'app/redux/slices/rolesSlice';
import { fetchPermissions } from 'app/redux/slices/permissionsSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog = ({ title, type, loading }) => {
  const { openDialog } = useSelector(state => state.users);
  const { roles } = useSelector(state => state.roles);
  const { permissions } = useSelector(state => state.permissions);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (openDialog) {
  //     const roles = dispatch(fetchRoles()).unwrap();
  //     const permissions = dispatch(fetchPermissions()).unwrap();
  //     Promise.all([roles, permissions])
  //       .then(res => {
  //         setLoading(false);
  //         console.log({ res });
  //       })
  //       .catch(err => {
  //         console.log({ err });
  //       });
  //   }
  // }, [openDialog]);

  return (
    <Dialog
      variant="edit"
      open={openDialog}
      TransitionComponent={Transition}
      onClose={() => dispatch(closeDialog())}
      sx={{ '& .MuiDialog-paper': { width: 500 } }}
    >
      <BackdropContainer loading={loading}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {openDialog && (
            <UserForm
              type={type}
              formId="userForm"
              roles={roles}
              permissions={permissions}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => dispatch(closeDialog())}>
            Cancel
          </Button>
          <Button size="small" type="submit" form="userForm">
            Submit
          </Button>
        </DialogActions>
      </BackdropContainer>
    </Dialog>
  );
};

export default UserDialog;
