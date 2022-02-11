import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "store/slices/auth";

function Redirection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
    history.replace("/auth/signin");
  };
  const goLoans = () => history.push("/admin/dashboard");
  return (
    <Stack display={"grid"} placeItems={"center"} h={"100vh"} w={"100vw"}>
      <Heading> Escoge el sistema al cual deseas entrar </Heading>
      <Flex w={"40%"} justifyContent={"space-around"} alignItems={"center"}>
        <Button onClick={goLoans}> PRESTAMOS </Button>
        <Button disabled> INVERSIONES </Button>
      </Flex>
      <Button onClick={handleLogout}>Salir</Button>
    </Stack>
  );
}

export default Redirection;