import React, { useEffect, useState} from 'react';
import Links from '../../components/Table/Links'
import Avatars from '../../components/Table/Avatars'
import Chips from '../../components/Table/Chips'
import { useDispatch, useSelector } from 'react-redux';
import { listAnimals} from '../../actions/AnimalActions';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import  '../../assets/css/table.css'
import { roles, pageSize, bucketType, linkType} from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import ReactSelect from 'components/CustomInput/ReactSelect'

//style
import { makeStyles} from "@material-ui/core/styles";
import styles from 'assets/jss/material-dashboard-react/views/Animals/animalListStyle'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import FormatAlignCenterOutlinedIcon from '@material-ui/icons/FormatAlignCenterOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(styles);

export default function AnimalsList(props){
  const classes = useStyles();
  const animalList = useSelector((state) => state.animalList);
  const { loading, error, animals, role} = animalList;

  // const animalDelete = useSelector((state) => state.animalDelete);
  // const { loading: loadingDelete, error: errorDelete, success: successDelete,} = animalDelete;

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [isAutoSize, setIsAutoSize] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (successDelete) {
    //   dispatch({ type: ANIMAL_DELETE_RESET });
    // }
    dispatch(listAnimals());
  }, [dispatch]);//, successDelete]);

  // const deleteHandler = (animalId) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     dispatch(deleteAnimal(animalId));
  //   }
  // };

  const getAnimalColumnDefs = (userRole) => {
    var columnDefs = [
      // {headerName: 'Animal Details',
      // children: [
      //{headerName: '', field:'picture', cellRenderer: "pictures", minWidth: 150,filter: false,  floatingFilter: true, checkboxSelection: true,},
      {headerName: 'Name', field:'data.data', 
      cellRenderer: "avatars", 
      cellRendererParams: {
        bucketType: bucketType.Animal
      },
      minWidth: 250, filter: true,  floatingFilter: true, checkboxSelection: true,
        valueGetter: 
        function avatarField(params) {
                  return  params.data.name
        }
      }, 
      {headerName: 'Animal Type', field:'animalType', minWidth: 170, maxWidth:170},
      {headerName: 'Breed', field:'breed'},
      {headerName: 'Age', field:'age', filter:'agNumberColumnFilter', minWidth: 130, maxWidth:130},
      {headerName: 'Gender', field:'gender',minWidth: 140, maxWidth:140},
    //]},

      // {headerName: 'Documents', 
      // children: [
      {headerName: 'Available', field:'isAvailable', cellRenderer:'chips', minWidth: 150, maxWidth:150,
        filterValueGetter: 
          function availableField(params) { 
                    return  params.data.isAvailable === true ? "yes" : "no"
        }
      },
      {headerName: 'Scheduled', field:'isScheduled',cellRenderer:'chips', minWidth: 160, maxWidth:160,
        filterValueGetter: 
          function scheduledField(params) { 
                    return  params.data.isScheduled === true ? "yes" : "no"
          }
      },
      {headerName: 'Adopted', field:'isAdopted', cellRenderer:'chips', minWidth: 150, maxWidth:150,
        filterValueGetter: 
          function adoptedField(params) { 
                    return  params.data.isAdopted === true ? "yes" : "no"
          }
      },
      {headerName: 'Neuteured', field:'isNeuteured',cellRenderer:boolRenderer, minWidth: 160, maxWidth:160,
        filterValueGetter: 
          function neuteuredField(params) { 
                    return  params.data.isNeuteured === true ? "yes" : "no"
          }
      },
      {headerName: 'Vaccinated', field:'isVaccinated',cellRenderer:boolRenderer, minWidth: 160, maxWidth:160,
        filterValueGetter: 
          function vaccinatedField(params) { 
              return  params.data.isVaccinated === true ? "yes" : "no"
          }
      },
      {headerName: 'Potty Trained', field:'isPottyTrained',cellRenderer:boolRenderer, minWidth: 175, maxWidth:175,
        filterValueGetter: 
          function pottyTrainedField(params) { 
              return  params.data.isPottyTrained === true ? "yes" : "no"
          }
      },
      {headerName: 'Leash Trained', field:'isLeashTrained',cellRenderer:boolRenderer, minWidth: 180, maxWidth:180,
        filterValueGetter: 
          function leashTrainedField(params) { 
              return  params.data.isLeashTrained=== true ? "yes" : "no"
          }
      },
  // ]}
    ]
    if (userRole === roles.Administrator){
        columnDefs.push({headerName: '', field:'_id', type:"rightAligned", cellRenderer: "links", filter: false, minWidth: 120, maxWidth:120,
              cellRendererParams: {
                linkType: linkType.Animal
          }
        })
    }
    return columnDefs
  }
  const  defaultColDef = {
            editable: true,
            sortable: true,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
            filter: true,
            floatingFilter: true,
            resizable: true,
          
  }

  const frameworkComponents = {
    links: Links,
    avatars: Avatars,
    chips: Chips.BoolChips
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
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
      if (column.colId === "picture")
        console.log("hrere")
      else
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

  function boolRenderer(params) {
    return params.value === true ? '<span style="color:green">' + "Yes"+ '</span>': '<span style="color:lightsalmon">' + "No" + '</span>'
  }

  function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
    }
  
    const toggleColumnSize = () =>{
        if (isAutoSize) sizeToFit()
        else autoSizeAll(false)
    }

return (
  <div>
     {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"} openDuration={4000} ></MessageBox>
      ) : ( 
      <GridContainer>
        <GridItem xs={8} sm={8} md={8}>
            <CustomBreadcrumbs
              location={props.location}
              pageTitle={"Animal List"}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <div className={classes.flexEnd}>
            {role == roles.Administrator? 
             <Button color="info" size="md" className={classes.featureButton}
                  href={"animal/add"}
                  startIcon={<AddIcon/>}>
                    New
                  </Button>          
                : null}
            </div>
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
                      suppressRowClickSelection={true}
                      rowMultiSelectWithClick={true}
                      columnDefs={getAnimalColumnDefs(role)}
                      rowSelection={'multiple'}
                      rowGroupPanelShow={'always'}
                      rowHeight={'85'}
                      animateRows={true}
                      suppressColumnVirtualisation={true}
                      paginationPageSize={'10'}
                      paginationNumberFormatter={function (params) {
                        return '[' + params.value.toLocaleString() + ']';
                      }}
                      suppressExcelExport={true}
                      enableRangeSelection={true}
                      pagination={true}
                      onGridReady={params => onGridReady(params)}
                      frameworkComponents={frameworkComponents}
                      rowData={animals}>
            </AgGridReact>
          </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
        )} 
  </div> 
  );
}