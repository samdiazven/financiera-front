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
import DatesTable from "components/Tables/Dates";

function Dates({ dates }) {
  const [searchText, setSearchText] = useState("");
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(dates, searchText);
  const textColor = useColorModeValue("gray.700", "white");
  if (!dates)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          paddingTop: 10,
        }}
      >
        <Heading size={"lg"}>Sin fechas de pago asignadas a este grupo</Heading>
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
              Fechas de pago
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
                  Fecha de pago
                </Th>
                <Th textAlign={"center"} pl="0px" color="gray.400">
                  FEE
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Capital de repuesto
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  ITF
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Interes
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Seguro de vida
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Balance Principal
                </Th>

                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((item) => (
                <DatesTable data={item} />
              ))}
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

export default Dates;
