import React, { useEffect, useState} from 'react';
import parseISO from 'date-fns/parseISO';
import {listAvailableAnimals, listScheduledAnimals} from '../actions/AnimalActions';
import {listTodayBookings, listInProgressBookings, listRecentBookingsWithAnimals} from '../actions/BookingActions';
import { roles, linkType, bookingStatus, adjustForUTCOffset} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import  'assets/css/table.css'
import Links from '../components/Table/Links'
import Chips from '../components/Table/Chips'
// apexCharts
import BookingCountChart from "components/Charts/BookingCountChart"
import PopularBreedChart from "components/Charts/PopularBreedChart"
import PopularAnimalChart from "components/Charts/PopularAnimalChart"
// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PetsIcon from '@material-ui/icons/Pets';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HistoryIcon from '@material-ui/icons/History';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
// @material-ui/core
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import EmptyCard from "components/Card/EmptyCard.js"
import Button from "components/CustomButtons/Button.js";
import Typography from "@material-ui/core/Typography";
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';

const emptyImg = require("assets/img/empty4.jpeg").default
const useStyles = makeStyles(styles);

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  const dateWithOffset = adjustForUTCOffset(date)
  return dateWithOffset
}

export default function Dashboard() {
  const classes = useStyles();

  var date = new Date();
  date.setMonth(date.getMonth() - 1);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const animalAvailableList = useSelector((state) => state.animalAvailableList);
  const { loading: loadingAvailableAnimals, error: errorAvailableAnimals, animals: availableAnimals} = animalAvailableList;

  const animalScheduledList = useSelector((state) => state.animalScheduledList);
  const { loading: loadingScheduledAnimals, error: errorScheduledAnimals, animals: scheduledAnimals} = animalScheduledList;

  const bookingTodayList = useSelector((state) => state.bookingTodayList);
  const { loading: loadingBookingsToday, error: errorBookingsToday, bookings: bookingsToday} = bookingTodayList;

  const bookingInProgressList = useSelector((state) => state.bookingInProgressList);
  const { loading: loadingInProgressBookings, error: errorInProgressBookings, bookings: bookingsInProgress} = bookingInProgressList;

  const bookingRecentListWithAnimals = useSelector((state) => state.bookingRecentListWithAnimals);
  const { loading: loadingRecentBookingsWithAnimals, error: errorRecentBookingsWithAnimals, bookings: recentBookingsWithAnimals, role: recentBookingsRoleWithAnimals} = bookingRecentListWithAnimals;

 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAvailableAnimals());
    dispatch(listScheduledAnimals());

    dispatch(listTodayBookings());
    dispatch(listInProgressBookings());
    dispatch(listRecentBookingsWithAnimals())

    return function cleanup() {
      window.onresize = null
    };
  }, [dispatch]);

  const getBookingColumnDefs = (userRole) => {
    var bookingsColumnDefs = [
      {headerName: 'Client',  colId: "client", minWidth: 150, cellRenderer:nameRenderer,
        valueGetter: 
          function clientField(params) {
            return  params.data.client[0].name
          } 
      },
      {headerName: 'Animal',  colId: "animal", minWidth: 130, cellRenderer:nameRenderer,
        valueGetter: 
          function animalField(params) {
             return  params.data.animal[0].name
          } 
      },
      {headerName: 'Date', field:'date',  cellRenderer:dateRenderer, filter:"agDateColumnFilter", filterParams: dateFilterParams, minWidth: 120,}, 
      {headerName: 'Revenue',field:'totalAmount', cellRenderer:totalAmountRenderer, minWidth: 120,  filter:'agNumberColumnFilter'},
      {headerName: 'Status',field:'status', cellRenderer:'chips', minWidth: 115, },
    ]
    if (userRole === roles.Administrator){
      bookingsColumnDefs.push(
        {headerName: '', field:'_id', type:"rightAligned", minWidth: 60, maxWidth: 60, cellRenderer: "links", filter: false,
        cellRendererParams: {
          linkType: linkType.Booking
        }
      })
    }
    return bookingsColumnDefs
  }

  const  defaultColDef = {
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
  }

  const frameworkComponents = {
    links: Links,
    chips: Chips.StringChips
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    let allColumns = params.columnApi.getAllColumns()

    if (window.innerWidth <= 1270 && window.innerWidth >= 960) 
      params.columnApi.autoSizeColumns(allColumns, false);
    else 
      params.api.sizeColumnsToFit()

    window.onresize = () => {
        if (window.innerWidth <= 1270 && window.innerWidth >= 960)  
          params.columnApi.autoSizeColumns(allColumns, false);
        else
          params.api.sizeColumnsToFit();      
    }
  }
  
  const onBtnExport = () => {
    gridApi.exportDataAsCsv({fileName:"Recent Bookings Data"});
  };

  function nameRenderer(params) {
    return '<b>' + params.value + '</b>';
  }

  function dateRenderer(params) {
    return  params.value.split('T')[0];
  }

  function totalAmountRenderer(params) {
    return '<span style="color:green">' + "$" + params.value.toFixed(2) + '</span>'
  }

  var dateFilterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      if (cellValue == null) return -1;
      var cellDate = formatDate(cellValue)
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2010,
  };

  return (
    <div>
       {loadingRecentBookingsWithAnimals ? (<LoadingBox></LoadingBox>
        ) : recentBookingsWithAnimals === undefined ?(
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <EmptyCard title="No Bookings" message="There are no booking records to display" image={emptyImg}/>
          </GridItem>
          </GridContainer> 
        ) : errorRecentBookingsWithAnimals ? (
          <MessageBox color="danger" message={errorRecentBookingsWithAnimals} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
          <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <GridContainer>
      {loadingBookingsToday  ? (<LoadingBox></LoadingBox>
        ) : errorBookingsToday ? (
          <MessageBox color="danger" message={errorBookingsToday} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
        <GridItem xs={12} sm={6} md={3} lg={3}>
          <Card form>
            <CardHeader icon>
              <CardIcon color="info">
                  <EventNoteIcon/>
              </CardIcon>
              <p className={classes.infoCategory}>Today's Bookings</p>
              <h3 className={classes.infoStats}>{bookingsToday.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <TodayIcon />
                {new Date().toLocaleString('default', { month: 'long', day: "numeric", year:"numeric"})}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        )}
         {loadingInProgressBookings  ? (<LoadingBox></LoadingBox>
        ) : errorInProgressBookings ? (
          <MessageBox color="danger" message={errorInProgressBookings} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
        <GridItem xs={12} sm={6} md={3} lg={3}>
          <Card form>
            <CardHeader icon>
              <CardIcon color="info">
                <HistoryIcon />
              </CardIcon>
              <p className={classes.infoCategory}>Progress Bookings</p>
              <h3 className={classes.infoStats}>{bookingsInProgress.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ScheduleIcon />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        )}
        {loadingAvailableAnimals  ? (<LoadingBox></LoadingBox>
        ) : errorAvailableAnimals ? (
          <MessageBox color="danger" message={errorAvailableAnimals} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
        <GridItem xs={12} sm={6} md={3} lg={3}>
          <Card form>
            <CardHeader icon>
            <CardIcon color="primary">
                <PetsIcon/>
              </CardIcon>
              <p className={classes.infoCategory}>Available Animals</p>
              <h3 className={classes.infoStats}>
                {availableAnimals.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <FilterNoneOutlinedIcon/>
                All Animals
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        )}
         {loadingScheduledAnimals  ? (<LoadingBox></LoadingBox>
        ) : errorScheduledAnimals ? (
          <MessageBox color="danger" message={errorScheduledAnimals} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
        <GridItem xs={12} sm={6} md={3} lg={3}>
          <Card form>
            <CardHeader icon>
              <CardIcon color="primary">
                <WatchLaterIcon />
              </CardIcon>
              <p className={classes.infoCategory}>Scheduled Animals</p>
              <h3 className={classes.infoStats}>{scheduledAnimals.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ScheduleIcon />
                All Schedules
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        )}
      </GridContainer> 
      </GridItem>
      </GridContainer> 
      <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
          <Card form>
            <CardHeader>
              <BookingCountChart bookings={recentBookingsWithAnimals}/>
              <div className={classes.flexEven}>
                  <div>
                    <h3 className={classes.infoStats + " " + classes.textCenter}>{recentBookingsWithAnimals?.length}</h3>
                    <p className={classes.infoCategory + " " + classes.textCenter}>Total Bookings</p>
                  </div>
                  <div>
                      <h3 className={classes.infoStats +" "+ classes.greenColor + " " + classes.textCenter}>${recentBookingsWithAnimals.reduce((n, {totalAmount, status}) => n + (status === bookingStatus.Canceled ? 0 : totalAmount), 0)}</h3>
                      <p className={classes.infoCategory + " " + classes.textCenter}>Total Revenue</p>
                  </div>
              </div>
            </CardHeader>
          </Card>
         </GridItem>
         <GridItem xs={12} sm={12} md={4}>
          <Card form>
            <CardHeader>
              <PopularBreedChart animals={recentBookingsWithAnimals.map(booking => booking.animal[0])}/>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <Card form>
      <CardBody>
        <PopularAnimalChart animals={recentBookingsWithAnimals.map(booking => booking.animal[0])}/>
      </CardBody>
    </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card form>
            <CardHeader>
            <div className={classes.flex}>
              <Typography className={classes.cardTitle}>Recent Bookings</Typography> 
              <Button color="primary" size="sm" className={classes.tableButton}
                onClick={() => onBtnExport()}
                startIcon={<SaveAltOutlinedIcon/>}
                >
                  CSV
                </Button>
                </div> 
            </CardHeader>
            <CardBody compact className={"ag-theme-material"} style={{height: '360px' }} > 
              <AgGridReact
                        defaultColDef={defaultColDef}
                        columnDefs={getBookingColumnDefs(recentBookingsRoleWithAnimals)}
                        rowHeight={'50'}
                        animateRows={true}
                        paginationPageSize={'5'}
                        suppressExcelExport={true}
                        pagination={true}
                        onGridReady={params => onGridReady(params)}
                        frameworkComponents={frameworkComponents}
                        rowData={recentBookingsWithAnimals}>
                </AgGridReact>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div> 
      )}
    </div>
  );
}

//CLIENTS CHART AND TABLE
      {/* 

          const getClientsColumnDefs = (userRole) => {
    var clientsColumnDefs = [
      {headerName: 'Name', field:'name'},
      {headerName: 'Address', field:'address'},
      {headerName: 'Date Joined',field:'createdAt', cellRenderer: dateRenderer},
    ]

    if (userRole === roles.Administrator){
      clientsColumnDefs.push({headerName: '', field:'_id', minWidth: 60, maxWidth: 60, type:"rightAligned", cellRenderer: "links", filter: false,
      cellRendererParams: {
        linkType: linkType.Staff
        }
      })
    }
    return clientsColumnDefs
  }
        
     {/* <Card form>
            <CardHeader>
              <h4 className={classes.cardTitle}>Top Clients</h4>
            </CardHeader>
            <CardBody  className={"ag-theme-material"} style={{height: '360px' }} > 
              <AgGridReact
                        columnDefs={getBookingColumnDefs(recentBookingsRoleWithAnimals)}
                        rowHeight={'50'}
                        animateRows={true}
                        paginationPageSize={'5'}
                        suppressExcelExport={true}
                        pagination={true}
                        onGridReady={params => onGridReady(params)}
                        frameworkComponents={frameworkComponents}
                        rowData={recentBookingsWithAnimals}>
                </AgGridReact>
            </CardBody>
          </Card> */}
