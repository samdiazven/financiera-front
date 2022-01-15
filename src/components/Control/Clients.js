import React, { useState } from "react";
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
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Pagination from "components/Tables/Pagination";
import { usePagination } from "hooks/usePagination";
import ClientsTable from "components/Tables/Clients";

function Clients({ clients }) {
  const [searchText, setSearchText] = useState("");
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(clients, searchText);
  const textColor = useColorModeValue("gray.700", "white");
  if (!clients)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          paddingTop: 10,
        }}
      >
        <Heading size={"lg"}>Sin clientes relacionados a este grupo</Heading>
      </div>
    );
  return (
    <Flex>
      <Card>
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
