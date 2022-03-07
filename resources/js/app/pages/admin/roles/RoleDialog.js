import React from 'react';
import { Button } from '@mui/material';
import { closeDialog } from 'app/redux/slices/rolesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import RoleForm from './RoleForm';
import BackdropContainer from 'app/components/backdrop/BackdropContainer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoleDialog = ({ title, type }) => {
  const { openDialog, loading, fetching } = useSelector(state => state.roles);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(closeDialog())}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      sx={{ '& .MuiDialog-paper': { minWidth: 400 } }}
    >
      <BackdropContainer loading={loading || fetching}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {openDialog && <RoleForm type={type} formId="roleForm" />}
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => dispatch(closeDialog())}>
            Cancel
          </Button>
          <Button size="small" type="submit" form="roleForm">
            Submit
          </Button>
        </DialogActions>
      </BackdropContainer>
    </Dialog>
  );
};

export default RoleDialog;
