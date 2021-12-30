// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Access from "views/Dashboard/Access.js";

import { HomeIcon } from "components/Icons/Icons";
import { UnlockIcon } from "@chakra-ui/icons";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
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
