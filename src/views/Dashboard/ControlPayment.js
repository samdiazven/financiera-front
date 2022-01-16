import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import {
  Spinner,
  Stack,
  FormLabel,
  Text,
  Modal,
  ModalCloseButton,
  ModalHeader,
  useColorModeValue,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Table,
  Flex,
  Tr,
  Thead,
  Tbody,
  Th,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { getLoanSelected } from "store/selectors/loans";
import Payment from "apis/payments";
import { usePagination } from "hooks/usePagination";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Tables/Pagination.js";
import PayTable from "components/Tables/Payments";

function ControlPayment() {
  const loan = useSelector(getLoanSelected);
  const [payments, setPayments] = useState([]);
  const [ramdon, setRamdon] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {
    filteredData,
    handleDecrease,
    handleIncrease,
    currentPage,
  } = usePagination(payments, searchText);
  const toast = useToast();
  const [banks, setBanks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    idPayment: 1,
    idLoan: loan.idLoan,
    paymentDate: "",
    grupalFee: 0,
    paymentState: 1,
    operationNumber: "",
    depositor: "",
    canal: 1,
    files: null,
    payConstancy: "",
    paymentObservation: "",
  });
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function getBanks() {
      setIsLoading(true);
      const paymentInstance = new Payment();
      const banks = await paymentInstance.getBanks();
      setBanks(banks);
      setIsLoading(false);
    }
    async function getPayments() {
      setIsLoading(true);
      try {
        const paymentInstance = new Payment();
        const pays = await paymentInstance.getPayments(loan.idLoan);
        setPayments(pays);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getPayments();
    getBanks();
  }, [loan, ramdon]);

  const handleCreateData = async () => {
    onClose();
    try {
      const paymentInstance = new Payment();
      await paymentInstance.uploadPayments(form);
      toast({
        title: "Exito",
        description: "Pago creado con exito",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al crear el pago",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
    setRamdon(Math.random() * 100);
  };
  const textColor = useColorModeValue("gray.700", "gray.300");
  if (isLoading || !banks)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Spinner size={"xl"} />
      </div>
    );
  return (
    <Stack marginTop={{ base: "6rem", md: "6rem" }}>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
            <Heading size="md">Pagos</Heading>
          </ModalHeader>
          <ModalBody>
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Banco
              </Text>
            </FormLabel>

            <Select
              onChange={(e) => setForm({ ...form, canal: e.value })}
              isMulti={false}
              options={banks.map((bank) => ({
                value: bank.idBank,
                label: bank.acronym,
              }))}
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Fecha de pago
              </Text>
              <Input
                type="date"
                name="paymentDate"
                value={form.paymentDate}
                onChange={handleChangeForm}
              />
            </FormLabel>
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Tarifa Grupal
              </Text>
            </FormLabel>
            <Input
              type="number"
              name="grupalFee"
              value={form.grupalFee}
              onChange={handleChangeForm}
              placeholder="Tarifa Grupal"
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Numero de operaci&oacute;n
              </Text>
            </FormLabel>
            <Input
              type="number"
              name="operationNumber"
              value={form.operationNumber}
              onChange={handleChangeForm}
              placeholder="Numero de operacion"
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Depositante
              </Text>
            </FormLabel>
            <Input
              type="text"
              name="depositor"
              value={form.depositor}
              onChange={handleChangeForm}
              placeholder="Depositante"
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Constancia de pago
              </Text>
            </FormLabel>
            <Input
              type="text"
              name="payConstancy"
              value={form.payConstancy}
              onChange={handleChangeForm}
              placeholder="Constancia de pago"
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
                pt={1}
                size={"xl"}
              >
                Archivo de pago
              </Text>
            </FormLabel>
            <Input
              type="file"
              name="file"
              onChange={(e) => setForm({ ...form, files: e.target.files[0] })}
              placeholder="Archivo de pago"
            />
            <FormLabel pt={2}>
              <Text
                fontWeight="bold"
                color={useColorModeValue("gray.700", "white")}
              >
                Observacion
              </Text>
            </FormLabel>
            <Input
              type="text"
              name="paymentObservation"
              value={form.paymentObservation}
              onChange={handleChangeForm}
              placeholder="Observacion"
            />
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleCreateData} variantColor="blue">
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card>
        <Button
          p={4}
          alignSelf={"flex-start"}
          onClick={() => {
            onOpen();
            setForm({
              idPayment: 1,
              idLoan: loan.idLoan,
              paymentDate: "",
              grupalFee: 0,
              paymentState: 1,
              operationNumber: "",
              depositor: "",
              canal: 1,
              files: null,
              payConstancy: "",
              paymentObservation: "",
            });
          }}
        >
          Agregar Pago <AddIcon ml={4} />
        </Button>
        <CardHeader p="6px 0px 22px 0px">
          <Flex
            flexGrow={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Heading size="lg" color={textColor} fontWeight="bold">
              Pagos
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
                <Th textAlign={"center"} color="gray.400">
                  Tarifa grupal
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Numero de operacion
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Depositante
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Constancia
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Canal
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Observacion
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData().map((row) => {
                return (
                  <PayTable key={row.idPayment} data={row} banks={banks} />
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
    </Stack>
  );
}

export default ControlPayment;
