import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export const SnackbarMessage = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar open={open}
      // milliseconds
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        action={action}>
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
}
