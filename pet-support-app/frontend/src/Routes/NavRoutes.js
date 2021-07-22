// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import GroupIcon from '@material-ui/icons/Group';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PetsIcon from '@material-ui/icons/Pets';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';

import Dashboard from "../views/Dashboard.js";
import UsersList from "../views/User/UserList";
import AnimalsList from "../views/Animal/AnimalList";
import BookingsList from "../views/Booking/BookingList";
import ViewShelter from "../views/Shelter/ViewShelter";

import { roles } from '../utils';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardOutlinedIcon,
    component: Dashboard,
    layout: "/admin",
    activePaths: ["dashboard"],
    role: roles.Staff,
  },
  {
    path: "/shelter",
    name: "Shelter",
    icon: HomeOutlinedIcon,
    component: ViewShelter,
    layout: "/admin",
    activePaths: ["shelter"],
    role: roles.Administrator,
  },
  {
    path: "/users",
    name: "Users",
    icon: GroupOutlinedIcon,
    component: UsersList,
    layout: "/admin",
    activePaths: ["users", "user"],
    role: roles.Administrator,
  },
  {
    path: "/animals",
    name: "Animals",
    icon: PetsOutlinedIcon,
    component: AnimalsList,
    layout: "/admin",
    activePaths: ["animals", "animal"],
    role: roles.Staff,
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: EventNoteOutlinedIcon,
    component: BookingsList,
    layout: "/admin",
    activePaths: ["bookings", "booking"],
    role: roles.Staff,
  },
  ];

export default dashboardRoutes;
