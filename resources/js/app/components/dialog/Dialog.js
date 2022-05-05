import React from 'react';
import { Button, DialogContentText, Zoom } from '@mui/material';
import MDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

const Dialog = ({
  open,
  setOpen,
  title = 'Confirm',
  variant = 'primary',
  onSubmit,
  onCancel,
  maxWidth = 'sm',
  cancelBtn = true,
  cancelBtnText = 'CANCEL',
  submitBtnText = 'OK',
  children
}) => {
  return (
    <MDialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle
        sx={{ bgcolor: `${variant}.main`, color: 'common.white', py: 1 }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', alignItems: 'center', mt: 2.5 }}>
        {children}
      </DialogContent>
      <DialogActions>
        {cancelBtn && (
          <Button
            color={variant}
            size="small"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            {cancelBtnText}
          </Button>
        )}
        <Button
          color={variant}
          size="small"
          variant="contained"
          onClick={onSubmit}
        >
          {submitBtnText}
        </Button>
      </DialogActions>
    </MDialog>
  );
};

export default Dialog;
