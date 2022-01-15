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

function Clients({ clients, addToLoan }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const clientsApp = useSelector(getClients);
  const clientsAppState = useSelector(getClientsState);
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(clients, searchText);
  const textColor = useColorModeValue("gray.700", "white");
  useEffect(() => {
    if (clientsAppState === LoadState.NOT_LOADED) {
      dispatch(loadClients());
    }
  });
  if (!clients)
    return (
      <>
        <Button alignSelf={"flex-start"} onClick={onOpen}>
          Agregar Cliente <AddIcon ml={4} />
        </Button>
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
                    ? clientsApp.map((client) => ({
                        value: client.idClient,
                        label: client.clientName,
                      }))
                    : [
                        {
                          value: 0,
                          label: "No hay clientes",
                        },
                      ]
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  addToLoan(selectedClient);
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
      </>
    );
  console.log(clients);
  console.log(clientsApp);
  const arrFilter = clientsApp.map((client) => {
    const find = clients.find((c) => c.idClient === client.idClient);
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
  return (
    <Flex>
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
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                addToLoan(selectedClient);
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
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return <ClientsTable data={row} />;
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
