import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { authenticateUser } from '../actions/UserActions';
import { roles } from '../utils';
import MessageBox from '../components/MessageBox';
import clsx from 'clsx';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import navRoutes from "../routes/NavRoutes.js";
import adminRoutes from "../routes/Routes.js";

//styles
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

let ps;
const allRoutes = [...adminRoutes, ...navRoutes];
const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {

  const userAuthenticate = useSelector((state) => state.userAuthenticate);
  const { success, loading, user, error, pictureSrc} = userAuthenticate;
  const dispatch = useDispatch();

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [color, setColor] = React.useState("purple");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(window.innerWidth <= 960? true: false);
  const [iconLabelsOpen, setIconLabelsOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleIconDrawerToggle = () => {
    setIconLabelsOpen(!iconLabelsOpen)
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
      setMobile(false)
    }
  };
  const resizeSmallFunction = () => {
    if (window.innerWidth <= 960) {
      setIconLabelsOpen(false);
      setMobile(true)
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
   dispatch(authenticateUser())
  if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    window.addEventListener("resize", resizeSmallFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
      window.removeEventListener("resize", resizeSmallFunction);
    };
  }, [dispatch]);

  const getRoutesByUserRole = (routes) => {
   return <Switch>
      {routes.map((prop, key) => {
          if (user.role === roles.Administrator || user.role === prop.role || prop.role === roles.Staff){
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/admin" to="/404" />
    </Switch>
  }

  const getNavRoutesByUserRole = (navRoutes) => {
     return navRoutes.filter(function (prop) {
      return user.role === roles.Administrator || prop.role === roles.Staff || prop.role === user.role
    });
  }
    
  return (
    <div>
    {loading ? (null
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"} openDuration={4000} ></MessageBox>
      ) : ( 
    <div className={classes.wrapper}>
      <Sidebar
        user={user}
        routes={getNavRoutesByUserRole(navRoutes)}
        profileImg={pictureSrc}
        handleDrawerToggle={handleDrawerToggle}
        handleIconDrawerToggle={handleIconDrawerToggle}
        mobileOpen={mobileOpen}
        labelsOpen={iconLabelsOpen}
        color={color}
        {...rest}
      />
      <div className={clsx({
            [classes.mainPanel]: iconLabelsOpen,
            [classes.mainPanelLabelClosed]: !iconLabelsOpen,
          })} >
          <Navbar
          profileImg={pictureSrc}
          handleDrawerToggle={handleDrawerToggle}
          handleIconDrawerToggle={handleIconDrawerToggle}
          labelsOpen={iconLabelsOpen}
          {...rest}
        />
    
          <div className={clsx({
            [classes.content]: iconLabelsOpen || mobile,
            [classes.contentLabelClosed]: !iconLabelsOpen,
          })} >
          
            <div className={classes.container}>
              {getRoutesByUserRole(allRoutes)}
              </div>
          </div>
          <Footer 
           mobileOpen={mobileOpen}
           labelsOpen={iconLabelsOpen}
           />
      </div>
    </div>
    )}
    </div>
  );
}

// const allSwitchRoutes =  (
//   <Switch>
//     {allRoutes.map((prop, key) => {
//       if (sessionStorage.getItem('user') != null){
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       }
//       return null;
//     })}
  
//     <Redirect from="/admin" to="/login" />
//   </Switch>
// );