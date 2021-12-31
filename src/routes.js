// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Access from "views/Dashboard/Access.js";
import Users from "views/Dashboard/Users";

import { HomeIcon, PersonIcon } from "components/Icons/Icons";
import { UnlockIcon } from "@chakra-ui/icons";
import ComingSoon from "views/Dashboard/ComingSoon";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: ComingSoon,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Usuarios",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/access",
    name: "Accesos",
    rtlName: "لوحة القيادة",
    icon: <UnlockIcon color="inherit" />,
    component: Access,
    layout: "/admin",
  },
];
export default dashRoutes;
