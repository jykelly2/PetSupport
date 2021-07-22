import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
  );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
//import reportWebVitals from './reportWebVitals';

// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/scss/light-bootstrap-dashboard-react.scss?v=0.1.0";
// import "./assets/css/demo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// import AdminLayout from "./layouts/Admin.js";
// import LoginLayout from "./views/Login.js";

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//       <Route path="/" render={(props) => <LoginLayout {...props} />} />
//       <Redirect from="/" to="/login" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

//reportWebVitals();
