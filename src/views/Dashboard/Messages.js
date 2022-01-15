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
  useToast,
  Textarea,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { LoadState } from "store/slices/state";
import {
  loadMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} from "store/slices/messages";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "components/Tables/Pagination";
import { getMessagesState, getMessages } from "store/selectors/messages";
import MessagesTable from "components/Tables/Messages";

export default function Messages() {
  const dispatch = useDispatch();
  const stateMessages = useSelector(getMessagesState);
  const messages = useSelector(getMessages);
  const textColor = useColorModeValue("gray.700", "white");
  const [messageSelected, setMessageSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    filteredData,
    handleIncrease,
    handleDecrease,
    currentPage,
  } = usePagination(messages, searchText);
  const [form, setForm] = useState({
    titleMessage: "",
    message: "",
  });
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  useEffect(() => {
    if (stateMessages === LoadState.NOT_LOADED) {
      dispatch(loadMessages());
    } else if (stateMessages === LoadState.LOADED_FAILED) {
      toast({
        title: "Error",
        description: "Lo sentimos hubo un error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [stateMessages]);

  const handleOpen = () => {
    setMessageSelected(null);
    setForm({
      titleMessage: "",
      message: "",
    });
    onOpen();
  };
  const handleSelectMessage = (message) => {
    setMessageSelected(message);
    setForm({
      ...message,
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
      if (messageSelected) {
        dispatch(
          updateMessage({
            ...form,
            idMessage: messageSelected.idMessage,
          })
        );
        toast({
          title: "Transaccion Finalizada.",
          description: "Mensaje actualizado correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        dispatch(createMessage(form));
        toast({
          title: "Transaccion Finalizada.",
          description: "Mensaje actualizado correctamente.",
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
    setMessageSelected(client);
    setIsOpenDelete(true);
  };
  const handleDelete = () => {
    try {
      dispatch(deleteMessage(messageSelected.idMessage));
      onCloseDelete();
      toast({
        title: "Transaccion Finalizada.",
        description: "Mensaje Eliminado correctamente.",
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

  if (stateMessages === LoadState.LOADING)
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
        <Spinner size={"xl"} />
      </div>
    );

  if (stateMessages === LoadState.LOADED_FAILED) {
    return <div>Error</div>;
  }

  if (messages.length === 0)
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
        No Data
      </div>
    );
  return (
    <Flex width={"100%"} flexDirection={"column"}>
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
          <ModalHeader>
            {messageSelected ? "Editar Mensaje" : "Crear Mensaje"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Titulo de mensaje
            </FormLabel>
            <Input
              value={form.titleMessage}
              name="titleMessage"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Titulo de Mensaje"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Mensaje
            </FormLabel>
            <Textarea
              name="message"
              value={form.message}
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Mensaje"
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
              Eliminar
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de eliminar el mensaje?
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
              Mensajes
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
                  T&iacute;tulo
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Mensaje
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
              {filteredData().map((row) => (
                <MessagesTable
                  data={row}
                  handleUpdate={handleSelectMessage}
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
