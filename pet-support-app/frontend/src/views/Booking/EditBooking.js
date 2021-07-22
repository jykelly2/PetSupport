import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsBooking, updateBooking } from '../../actions/BookingActions';
import { roles, bookingStatus, adjustForUTCOffset,charRegExp } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

//styles
import styles from "assets/jss/material-dashboard-react/views/Bookings/editBookingStyle"

// @material-ui/core components
import { makeStyles} from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTextField from '../../components/CustomInput/CustomTextField'
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'

import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import enLocale from "date-fns/locale/en-US";
import { useFormik } from 'formik';
import * as yup from 'yup';

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const dateWithOffset = adjustForUTCOffset(date)
    return dateWithOffset//format(dateWithOffset, 'LLL dd, yyyy HH:mm')
}
//   const theme = createMuiTheme({
//     palette: { //#89229b
//       primary: {main: primaryColor[0]+ " !important"},
//     },
//   });

  const today = new Date();
  today.setHours(0, 0, 0, 0)

  const validationSchema = yup.object({
    hours: yup
      .number()
      .min(0.5, "Booking hours have to be longer than 0.5 hours")
      .required('Hours is required'),
    date: yup
      .date()
      //.min(today, "Date must be equal or later than today's date")
      .required('Date is required'),
    startTime: yup
      .date()
      .max(yup.ref('endTime'), "Start Time must be earlier than End Time")
      .required("Start Time is required"),
    endTime: yup
      .date()
      .min(yup.ref('startTime'), "Start Time must be earlier than End Time")
      .required("End Time is required"),
  });

  const useStyles = makeStyles(styles);

export default function EditBooking(props){ 
    const classes = useStyles();
     const bookingId = props.match.params.id ;

     const [hours, setHours] = useState('');
     const [totalAmount, setTotalAmount] = useState('');
     const [date, setDate] = useState('');
     const [startTime, setStartTime] = useState('');
     const [endTime, setEndTime] = useState('');

     const bookingDetails = useSelector((state) => state.bookingDetails);
     const { loading, error, booking } = bookingDetails;

     const bookingUpdate = useSelector((state) => state.bookingUpdate);
     const {
       loading: loadingUpdate,
       error: errorUpdate,
       success: successUpdate,
     } = bookingUpdate;
  
     const dispatch = useDispatch();
     useEffect(() => {
       if (successUpdate) {
         setTimeout(function(){ 
          window.location = '/admin/bookings'
         },2000)
       }
       if (!booking) {
         dispatch(detailsBooking(bookingId));
       } else {
          setTotalAmount(formatTotalAmount(booking.totalAmount))
          setHours(booking.hours)
          setDate(formatDate(booking.date))
          setStartTime(formatDate(booking.startTime))
          setEndTime(formatDate(booking.endTime))
       }
     }, [dispatch, booking, bookingId, successUpdate]);

    const formik = useFormik({
        initialValues: {
          hours: hours,
          totalAmount: totalAmount,
          date: date,
          startTime: startTime,
          endTime: endTime,
          status: booking?.status ? booking?.status : "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const editedBooking =  {
                  _id: bookingId,
                  date: values.date,
                  startTime: values.startTime,
                  endTime: values.endTime,
                  status: values.status,
                  hours: values.hours,
                  totalAmount: parseFloat((values.totalAmount.slice(1)))
              }
          dispatch(updateBooking(editedBooking));
        },
      });

      const handleTimeChange = (time, isStartTime) => {
        var endDate = createDatewithTime(isStartTime ? endTime : time);
        var startDate = createDatewithTime(isStartTime ? time : startTime);

          if (endDate > startDate) {
            if (isStartTime) setStartTime(time)
            else setEndTime(time)
            const totalTimeDiff = calculateTimeDiffBetDates(startDate, endDate)
            setHours(totalTimeDiff)
            setTotalAmount(formatTotalAmount(totalTimeDiff * 10))
          }
          else
            alert("Start Time has to be before End Time")
      }

      const createDatewithTime = (time) => {
        const date = new Date();
        return date.setHours(time.getHours(),time.getMinutes(),0);
      }

      const calculateTimeDiffBetDates = (startDate, endDate) => {
        const diffMs = (endDate-startDate);
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        return diffHrs+"."+ (diffMins === 30? '5' : '')
      }

      const formatTotalAmount = (amount) => {
        return "$" + amount.toFixed(2).toString()
      }

      return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
      ) : ( 
        <GridContainer>
           <GridItem xs={12} sm={12} md={12}>
            <CustomBreadcrumbs
              location={props.location}
              edit={true}
              plural={true}
              pageTitle={"Edit Booking"}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          {loadingUpdate ? (<LoadingBox></LoadingBox>
                ) : errorUpdate ? (
                    <MessageBox color="danger" message={errorUpdate} place={"tr"}  openDuration={4000} ></MessageBox>
                ) : successUpdate ? (
                    <MessageBox color="success" message={successUpdate} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                  ):(
                    <div></div>
                )}
          </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
          <form className={classes.form} onSubmit={formik.handleSubmit} >
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>Booking Information</h4>
               <p className={classes.cardCategoryWhite}>Update the required fields</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                 <CustomTextField
                    fullWidth
                    id="clientName"
                    label="Client Name*"
                    defaultValue={booking.client.name}
                    disabled={true}
                />
               
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomTextField
                    fullWidth
                    id="animalName"
                    label="Pet's Name*"
                    defaultValue={booking.animal.name}
                    disabled={true}
                />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <CustomTextField
                    fullWidth
                    id="hours"
                    name="hours"
                    label="Total Hours*"
                    disabled={true}
                    value={hours}
                    error={formik.touched.hours && Boolean(formik.errors.hours)}
                    helperText={formik.touched.hours && formik.errors.hours}
                />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                <CustomTextField
                    fullWidth
                    id="totalAmount"
                    name="totalAmount"
                    label="Total Amount*"
                    disabled={true}
                    value={totalAmount}
                    error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
                    helperText={formik.touched.totalAmount && formik.errors.totalAmount}
                />
                </GridItem>
            </GridContainer>
            
              <GridContainer>
              {date && startTime && endTime ?
              <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                     <GridItem xs={12} sm={4} md={4}>
                 <KeyboardDatePicker
                 fullWidth
                 margin="normal"
                 id="date-picker-dialog"
                 label="Booking Date*"
                 format="yyyy-MM-dd"
                 //disablePast
                 helperText={formik.touched.date && formik.errors.date}
                 error={formik.touched.date && Boolean(formik.errors.date)}
                 value={date}
                 onChange={date => setDate(date)}
                 KeyboardButtonProps={{
                     'aria-label': 'change date',
                 }}
                 />
                 </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <KeyboardTimePicker className={classes.select}
                locale={enLocale}
                fullWidth
                margin="normal"
                id="start-time-picker"
                label="Start Time*"
                value={startTime}
                minutesStep={30}
                helperText={formik.touched.startTime && formik.errors.startTime}
                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                onChange={(time) => handleTimeChange(time, true)}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                /> 
                </GridItem> 
                <GridItem xs={12} sm={4} md={4}>
                <KeyboardTimePicker
                fullWidth
                locale={enLocale}
                margin="normal"
                id="end-time-picker"
                label="End Time*"
                value={endTime}
                minutesStep={30}
                helperText={formik.touched.endTime && formik.errors.endTime}
                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                onChange={(time) => handleTimeChange(time, false)}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                /> 
                </GridItem>
                </MuiPickersUtilsProvider>  : <div></div>}
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                    <CustomSelect
                        labelText="Status*"
                        formControlProps={{
                        fullWidth: true,
                        }}
                        inputProps={{
                        id: "status",
                        name: "status",
                        onChange : (formik.handleChange),
                        required: true,
                        value: formik.values.status
                        }} 
                        options={bookingStatus}
                    >
                   </CustomSelect>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button  type="submit" color="primary">Update Booking</Button>
            </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
      )}
      </div>
    ) 
}
