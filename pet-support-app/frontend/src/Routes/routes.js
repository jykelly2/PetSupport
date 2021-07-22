/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import CreateUser from "../views/User/CreateUser";
import EditUser from "../views/User/EditUser";
import UserProfile from "../views/User/UserProfile.js";
import CreateShelter from "../views/Shelter/CreateShelter";
import EditShelter from "../views/Shelter/EditShelter";
import CreateAnimal from "../views/Animal/CreateAnimal";
import ViewAnimal from "../views/Animal/ViewAnimal";
import EditAnimal from "../views/Animal/EditAnimal";
import EditBooking from "../views/Booking/EditBooking";
import Login from "../views/Login.js";
import Page404 from "../views/Page404";
import { roles } from '../utils';

const adminRoutes = [
  {
    path: "/user/create",
    name: "User Create",
    component: CreateUser,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/user/edit/:id",
    name: "User Edit",
    component: EditUser,
    layout: "/admin",
    role: roles.Staff,
  },
  {
    path: "/shelter/add",
    name: "Shelter Add",
    component: CreateShelter,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/shelter/edit/:id",
    name: "Shelter Edit",
    component: EditShelter,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/user/profile",
    name: "User Profile",
    component: UserProfile,
    layout: "/admin",
    role: roles.Staff,
  },
  {
    path: "/animal/add",
    name: "Animal Add",
    component: CreateAnimal,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/animal/view/:id",
    name: "Animal View",
    component: ViewAnimal,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/animal/edit/:id",
    name: "Edit Animal",
    component: EditAnimal,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/booking/edit/:id",
    name: "Edit Booking",
    component: EditBooking,
    layout: "/admin",
    role: roles.Administrator,
  },
  {
    path: "/login",
    name: "login",
    layout: "/",
    component: Login,
    role: roles.Staff,
  },
  {
    path: "/404",
    name: "404",
    layout: "/",
    component: Page404,
    role: roles.Staff,
  },
];

export default adminRoutes;
