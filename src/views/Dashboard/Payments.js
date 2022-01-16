import React, { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDispatch, useSelector } from "react-redux";
import { getLoanState, getLoans } from "store/selectors/loans";
import { LoadState } from "store/slices/state";
import { loadLoans } from "store/slices/loan";
import { usePagination } from "hooks/usePagination";
import Pagination from "components/Tables/Pagination";
import LoansTable from "components/Tables/Loans";
import { useHistory } from "react-router-dom";
import { selectLoan } from "store/slices/loan";

export default function Payments() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loanState = useSelector(getLoanState);
  const loans = useSelector(getLoans);
  const textColor = useColorModeValue("gray.700", "white");

  const toast = useToast();

  const [searchText, setSearchText] = useState("");
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(loans, searchText);
  useEffect(() => {
    if (loanState === LoadState.NOT_LOADED) {
      dispatch(loadLoans());
    }
  });

  const handleControl = (loan) => {
    dispatch(selectLoan(loan));
    history.push(`/admin/controlPayment`);
  };

  if (loanState === LoadState.LOADING)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Spinner size={"xl"} />
      </div>
    );
  return (
    <Flex
      width={"100%"}
      flexDirection={"column"}
      marginTop={{ base: 10, md: 20 }}
    >
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
              Tabla de prestamos
            </Text>
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
                  Capital
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Porcentaje
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Garant&iacute;a
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Estado de garant&iacute;a
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Ver Pagos
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return <LoansTable data={row} handleControl={handleControl} />;
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
