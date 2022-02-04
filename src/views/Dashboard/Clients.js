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
  InputGroup,
  InputLeftAddon,
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
import { usePagination } from "../../hooks/usePagination";
import Pagination from "components/Tables/Pagination";
import Dropzone from "components/Dropzone/Dropzone";
import ClientsClass from "apis/clients";
import { useHistory } from "react-router-dom";
import { cleanClientSelected } from "store/slices/clients";
import { selectClient } from "store/slices/clients";

export default function Clients() {
  const dispatch = useDispatch();
  const stateClients = useSelector(getClientsState);
  const clients = useSelector(getClients);
  const textColor = useColorModeValue("gray.700", "white");
  const [clientSelected, setClientSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
    total,
  } = usePagination(clients, searchText);
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
  const [isOpenUpload, setIsOpenUpload] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  useEffect(() => {
    dispatch(loadClients());
  }, []);

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
    dispatch(selectClient(client.idPerson));
    history.push("/admin/addClient");
  };

  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateData = () => {
    if (Object.values(form).some((value) => value === "")) {
      toast({
        title: "Error",
        description: "Debe llenar todos los campos",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      if (clientSelected) {
        dispatch(
          updateClient({
            ...form,
            idUser: clientSelected.idClient,
            clientPhoneNumber: form.clientPhoneNumber.trim(),
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
        dispatch(
          createClient({
            ...form,
            clientPhoneNumber: form.clientPhoneNumber.trim(),
          })
        );
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
  const handleUpload = (client) => {
    setClientSelected(client);
    setIsOpenUpload(true);
  };
  const sendFile = async () => {
    console.log({
      files: file,
      idClient: clientSelected.idClient,
    });
    try {
      const clients = new ClientsClass();
      console.log("before");
      await clients.uploadFile({
        files: file,
        idClient: clientSelected.idClient,
      });
      console.log("after");
      toast({
        title: "Transaccion Finalizada.",
        description: "Archivo subido correctamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsOpenUpload(false);
    } catch (error) {
      toast({
        title: "Error.",
        description: "Hubo un error.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
      setIsOpenUpload(false);
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
          width: "100%",
        }}
      >
        <Flex flexDirection={"column"} pt={20} flexGrow={1}>
          <Button
            alignSelf={"flex-start"}
            leftIcon={<AddIcon />}
            onClick={() => {
              dispatch(cleanClientSelected());
              history.push("/admin/addClient");
            }}
          >
            Agregar
          </Button>
          <Text
            pt={6}
            fontSize={"xl"}
            textAlign={"center"}
            alignSelf={"center"}
            color={textColor}
          >
            No hay Clientes
          </Text>
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
                  style={{
                    textTransform: "capitalize",
                  }}
                  autoCapitalize="on"
                  value={form.clientName}
                  name="clientName"
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  required
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
                  required
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
                  required
                  placeholder="Direccion del Cliente"
                  size="lg"
                  onChange={handleChangeInput}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  N&uacute;mero de Tel&eacute;fono
                </FormLabel>
                <InputGroup size={"lg"}>
                  <InputLeftAddon children="+51" size={"lg"} p={4} />
                  <Input
                    name="clientPhoneNumber"
                    value={form.clientPhoneNumber}
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type="text"
                    required
                    placeholder="Numero de Telefono"
                    onChange={handleChangeInput}
                    maxLength={9}
                  />
                </InputGroup>
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
                  required
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
                  required
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
        </Flex>
      </div>
    );

  return (
    <Flex
      width={"100%"}
      flexDirection={"column"}
      pt={{ base: "120px", md: "100px" }}
    >
      <Dropzone
        openModal={isOpenUpload}
        setOpenModal={setIsOpenUpload}
        sendFile={sendFile}
        handleChangeFile={(file) => setFile(file)}
      />
      <Button
        alignSelf={"flex-end"}
        leftIcon={<AddIcon />}
        onClick={() => {
          dispatch(cleanClientSelected());
          history.push("/admin/addClient");
        }}
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
              style={{
                textTransform: "capitalize",
              }}
              value={form.clientName}
              name="clientName"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              required
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
              required
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
              required
              placeholder="Direccion del Cliente"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              N&uacute;mero de Tel&eacute;fono
            </FormLabel>
            <InputGroup size={"lg"}>
              <InputLeftAddon children="+51" size={"lg"} p={4} />
              <Input
                name="clientPhoneNumber"
                value={form.clientPhoneNumber}
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="text"
                required
                placeholder="Numero de Telefono"
                onChange={handleChangeInput}
                maxLength={9}
              />
            </InputGroup>
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
              required
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
              required
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
          <Flex
            flexGrow={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Tabla de Clientes
            </Text>
            <Input
              width={{ sm: "100%", md: "50%" }}
              name="search"
              borderRadius="15px"
              size="lg"
              type="text"
              required
              placeholder="Buscar"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Flex>
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
                  Edad
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
                <Th textAlign={"center"} color="gray.400">
                  Reporte Sentinel
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return (
                  <ClientsTable
                    data={row}
                    handleUpdate={handleSelectUser}
                    handleDelete={openDialogDelete}
                    handleUpload={handleUpload}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
        <Pagination
          length={total}
          handlePrev={handleDecrease}
          currentPage={currentPage}
          handleNext={handleIncrease}
        />
      </Card>
    </Flex>
  );
}
