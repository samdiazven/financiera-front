import React, { useState, useEffect } from "react";
import { Select } from "chakra-react-select";
import {
  Flex,
  Text,
  Input,
  Thead,
  Th,
  Tr,
  Tbody,
  Table,
  Heading,
  useColorModeValue,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  useDisclosure,
  FormLabel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Pagination from "components/Tables/Pagination";
import { usePagination } from "hooks/usePagination";
import ClientsTable from "components/Tables/Clients";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "store/selectors/clients";
import { getClientsState } from "store/selectors/clients";
import { loadClients } from "store/slices/clients";
import { LoadState } from "store/slices/state";
import Loan from "apis/loans";
import Axios from "apis/axios";

function Clients({ clients, addToLoan, setRandom }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const clientsApp = useSelector(getClients);
  const clientsAppState = useSelector(getClientsState);
  const [stateNumber, setStateNumber] = useState(0);
  const toast = useToast();
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(clients, searchText);
  const textColor = useColorModeValue("gray.700", "white");
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const [loanAmounts, setLoanAmounts] = React.useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  useEffect(() => {
    dispatch(loadClients());
  }, []);

  useEffect(() => {
    async function getLoanAmount() {
      const response = await Axios.get("/loanAmount");
      setLoanAmounts(response.data.objModel);
    }
    getLoanAmount();
  }, []);
  const handleDelete = async () => {
    const loanInstance = new Loan();
    try {
      await loanInstance.removeUserFromLoan(selectedClient.idClient);
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado del grupo",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setRandom(Math.random() * 100);
      setStateNumber(stateNumber + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cliente del grupo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
    onCloseDelete();
  };
  const openDialogDelete = (client) => {
    setIsOpenDelete(true);
    console.log(client);
    setSelectedClient(client);
  };
  const arrFilter = clientsApp.map((client) => {
    const find = clients
      ? clients.find((c) => c.idClient === client.idClient)
      : [];
    if (find) {
      return null;
    }
    return {
      value: client.idClient,
      label: client.clientName,
    };
  });
  const arrSearch = arrFilter.reduce((acc, curr) => {
    if (curr) {
      acc.push(curr);
    }
    return acc;
  }, []);
  if (loanAmounts.length === 0) {
    return <Spinner size={"lg"} alignSelf={"center"} />;
  }
  if (!clients)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Flex flexDirection={"column"} flexGrow={1}>
          <Button alignSelf={"flex-start"} onClick={onOpen}>
            Agregar Cliente <AddIcon ml={4} />
          </Button>
          <Text
            pt={6}
            fontSize={"xl"}
            textAlign={"center"}
            alignSelf={"center"}
          >
            No hay Clientes
          </Text>
        </Flex>

        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
              <Heading size="md">Agregar</Heading>
            </ModalHeader>
            <ModalBody>
              <FormLabel>
                <Text
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "white")}
                >
                  Clientes
                </Text>
              </FormLabel>
              <Select
                onChange={(e) => setSelectedClient(e.value)}
                isMulti={false}
                options={
                  clientsApp
                    ? clientsApp.map((client) => {
                        return {
                          value: client.idClient,
                          label: `${client.clientName} ${client.clientLastname}`,
                        };
                      })
                    : [
                        {
                          value: 0,
                          label: "No hay clientes",
                        },
                      ]
                }
              />
              <FormLabel>
                <Text
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "white")}
                >
                  Monto del prestamo
                </Text>
              </FormLabel>
              <Select
                onChange={(e) => setSelectedAmount(e.value)}
                isMulti={false}
                options={loanAmounts.map((item) => ({
                  value: item.idLoanAmount,
                  label: item.amount,
                }))}
              />
            </ModalBody>
            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  addToLoan(selectedClient, selectedAmount);
                  onClose();
                  setSelectedClient(null);
                }}
                variantColor="blue"
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );

  return (
    <Flex>
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
              <Button onClick={onCloseDelete}>Cancelar</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Actualizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
            <Heading size="md">Agregar</Heading>
          </ModalHeader>
          <ModalBody>
            <FormLabel>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Clientes
              </Text>
            </FormLabel>
            <Select
              onChange={(e) => setSelectedClient(e.value)}
              isMulti={false}
              options={
                clientsApp
                  ? arrSearch
                  : [
                      {
                        value: 0,
                        label: "No hay clientes",
                      },
                    ]
              }
            />
            <FormLabel>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
                mt={4}
              >
                Monto del prestamo
              </Text>
            </FormLabel>
            <Select
              onChange={(e) => setSelectedAmount(e.value)}
              isMulti={false}
              options={loanAmounts.map((item) => ({
                value: item.idLoanAmount,
                label: item.amount,
              }))}
            />
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                addToLoan(selectedClient, selectedAmount);
                onClose();
                setSelectedClient(null);
              }}
              variantColor="blue"
            >
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card>
        <Button alignSelf={"flex-start"} onClick={onOpen}>
          Agregar Cliente <AddIcon ml={4} />
        </Button>
        <CardHeader p="6px 0px 22px 0px">
          <Flex
            flexGrow={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Heading size="lg" color={textColor} fontWeight="bold">
              Clientes
            </Heading>
            <Input
              width={{ sm: "100%", md: "50%" }}
              name="search"
              borderRadius="15px"
              size="lg"
              type="text"
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
                  Monto del prestamo
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
                  Eliminar
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return (
                  <ClientsTable
                    data={row}
                    handleDelete={openDialogDelete}
                    hasAmount
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
        <Pagination
          length={filteredData().length}
          handlePrev={handleDecrease}
          currentPage={currentPage}
          handleNext={handleIncrease}
        />
      </Card>
    </Flex>
  );
}

export default Clients;
