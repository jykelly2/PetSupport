import React, { useEffect, useState} from 'react';
import Links from '../../components/Table/Links'
import Avatars from 'components/Table/Avatars'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../../actions/UserActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import  '../../assets/css/table.css'
import { roles, pageSize, bucketType, linkType } from '../../utils';
import ReactSelect from 'components/CustomInput/ReactSelect'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
//style
import { makeStyles} from "@material-ui/core/styles";
import styles from 'assets/jss/material-dashboard-react/views/Users/userListStyle'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import FormatAlignCenterOutlinedIcon from '@material-ui/icons/FormatAlignCenterOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import AddIcon from '@material-ui/icons/Add';

import {
  USER_DELETE_RESET,
} from '../../constants/UserConstants';

const useStyles = makeStyles(styles);

export default function UsersList(props){
  const classes = useStyles();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, role} = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete,} = userDelete;

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [isAutoSize, setIsAutoSize] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers());
    return function cleanup() {
      window.onresize = null
    };
  }, [dispatch, successDelete]);

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteUser(userId));
    }
  };

  const getUserColumnDefs = (userRole) => {
    var columnDefs = [
          {headerName: 'Name', field:'data.data', 
          cellRenderer: "avatars", minWidth: 250, 
          cellRendererParams: {
            bucketType: bucketType.Staff
          },
          filter: true,  floatingFilter: true, checkboxSelection: true,
          valueGetter: 
          function nameField(params) {
                    return  params.data.firstname +' '+ params.data.lastname
          } 
        },
          {headerName: 'Role', field:'role'},
          {headerName: 'Email',field:'email', minWidth: 250},
    ]
    if (userRole === roles.Administrator){
      columnDefs.push({headerName: '', field:'_id', minWidth: 80, maxWidth:80, type:"rightAligned", cellRenderer: "links", filter: false,
      cellRendererParams: {
        linkType: linkType.Staff
      }
      // cellRendererParams: {
      //     clicked: function(id) {
      //      deleteHandler(id)
      //     }
      // }
    
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
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    let allColumns = params.columnApi.getAllColumns()
    if (window.innerWidth < 830)
      params.columnApi.autoSizeColumns(allColumns, false);
    else 
      params.api.sizeColumnsToFit()

     window.onresize = () => {
      if (window.innerWidth < 830)
            params.columnApi.autoSizeColumns(allColumns, false);
        else
          params.api.sizeColumnsToFit();
     }
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
    gridApi.exportDataAsCsv({fileName:"User Data"});
  };

  const onPageSizeChanged = (newPageSize) => {
      gridApi.paginationSetPageSize(Number(newPageSize));
  };

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
              pageTitle={"User List"}
            />
        </GridItem>    

        <GridItem xs={4} sm={4} md={4}>
            <div className={classes.flexEnd}>
            {role == roles.Administrator? 
             <Button color="info" size="md" className={classes.featureButton}
                  href={"user/create"}
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
                  columnDefs={getUserColumnDefs(role)}
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
                  // onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                  onGridReady={params => onGridReady(params)}
                  frameworkComponents={frameworkComponents}
                  rowData={users}>
                  </AgGridReact>
                  </CardBody> 
          </Card>
        </GridItem>
        </GridContainer>
        )} 
  </div> 
  );
}

   // onFirstDataRendered = (params) => {
  //     // this.sizeToFit();
  //   this.autoSizeAll(false);
  // }
  
  // const hideColumns = () => {
  //   this.setState({
  //     columnDefs: [
  //       {headerName: '', field:'picture', cellRenderer: "pictures", filter: false,  floatingFilter: true},
  //       {headerName: 'First Name', field:'firstname'},
  //       {headerName: 'Last Name', field:'lastname'},
  //       {headerName: 'Email', field:'email'},
  //   ]});
  //   this.state.gridApi.setColumnDefs(this.state.columnDefs)
  // }

/*export default class UsersList extends Component {
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this)
        this.onPageSizeChanged = this.onPageSizeChanged.bind(this)

        this.state = {
          modules: AllCommunityModules,
          users: null,
          columnDefs: [
            
            {headerName: 'User',
            children: [{headerName: '', field:'picture', cellRenderer: "pictures", minWidth: 150,filter: false,  floatingFilter: true, checkboxSelection: true,},{headerName: 'First Name', field:'firstname'},
            {headerName: 'Last Name', field:'lastname'},]},
            {headerName: 'Account Details', children: [{headerName: 'Role', field:'role'},{headerName: 'Email',field:'email'},
            {headerName: 'Action', field:'_id', cellRenderer: "links"}]},
          ],
          frameworkComponents: {
            links: Links,
            pictures: UserPictures,
          },
          defaultColDef: {
            editable: true,
            sortable: true,
            // flex: 1,
            // wrapText: true,
            // autoHeight: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
          },
          rowSelection: 'multiple',
          rowGroupPanelShow: 'always',
          rowHeight: 100,
          pivotPanelShow: 'always',
          paginationPageSize: 10,
          paginationNumberFormatter: function (params) {
            return '[' + params.value.toLocaleString() + ']';
          },

           gridApi: null,
            gridColumnApi: null,
            rowData: null,
           role:"",
        };
    }

    componentDidMount(){
      const token = sessionStorage.getItem('user');
        axios.get('http://localhost:5000/users/', {
          headers:{"authorization": token},
        })
        .then (response =>{
          const role = response.data.role

            if (role!=="Staff")
             //this.hideColumns()
            
            this.setState({
              users: response.data.users, 
              role: role
            })
          }
        )
        .catch((error) => {
            console.log(error);
        })
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
    }

    onGridReady = (params) => {
      this.setState({
        gridApi :params.api,
        gridColumnApi: params.columnApi,
      });

      params.api.sizeColumnsToFit();
      window.addEventListener('resize', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit();
          params.api.resetRowHeights();
        });
      });

      

      // this.gridApi.forEachNode(function (rowNode) {
      //     rowNode.setRowHeight("5rem");
      // });
      // this.gridApi.onRowHeightChanged();
  
      // params.api.sizeColumnsToFit();
      // this.state.gridApi.setDomLayout('autoWidth');
    }

    // onFirstDataRendered = (params) => {
    //     // this.sizeToFit();
    //   this.autoSizeAll(false);
    // }

    getSelectedRows = () => {
      const selectedNodes = this.state.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      console.log(selectedData)
    }

    sizeToFit = () => {
      this.state.gridApi.sizeColumnsToFit();
    };

    hideColumns = () => {
      this.setState({
        columnDefs: [
          {headerName: '', field:'picture', cellRenderer: "pictures", filter: false,  floatingFilter: true},
          {headerName: 'First Name', field:'firstname'},
          {headerName: 'Last Name', field:'lastname'},
          {headerName: 'Email', field:'email'},
      ]});
      this.state.gridApi.setColumnDefs(this.state.columnDefs)
    }


    autoSizeAll = (skipHeader) => {
      var allColumnIds = [];
      this.state.gridColumnApi.getAllColumns().forEach(function (column) {
        if (column.colId === "picture")
          console.log("hrere")
        else
          allColumnIds.push(column.colId);
      });
      this.state.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    };

    onBtnExport = () => {
      this.state.gridApi.exportDataAsCsv({fileName:"User Data"});
    };
    onPageSizeChanged (e) {
    console.log(e)
      //var value = document.getElementById('page-size').value;
      this.state.gridApi.paginationSetPageSize(Number(e));
    };

    render() {
        return (
          <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                <Row>
                    <Col md="4">
                    <Card.Title as="h4">Users List</Card.Title>
                    </Col>
                    <Col md="8">
                    <Link to={"create"} >
                    <Button className="btn-fill float-right " variant="success">
                        Create New 
                    </Button>
                </Link>
                    </Col>
                </Row>
                  <p className="card-category">
                    List of Users managing users
                  </p>
                   <div>
                      <div className="example-header">
                        Page Size:
                        <DropdownButton onSelect={this.onPageSizeChanged} id="page-size" title="10">
                          <Dropdown.Item eventKey="10">10</Dropdown.Item>
                          <Dropdown.Item  eventKey="2">2</Dropdown.Item>
                          <Dropdown.Item  eventKey="3">3</Dropdown.Item>
                          <Dropdown.Item  eventKey="100">100</Dropdown.Item>
                        </DropdownButton>
                    </div>
                <Button className="btn-fill mr-2" variant="primary" onClick={() => this.onBtnExport()}>Download CSV File</Button> 
                <Button className="btn-fill mr-2" variant="primary" onClick={() => this.getSelectedRows()}>Get Selected Rows</Button>
                <Button className="btn-fill mr-2" variant="primary" onClick={() => this.sizeToFit()}>Size to Fit</Button>
                <Button className="btn-fill" variant="primary" onClick={() => this.autoSizeAll(false)}>Auto-Size All</Button>
                </div>
                </Card.Header>
                <Card.Body className={"ag-theme-alpine"} style={{height: '100vh' }}>
             <AgGridReact
                  modules={this.state.modules}
                  defaultColDef={this.state.defaultColDef}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.users}
                  rowHeight={this.state.rowHeight}
                  suppressExcelExport={true}
                  rowSelection={this.state.rowSelection}
                  rowGroupPanelShow={this.state.rowGroupPanelShow}
                  pivotPanelShow={this.state.pivotPanelShow}
                  enableRangeSelection={true}
                  pagination={true}
                  paginationPageSize={this.state.paginationPageSize}
                  paginationNumberFormatter={this.state.paginationNumberFormatter}
                  // onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                  frameworkComponents={this.state.frameworkComponents}
                  onGridReady={params => this.onGridReady(params)}>
                  </AgGridReact>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        )
    }
}

//<Link to="create" className="nav-link">Add</Link> 
// const User = props => (
//     <tr>
//       <td>{props.user.username}</td>
//       <td>
//       <Link to={"edit/"+props.user._id}>
//         <Button className="btn-fill" variant="info">
//           Edit  
//         </Button>
//       </Link> 
//       </td>
//       <td>
//       <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>
//         <Button className="btn-fill" variant="danger">
//           Delete 
//         </Button>
//       </a>
//       </td>
//     </tr>
//   )

    // userList() {
    //     return this.state.users.map(currentuser => {
    //       return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    //     })
    // }

    // getUserPicture(index, picture){
    //   console.log(picture)
    //   axios.get('http://localhost:5000/images/getImage/'+picture)
    //   .then(response => {
    //     if (response != null){
    //       let newState =  this.state.users
    //       newState[index].picture = response.config.url
    //       this.setState({
    //         users: newState
    //       })
    //     }
    //     console.log(this.state.users)
    //   })
    // }

      // for (var i in response.data.users) {
            //   const user = response.data.users[i]
            //   console.log(user.picture)
            //   if (user.picture != ""){
            //     this.getUserPicture(i, user.picture)
            //   }
            // }*/