import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Spinner,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// Assets
import signInImage from "assets/img/signInImage.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth";
import useAuth from "hooks/useAuth";
import { LoadState } from "store/slices/state";
import { getError } from "store/selectors/auth";
import { getLoginState } from "store/selectors/auth";
import { useHistory } from "react-router-dom";

function SignIn() {
  // Chakra color mode
  const history = useHistory();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const loginState = useSelector(getLoginState);
  const error = useSelector(getError);
  const toast = useToast();
  useEffect(() => {
    if (token) {
      history.replace("/redirect");
    }
  }, [token]);
  useEffect(() => {
    if (error) {
      toast({
        title: "Error.",
        description: "Usuario o contraseña incorrectos.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);
  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (form.username.trim() === "" && form.password.trim() === "") return;
    e.preventDefault();
    try {
      dispatch(login(form));
    } catch (error) {
      console.log(error);
    }
  };
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  if (loginState === LoadState.LOADING)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Spinner size={"xl"} />{" "}
      </div>
    );
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bievenido!
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Ingresa tu usuario y contraseña para acceder a la plataforma
            </Text>
            <FormControl as="form" onSubmit={handleSubmit}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel>
              <Input
                name="username"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Username"
                size="lg"
                onChange={handleChangeInput}
                required
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <InputGroup size="lg">
                <Input
                  name="password"
                  borderRadius="15px"
                  mb="36px"
                  fontSize="sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  onChange={handleChangeInput}
                  required
                />
                <InputRightElement width={"2.5rem"}>
                  {showPassword ? (
                    <ViewOffIcon onClick={() => setShowPassword(false)} />
                  ) : (
                    <ViewIcon onClick={() => setShowPassword(true)} />
                  )}
                </InputRightElement>
              </InputGroup>

              <Button
                fontSize="10px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                disabled={loginState === LoadState.LOADING}
              >
                INICIAR SESIÓN
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
