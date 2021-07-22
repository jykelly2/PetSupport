import React, { useEffect, useState} from 'react';
import parseISO from 'date-fns/parseISO';
import Chips from '../../components/Table/Chips'
import Links from '../../components/Table/Links'
import { useDispatch, useSelector } from 'react-redux';
import { listBookings} from '../../actions/BookingActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import  '../../assets/css/table.css'
import { roles, pageSize, linkType, adjustForUTCOffset } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
//style
import { makeStyles} from "@material-ui/core/styles";
import styles from 'assets/jss/material-dashboard-react/views/Users/userListStyle'
// core components
import ReactSelect from 'components/CustomInput/ReactSelect'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import FormatAlignCenterOutlinedIcon from '@material-ui/icons/FormatAlignCenterOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';

const useStyles = makeStyles(styles);

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  const dateWithOffset = adjustForUTCOffset(date)
  return dateWithOffset//format(dateWithOffset, 'LLL dd, yyyy HH:mm')
}

export default function BookingsList(props){
  const classes = useStyles();
  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings, role} = bookingList;

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [isAutoSize, setIsAutoSize] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBookings());
    return function cleanup() {
      window.onresize = null
    };
  }, [dispatch]);

  const getBookingColumnDefs = (userRole) => {
    var columnDefs = [
        {headerName: 'Client', field:'client.name', minWidth: 150, cellRenderer:nameRenderer},
        {headerName: 'Animal', field:'animal.name',minWidth: 130, cellRenderer:nameRenderer},
        {headerName: 'Date', field:'date', cellRenderer:dateRenderer, filter:"agDateColumnFilter", filterParams: dateFilterParams, minWidth: 205, maxWidth: 205,},
        {headerName: 'Start Time',field:'startTime',cellRenderer:timeRenderer, minWidth: 130,
          filterValueGetter: 
          function startTimeField(params) { 
            return  formatTime(params.data.startTime)
          }
        },
        {headerName: 'End Time',field:'endTime', cellRenderer:timeRenderer, minWidth: 130,
          filterValueGetter: 
          function endTimeField(params) { 
            return formatTime(params.data.endTime) 
          }
        },
        {headerName: 'Total Amount',field:'totalAmount', cellRenderer:totalAmountRenderer, minWidth: 175, maxWidth: 175, filter:'agNumberColumnFilter',
          filterValueGetter: 
            function amountField(params) { 
              return  params.data.totalAmount
            }
        },
        {headerName: 'Hours',field:'hours', minWidth: 130, maxWidth: 130, filter:'agNumberColumnFilter'},
        {headerName: 'Status',field:'status', cellRenderer:'chips' ,minWidth: 135, maxWidth: 135},
    ]
    if (userRole === roles.Administrator){
        columnDefs.push({headerName: '', field:'_id', type:"rightAligned", minWidth: 60, maxWidth: 60, cellRenderer: "links", filter: false,
          cellRendererParams: {
            linkType: linkType.Booking
          }
        })
    }
    return columnDefs
  }
  
  const  defaultColDef = {
    editable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
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

    if (window.innerWidth < 1410) 
      params.columnApi.autoSizeColumns(allColumns, false);
    else 
      params.api.sizeColumnsToFit()

      window.onresize = () => {
        if (window.innerWidth < 1410) 
          params.columnApi.autoSizeColumns(allColumns, false);
        else
          params.api.sizeColumnsToFit();
      };
  }

  const getSelectedRows = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData)
  }

  const sizeToFit = () => {
    gridApi.sizeColumnsToFit();
    setIsAutoSize(false);
  };

  const autoSizeAll = (skipHeader) => {
    var allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(function (column) {
        allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    setIsAutoSize(true);
  };

  const onBtnExport = () => {
    gridApi.exportDataAsCsv({fileName:"Animal Data"});
  };

  const onPageSizeChanged = (newPageSize) => {
      gridApi.paginationSetPageSize(Number(newPageSize));
  };


  function nameRenderer(params) {
    return '<b>' + params.value + '</b>';
  }

  function dateRenderer(params) {
    return  params.value.split('T')[0];
  }

  function timeRenderer(params) {
    return  formatTime(params.value) 
  }

  function totalAmountRenderer(params) {
    return '<span style="color:green">' + "$" + params.value.toFixed(2) + '</span>'
  }

  const toggleColumnSize = () =>{
        if (isAutoSize) sizeToFit()
        else autoSizeAll(false)
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

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {timeZone:"UTC", hour: '2-digit', minute: '2-digit' });
  }

return (
  <div>
    {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"} openDuration={4000} ></MessageBox>
      ) : ( 
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomBreadcrumbs
              location={props.location}
              pageTitle={"Booking List"}
            />
          </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.card}>
          <CardHeader>
          <GridContainer>
              <div className={classes.flex}>
                <GridItem xs={12} sm={10} md={10}> 
                <Button color="primary" size="sm" className={classes.buttonMargin}
                onClick={() => onBtnExport()}
                startIcon={<SaveAltOutlinedIcon/>}
                >
                  CSV
                </Button>
                <Button color="primary" size="sm" className={classes.buttonMargin}
                  onClick={() => toggleColumnSize()}
                  startIcon={<FormatAlignCenterOutlinedIcon/>}
                  >
                    {isAutoSize ? "Auto": "Fit"}
                </Button>
                
                <Button color="primary"  size="sm" className={classes.buttonMargin}
                  onClick={() => getSelectedRows()}
                  startIcon={<DnsOutlinedIcon/>}
                  >
                    Rows
                </Button>
                </GridItem>
                
                </div>
                <GridItem xs={2} sm={2} md={2}>
            <ReactSelect 
               className={classes.width}
                  id="page-size"
                  options={pageSize}
                  defaultValue={[pageSize[0]]}
                  placeholder="Select page size..."
                  onChange={(e) => onPageSizeChanged(e.value)}
                />
              </GridItem>
              </GridContainer>
          </CardHeader>
            <CardBody  className={"ag-theme-material"} style={{height: '100vh' }}>
                <AgGridReact
                  defaultColDef={defaultColDef}
                  columnDefs={getBookingColumnDefs(role)}
                  suppressRowClickSelection={true}
                  rowMultiSelectWithClick={true}
                  rowSelection={'multiple'}
                  rowGroupPanelShow={'always'}
                  rowHeight={'85'}
                  animateRows={true}
                  pivotPanelShow={'always'}
                  paginationPageSize={'10'}
                  paginationNumberFormatter={function (params) {
                    return '[' + params.value.toLocaleString() + ']';
                  }}
                  suppressExcelExport={true}
                  enableRangeSelection={true}
                  pagination={true}
                  onGridReady={params => onGridReady(params)}
                  frameworkComponents={frameworkComponents}
                  rowData={bookings}>
                  </AgGridReact>
               </CardBody>
              </Card>
              </GridItem>
              </GridContainer>
     )}  
  </div> 
  );
}

// <AgGridColumn headerName={"Client"} field="client.name" cellRenderer={nameRenderer}/>
// <AgGridColumn headerName={"Animal"} field="animal.name"/>
// <AgGridColumn headerName={"Date"} field="date"/>
// <AgGridColumn headerName={"Start Time"} field="startTime"/>
// <AgGridColumn headerName={"End Time"} field="endTime"/>
// <AgGridColumn headerName={"Total Hours"} field="hours"/>
// <AgGridColumn field="status" cellRenderer={'chips'}/>
// <AgGridColumn headerName={"Action"} field="_id" cellRenderer={linkRenderer} />
{/* <AgGridColumn headerName={"Available"} field="isAvailable" cellRenderer={'chips'}/>
<AgGridColumn headerName={"Scheduled"} field="isScheduled" cellRenderer={'chips'} />
<AgGridColumn headerName={"Adoptable"} field="isAdoptable" cellRenderer={'chips'} />
<AgGridColumn headerName={"Neuteured"} field="isNeuteured" cellRenderer={boolRenderer}/>
<AgGridColumn headerName={"Vaccinated"}field="isVaccinated" cellRenderer={boolRenderer}/>
<AgGridColumn headerName={"Potty Trained"} field="isPottyTrained" cellRenderer={boolRenderer} />
<AgGridColumn headerName={"Leash Trained"} field="isLeashTrained" cellRenderer={boolRenderer} />
<AgGridColumn headerName={"Action"} field="_id" cellRenderer={linkRenderer} /> */}