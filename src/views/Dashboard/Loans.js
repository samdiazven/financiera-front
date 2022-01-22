import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Select,
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
  FormLabel,
  Spinner,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getLoanState, getLoans } from "store/selectors/loans";
import { LoadState } from "store/slices/state";
import { loadLoans } from "store/slices/loan";
import { createLoan, updateLoan } from "store/slices/loan";
import { usePagination } from "hooks/usePagination";
import Pagination from "components/Tables/Pagination";
import LoansTable from "components/Tables/Loans";
import { useHistory } from "react-router-dom";
import { selectLoan } from "store/slices/loan";

export default function Rols() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loanState = useSelector(getLoanState);
  const loans = useSelector(getLoans);
  const textColor = useColorModeValue("gray.700", "white");
  const [loanSelected, setLoanSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [form, setForm] = useState({
    loanName: "",
    capital: 0,
    idAmortization: 1,
    percentage: 0,
    guaranteeAmount: 0,
    idGuaranteeState: 1,
    idLoanState: 0,
    startPaymentDate: "",
    noDate: false,
  });
  const [searchText, setSearchText] = useState("");
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(loans, searchText);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  useEffect(() => {
    if (loanState === LoadState.NOT_LOADED) {
      dispatch(loadLoans());
    }
  });

  const handleOpen = () => {
    setLoanSelected(null);
    setForm({
      loanName: "",
      capital: 0,
      percentage: 0,
      guaranteeAmount: 0,
      idGuaranteeState: 1,
      idLoanState: 0,
      startPaymentDate: "",
      noDate: false,
    });
    onOpen();
  };
  const handleSelectLoan = (loan) => {
    setLoanSelected(loan);
    setForm({
      loanName: loan.loanName,
      capital: loan.capital,
      percentage: loan.percentage,
      guaranteeAmount: loan.guaranteeAmount,
      idGuaranteeState: loan.idGuaranteeState,
      idLoanState: loan.idLoanState,
      startPaymentDate: loan.startPaymentDate
        ? new Date(loan.startPaymentDate)
        : "",
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
      if (loanSelected) {
        dispatch(updateLoan({ ...form, idLoan: loanSelected.idLoan }));
        toast({
          title: "Transaccion Finalizada.",
          description: "Prestamo actualizado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const date = form.startPaymentDate
          ? new Date(form.startPaymentDate)
          : null;
        dispatch(
          createLoan({
            ...form,
            startPaymentDate: form.noDate ? date : null,
            idLoanState: form.noDate ? 1 : 0,
          })
        );
        toast({
          title: "Transaccion Finalizada.",
          description: "Prestamo creado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error.",
        description: "Hubo un error.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      onClose();
    }
  };
  const handleControl = (loan) => {
    dispatch(selectLoan(loan));
    history.push(`/admin/control`);
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
      marginTop={{ base: 0, md: 20 }}
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
          <ModalHeader>Crear Prestamo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre de Prestamo
            </FormLabel>
            <Input
              value={form.loanName}
              name="loanName"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Nombre del rol"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Capital
            </FormLabel>
            <Input
              value={form.capital}
              name="capital"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="number"
              placeholder="Capital"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Porcentaje
            </FormLabel>
            <Input
              value={form.percentage}
              name="percentage"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="number"
              placeholder="Porcentaje"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Garant&iacute;a
            </FormLabel>
            <Input
              value={form.capital / form.percentage}
              disabled
              name="guaranteeAmount"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="number"
              placeholder="Garantia"
              size="lg"
              onChange={handleChangeInput}
            />
            <Flex alignItems={"center"} justifyContent={"flex-end"}>
              <FormLabel paddingLeft={5}> Habilitar Fecha de pago </FormLabel>
              <Checkbox
                marginBottom={2}
                onChange={() => setForm({ ...form, noDate: !form.noDate })}
              />
            </Flex>
            {form.noDate && (
              <>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Fecha de inicio de pago
                </FormLabel>
                <Input
                  value={form.startPaymentDate}
                  name="startPaymentDate"
                  borderRadius="15px"
                  mb="36px"
                  fontSize="sm"
                  type="date"
                  placeholder="Fecha de inicio de pago"
                  size="lg"
                  onChange={handleChangeInput}
                />
              </>
            )}
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Estado de garat&iacute;a
            </FormLabel>
            <Select
              variant="outline"
              value={form.idGuaranteeState}
              name="idGuaranteeState"
              borderRadius="15px"
              size="lg"
              mb="36px"
              fontSize="sm"
              onChange={handleChangeInput}
            >
              <option value={1}>Abonado</option>
              <option value={2}>No Abonado</option>
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
                  Editar
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Ver M&aacute;s
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return (
                  <LoansTable
                    data={row}
                    handleUpdate={handleSelectLoan}
                    handleControl={handleControl}
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
