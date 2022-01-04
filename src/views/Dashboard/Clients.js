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
import { getClientsState } from "store/selectors/clients";
import { getClients } from "store/selectors/clients";
import { loadClients } from "store/slices/clients";
import { updateClient } from "store/slices/clients";
import { createClient } from "store/slices/clients";
import { deleteClient } from "store/slices/clients";

export default function Clients() {
  const dispatch = useDispatch();
  const stateClients = useSelector(getClientsState);
  const clients = useSelector(getClients);
  const textColor = useColorModeValue("gray.700", "white");
  const [clientSelected, setClientSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastname: "",
    password: "",
  });
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  useEffect(() => {
    if (stateClients === LoadState.NOT_LOADED) {
      dispatch(loadClients());
    }
  }, [stateClients]);

  const handleOpen = () => {
    setClientSelected(null);
    setForm({
      username: "",
      lastname: "",
      name: "",
      password: "",
    });
    onOpen();
  };
  const handleSelectUser = (client) => {
    setClienteSelected(client);
    setForm({
      username: client.username,
      name: client.name,
      lastname: client.lastname,
      password: client.password,
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
          updateClient({
            ...form,
            idUser: userSelected.idUser,
            password: form.password.length > 0 ? form.password : undefined,
          })
        );
        toast({
          title: "Transaccion Finalizada.",
          description: "Cliente actualizado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        dispatch(createClient(form));
        toast({
          title: "Transaccion Finalizada.",
          description: "Cliente creado correctamente.",
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
  const openDialogDelete = (client) => {
    setClientSelected(client);
    setIsOpenDelete(true);
  };
  const handleDelete = () => {
    try {
      dispatch(deleteClient(clientSelected.idClient));
      onCloseDelete();
      toast({
        title: "Transaccion Finalizada.",
        description: "Cliente eliminado correctamente.",
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

  if (stateClients === LoadState.LOADING)
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

  if (stateClients === LoadState.ERROR) {
    return <div>Error</div>;
  }

  if (clients.length === 0)
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
        {" "}
        No Data{" "}
      </div>
    );
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
          <ModalHeader>Crear Cliente</ModalHeader>
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
              Borrar Cliente
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de borrar el cliente?
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
            Tabla de Clientes
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
                  Editar
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Eliminar
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((row) => {
                return (
                  <ClientsTable
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
