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
  Heading,
  useToast,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import InvestmentsAPI from "apis/investments";
import { usePagination } from "hooks/usePagination";
import Pagination from "components/Tables/Pagination";
import InvestmentTable from "components/Tables/Investment";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticate, signOut } from "../store/slices/auth";
import { LoadState } from "store/slices/state";
import { getAuthenticationState } from "store/selectors/auth";
import { getUser } from "store/selectors/auth";
import useAuth from "hooks/useAuth";

function Investments() {
  useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const authenticationState = useSelector(getAuthenticationState);
  useEffect(() => {
    if (!user && authenticationState !== LoadState.LOADED_SUCCESS) {
      dispatch(authenticate());
    } else if (authenticationState === LoadState.LOADED_FAILURE) {
      dispatch(signOut());
      history.replace("/auth/signin");
    }
  }, [user, authenticationState]);

  const textColor = useColorModeValue("gray.700", "white");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const [investmentSelected, setInvestmentSelected] = useState(null);
  const [ramnd, setRamnd] = useState(0);
  const toast = useToast();
  const [error, setError] = React.useState(null);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    investmentFullName: "",
    investmentAmount: 0,
    operationNumber: "",
    investmentMode: "",
    interestByPeriod: "",
    numberOfPeriod: 0,
    timeOfPeriod: 0,
    startDate: "",
    finishDate: "",
  });
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const investment = new InvestmentsAPI();
        const res = await investment.getInvestments();
        setData(res);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [ramnd]);
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(data, searchText);

  const handleOpen = () => {
    setInvestmentSelected(null);
    setForm({
      investmentFullName: "",
      investmentAmount: 0,
      operationNumber: "",
      investmentMode: "",
      interestByPeriod: "",
      numberOfPeriod: 0,
      timeOfPeriod: 0,
      startDate: "",
      finishDate: "",
    });
    onOpen();
  };
  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectInvestment = (investment) => {
    setInvestmentSelected(investment);
    setForm({
      ...investment,
    });
    onOpen();
  };
  const handleCreateData = async () => {
    const investment = new InvestmentsAPI();
    try {
      if (investmentSelected) {
        await investment.updateInvestment({
          ...form,
          idInvestment: investmentSelected?.idInvestment,
          startDate: new Date(form.startDate),
          finishDate: new Date(form.finishDate),
        });
        toast({
          title: "Transaccion Finalizada.",
          description: "Rol actualizado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        await investment.createInvestment({
          ...form,
          startDate: new Date(form.startDate),
          finishDate: new Date(form.finishDate),
        });
        toast({
          title: "Transaccion Finalizada.",
          description: "Rol creado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      setRamnd(ramnd + 1);
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
  const openDialogDelete = (rol) => {
    setInvestmentSelected(rol);
    setIsOpenDelete(true);
  };
  const handleDelete = async () => {
    try {
      const investment = new InvestmentsAPI();
      await investment.deleteInvestment(investmentSelected.idInvestment);
      onCloseDelete();
      toast({
        title: "Transaccion Finalizada.",
        description: "Rol eliminado correctamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setRamnd(ramnd + 1);
    } catch (error) {
      console.log(error);
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
  if (error) {
    return (
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
      >
        <Heading textAlign={"center"}>Lo sentimos hubo un error.</Heading>
      </Flex>
    );
  }
  if (loading) {
    return (
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        direction="column"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Flex width={"80%"} margin={"0 auto"} flexDirection={"column"} pt={10}>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button
          alignSelf={"flex-end"}
          leftIcon={<ArrowBackIcon />}
          onClick={() => dispatch(signOut())}
        >
          Cerrar Sesion
        </Button>

        <Button
          alignSelf={"flex-end"}
          leftIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Agregar
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Rol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre de inversion
            </FormLabel>
            <Input
              value={form.investmentFullName}
              name="investmentFullName"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Nombre de inversion"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Monto de inversion{" "}
            </FormLabel>
            <Input
              value={form.investmentAmount}
              name="investmentAmount"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="number"
              placeholder="Monto de inversion"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Numero de operacion{" "}
            </FormLabel>
            <Input
              value={form.operationNumber}
              name="operationNumber"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="number"
              placeholder="Monto de inversion"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Modo de inversion{" "}
            </FormLabel>
            <Input
              value={form.investmentMode}
              name="investmentMode"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Modo de inversion"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Periodo de interes{" "}
            </FormLabel>
            <Input
              value={form.interestByPeriod}
              name="interestByPeriod"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Interes por periodo"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Numero de periodo{" "}
            </FormLabel>
            <Input
              value={form.numberOfPeriod}
              name="numberOfPeriod"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Numero de periodo"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Tiempo de periodo{" "}
            </FormLabel>
            <Input
              value={form.timeOfPeriod}
              name="timeOfPeriod"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Tiempo de periodo"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Fecha de inicio{" "}
            </FormLabel>
            <Input
              value={form.startDate}
              name="startDate"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="date"
              placeholder="Fecha inicial"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Fecha de fin
            </FormLabel>
            <Input
              value={form.finishDate}
              name="finishDate"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="date"
              placeholder="Fecha final"
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
              Borrar Inversion
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de borrar la inversion?
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
          <Flex
            flexGrow={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Tabla de inversiones
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
                  Nombre de inversi&oacute;n
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Monto de inversi&oacute;n
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Numero de Operaci&oacute;n
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  N&uacute;mero de Periodo
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Fecha de inicio{" "}
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Fecha de fin
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
              {data.map((item, index) => (
                <InvestmentTable
                  key={index}
                  data={item}
                  handleUpdate={handleSelectInvestment}
                  handleDelete={openDialogDelete}
                />
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

export default Investments;
