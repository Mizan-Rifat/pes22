import { Button, Grid, Paper, Stack, TextField } from '@mui/material';
import DetailsGrid from 'app/components/common/DetailsGrid';
import PaperHeader from 'app/components/paper/PaperHeader';
import Table from 'app/components/table/Table';
import { fetchRole } from 'app/redux/slices/rolesSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

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

const RoleDialog = ({ open, setOpen, title, type, loading }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
    >
      <BackdropContainer loading={loading}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <RoleForm type={type} formId="roleForm" />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setOpen(false)}>
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
