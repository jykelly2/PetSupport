import { CheckCircle, Check } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import {bookingStatus} from '../../utils'
const ErrorChip = withStyles({
    root: {
        backgroundColor: 'lightcoral',
      color: 'white',
    },
  })(Chip);

 const SuccessChip = withStyles({
    root: {
      backgroundColor:'lightgreen',
      color: 'white',
    },
    icon: {
        color: 'white !important'
      }
  })(Chip);

  const ApprovedChip = withStyles({
    root: {
      backgroundColor:'lightblue',
      color: 'white',
    }
  })(Chip);

  const ReviewChip = withStyles({
    root: {
      backgroundColor:'lightsalmon',
      color: 'white',
    }
  })(Chip);

  const ProgressChip = withStyles({
    root: {
      backgroundColor:'#ffd54f',
      color: 'white',
    }
  })(Chip);

  const CompletedChip = withStyles({
    root: {
      backgroundColor:'lightgreen',
      color: 'white',
    }
  })(Chip);

  const CanceledChip = withStyles({
    root: {
      color: 'white',
    }
  })(Chip);

  const getBookingStatus = (status) => {
    switch (status) {
      case bookingStatus.Reviewing:
        return <ReviewChip label={bookingStatus.Reviewing} />
        case bookingStatus.Approved:
          return <ApprovedChip label={bookingStatus.Approved} />
      case bookingStatus.InProgress:
        return <ProgressChip label={bookingStatus.InProgress} />
      case bookingStatus.Canceled:
          return <CanceledChip label={bookingStatus.Canceled} />
      default:
        return <CompletedChip label={bookingStatus.Completed} />
    }
  }

 function BoolChips(params){
    return (
        <div>  {params.value ?
        <SuccessChip icon={<Check />} label="Yes" />:<ErrorChip  label="No" />}  
        </div>
    )
}

 function StringChips(params){
  return (
      <div>  
        {getBookingStatus(params.value)} 
      </div>
  )
}

export default {BoolChips, StringChips} //can export single like ReviewChip etc..
