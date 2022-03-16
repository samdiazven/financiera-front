import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "store/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store/slices/auth";
import { LoadState } from "store/slices/state";
import { getAuthenticationState } from "store/selectors/auth";
import { getUser } from "store/selectors/auth";

function Redirection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const authenticationState = useSelector(getAuthenticationState);

  const handleLogout = () => {
    dispatch(signOut());
    history.replace("/auth/signin");
  };
  const goLoans = () => history.push("/admin/dashboard");
  const goInvestments = () => history.push("/investment");
  return (
    <Stack display={"grid"} placeItems={"center"} h={"100vh"} w={"100vw"}>
      <Heading textAlign={"center"}>
        {" "}
        Escoge el sistema al cual deseas entrar{" "}
      </Heading>
      <Flex
        w={{ base: "80%", md: "40%" }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Button onClick={goLoans}> PRESTAMOS </Button>
        <Button onClick={goInvestments}> INVERSIONES </Button>
      </Flex>
      <Button onClick={handleLogout}>Salir</Button>
    </Stack>
  );
}

export default Redirection;
