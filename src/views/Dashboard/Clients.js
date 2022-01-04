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
import ClientsTable from "components/Tables/Clients";

export default function Clients() {
  const dispatch = useDispatch();
  const stateClients = useSelector(getClientsState);
  const clients = useSelector(getClients);
  const textColor = useColorModeValue("gray.700", "white");
  const [clientSelected, setClientSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    clientName: "",
    clientLastname: "",
    documentNumber: "",
    clientAddress: "",
    clientPhoneNumber: "",
    idDocumentType: 1,
    clientDateOfBirth: "",
    idFinancialState: 1,
    idClientState: 1,
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
      clientName: "",
      clientLastname: "",
      clientAddress: "",
      documentNumber: "",
      clientPhoneNumber: "",
      idDocumentType: 1,
      clientDateOfBirth: "",
      idFinancialState: 1,
      idClientState: 1,
    });
    onOpen();
  };
  const handleSelectUser = (client) => {
    setClientSelected(client);
    setForm({
      ...client,
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
      if (clientSelected) {
        dispatch(
          updateClient({
            ...form,
            idUser: clientSelected.idClient,
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
        description: "Cliente modificado correctamente.",
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
              value={form.clientName}
              name="clientName"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Nombre"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Apellido
            </FormLabel>
            <Input
              value={form.clientLastname}
              name="clientLastname"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Apellido del Cliente"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Direccion
            </FormLabel>
            <Input
              value={form.clientAddress}
              name="clientAddress"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Direccion del Cliente"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              N&uacute;mero de Tel&eacute;fono
            </FormLabel>
            <Input
              name="clientPhoneNumber"
              value={form.clientPhoneNumber}
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Numero de Telefono"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Tipo de documento
            </FormLabel>
            <Select
              variant="outline"
              value={form.idDocumentType}
              name="idDocumentType"
              borderRadius="15px"
              size="lg"
              mb="36px"
              fontSize="sm"
              onChange={handleChangeInput}
            >
              <option value={1}>DNI</option>
              <option value={2}>Carnet de extranjer&iacute;a</option>
            </Select>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              N&uacute;mero de Documento
            </FormLabel>
            <Input
              name="documentNumber"
              value={form.documentNumber}
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Numero de Documento"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Fecha de nacimiento
            </FormLabel>
            <Input
              name="clientDateOfBirth"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="date"
              placeholder="Fecha de nacimiento"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Estado financiero
            </FormLabel>
            <Select
              variant="outline"
              value={form.idFinancialState}
              name="idFinancialState"
              borderRadius="15px"
              size="lg"
              mb="36px"
              fontSize="sm"
              onChange={handleChangeInput}
            >
              <option value={1}>Solvente</option>
              <option value={2}>En mora</option>
            </Select>
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
              Cambiar estado del cliente
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de actualizar el cliente?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Actualizar
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
                  Nombre
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Apellido
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Direccion
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Nro. Telefono
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Fecha de Nacimiento
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Estado Financiero
                </Th>

                <Th textAlign={"center"} color="gray.400">
                  Editar
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Cambiar Estado
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
