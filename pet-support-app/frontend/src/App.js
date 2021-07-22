import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.10.0";

import AdminLayout from "./layouts/Admin.js";
import LoginLayout from "./views/Login.js";
import Page404Layout from "./views/Page404";
function App() {
  return (
  <BrowserRouter>
    <Switch>
    <Route path="/admin" component={AdminLayout}/>
      {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />
      <Route path="/404" render={(props) => <Page404Layout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
  );
}
export default App;



// //import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"

// import Navbar from "./components/navbar.component"
// import UsersList from "./views/UserList";
// import EditUser from "./components/User/EditUser";
// import Shelter from "./views/ShelterList.js";
// import CreateUser from "./components/User/CreateUser";

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Navbar />
//         <br />
//         <Route path="/" exact component={UsersList} />
//         <Route path="/edit/:id" component={EditUser} />
//         {<Route path="/add" component={Shelter} />}
//         <Route path="/user" component={CreateUser} />
//       </div>
//     </Router>
//   );
// }

// export default App;



