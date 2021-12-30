// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import { getUser } from "store/selectors/auth";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { signOut } from "store/slices/auth";
import { useHistory } from "react-router-dom";
export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const user = useSelector(getUser);
  const name = user ? `${user.name} ${user.lastname}` : "";
  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");
  const dispatch = useDispatch();
  const history = useHistory();
  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const handleSignOut = () => {
    dispatch(signOut());
    history.replace("/auth/signin");
  };
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : (
              ""
            )
          }
        >
          <Text display={{ sm: "none", md: "flex" }}>{name}</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <Button onClick={handleSignOut} variant={"transparent"}>
        <Flex alignItems={"center"}>
          <ArrowBackIcon color={navbarIcon} w="18px" h="18px" mx={2} />
          <Text display={{ sm: "none", md: "flex" }}>Cerrar Sesi&oacute;n</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
