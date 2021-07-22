import React, {useState} from 'react';
import Snackbar from 'components/Snackbar/Snackbar'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';


export default function MessageBox(props) {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <div>
        <Snackbar
          icon={props.successMsg ? CheckOutlinedIcon :InfoOutlinedIcon}
          close
          message={props.message}
          color = {props.color}
          open={open}
          closeNotification={handleClose}
          place={props.place}
          openDuration={props.openDuration}
        />
      </div>
    // <div className={`alert alert-${props.variant || 'info'}`}>
    //   {props.children}
    // </div>
  );
}
