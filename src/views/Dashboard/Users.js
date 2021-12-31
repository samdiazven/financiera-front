import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  FormLabel,
  Spinner,
  Select,
  useToast,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { LoadState } from "store/slices/state";
import { getUsers, getUsersState } from "store/selectors/users";
import { loadUsers } from "store/slices/users";
import { updateUser } from "store/slices/users";
import { createUser } from "store/slices/users";
import { deleteUser } from "store/slices/users";
import UsersTable from "components/Tables/Users";
import { getRols } from "../../store/selectors/rols";

export default function Users() {
  const dispatch = useDispatch();
  const stateUsers = useSelector(getUsersState);
  const users = useSelector(getUsers);
  const rols = useSelector(getRols);
  const textColor = useColorModeValue("gray.700", "white");
  const [userSelected, setUserSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    username: "",
    name: "",
    lastname: "",
    password: "",
    idRol: userSelected ? userSelected.idRol : 1,
  });
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  useEffect(() => {
    if (stateUsers === LoadState.NOT_LOADED) {
      dispatch(loadUsers());
    }
  }, [stateUsers]);

  const handleOpen = () => {
    setUserSelected(null);
    setForm({
      username: "",
      lastname: "",
      name: "",
      password: "",
      idRol: 1,
    });
    onOpen();
  };
  const handleSelectUser = (user) => {
    setUserSelected(user);
    setForm({
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      idRol: user.idRol,
    });
    onOpen();
  };

  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateData = () => {
    try {
      if (userSelected) {
        dispatch(
          updateUser({
            ...form,
            idUser: userSelected.idUser,
            password: form.password.length > 0 ? form.password : undefined,
          })
        );
        toast({
          title: "Transaccion Finalizada.",
          description: "Usuario actualizado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        dispatch(createUser(form));
        toast({
          title: "Transaccion Finalizada.",
          description: "Usuario creado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log(error);

      onClose();
      toast({
        title: "Error.",
        description: "Hubo un error.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const openDialogDelete = (rol) => {
    setUserSelected(rol);
    setIsOpenDelete(true);
  };
  const handleDelete = () => {
    try {
      dispatch(deleteUser(userSelected.idUser));
      onCloseDelete();
      toast({
        title: "Transaccion Finalizada.",
        description: "Usuario eliminado correctamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: "Hubo un error.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      onCloseDelete();
    }
  };

  if (stateUsers === LoadState.LOADING)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Spinner size={"xl"} />{" "}
      </div>
    );

  if (stateUsers === LoadState.ERROR) {
    return <div>Error</div>;
  }

  if (users.length === 0) return <div> No Data </div>;
  return (
    <Flex
      width={"100%"}
      flexDirection={"column"}
      pt={{ base: "120px", md: "100px" }}
    >
      <Button
        alignSelf={"flex-end"}
        leftIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Agregar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre de Usuario
            </FormLabel>
            <Input
              value={form.username}
              name="username"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Usuario"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre
            </FormLabel>
            <Input
              value={form.name}
              name="name"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Nombre del Usuario"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Apellido
            </FormLabel>
            <Input
              value={form.lastname}
              name="lastname"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Apellido del Usuario"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Rol
            </FormLabel>
            <Select
              variant="outline"
              value={form.idRol}
              name="idRol"
              borderRadius="15px"
              size="lg"
              mb="36px"
              fontSize="sm"
              onChange={handleChangeInput}
            >
              {rols.map((rol) => (
                <option key={rol.idRol} value={rol.idRol}>
                  {rol.rolName}
                </option>
              ))}
            </Select>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Contrase&ntilde;a
            </FormLabel>
            <Input
              name="password"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Contraseña"
              size="lg"
              onChange={handleChangeInput}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="ghost" onClick={handleCreateData}>
              Guardar Datos
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Borrar Usuario
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de borrar el usuario?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Card
        marginTop={{ base: "10px", md: "20px" }}
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Tabla de usuarios
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th textAlign={"center"} pl="0px" color="gray.400">
                  Usuario
                </Th>
                <Th textAlign={"center"} pl="0px" color="gray.400">
                  Nombre
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Apellido
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Nombre de Rol
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Editar
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Eliminar
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((row) => {
                return (
                  <UsersTable
                    data={row}
                    handleUpdate={handleSelectUser}
                    handleDelete={openDialogDelete}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}
