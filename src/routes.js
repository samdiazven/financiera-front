// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Access from "views/Dashboard/Access.js";
import Users from "views/Dashboard/Users";
import Clients from "views/Dashboard/Clients";
import Loans from "views/Dashboard/Loans";

import { HomeIcon, PersonIcon, GlobeIcon } from "components/Icons/Icons";
import { UnlockIcon } from "@chakra-ui/icons";
import ComingSoon from "views/Dashboard/ComingSoon";
import { CreditIcon } from "components/Icons/Icons";
import { DocumentIcon } from "components/Icons/Icons";
import Control from "views/Dashboard/Control";
import LayoutMessages from "views/Dashboard/MessageLayout";

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
  {
    path: "/clients",
    name: "Clientes",
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color="inherit" />,
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/loans",
    name: "Prestamos",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Loans,
    layout: "/admin",
  },
  {
    path: "/control",
    name: "Control",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Control,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Mensajes",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color="inherit" />,
    component: LayoutMessages,
    layout: "/admin",
  },
];
export default dashRoutes;
