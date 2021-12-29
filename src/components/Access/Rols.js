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
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getRolState } from "store/selectors/rols";
import { LoadState } from "store/slices/state";
import { getRols } from "store/selectors/rols";
import { loadRols } from "store/slices/rols";
import RolsTable from "components/Tables/Rols";
import { createRol } from "store/slices/rols";
import { updateRol, deleteRol } from "store/slices/rols";

export default function Rols() {
  const dispatch = useDispatch();
  const rolState = useSelector(getRolState);
  const rols = useSelector(getRols);
  const textColor = useColorModeValue("gray.700", "white");
  const [rolSelected, setRolSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    rolName: "",
    rolDescription: "",
  });
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = React.useRef();
  useEffect(() => {
    if (rolState === LoadState.NOT_LOADED) {
      dispatch(loadRols());
    }
  }, [rolState]);

  const handleOpen = () => {
    setRolSelected(null);
    setForm({
      rolName: "",
      rolDescription: "",
    });
    onOpen();
  };
  const handleSelectRole = (rol) => {
    setRolSelected(rol);
    setForm({
      rolName: rol.rolName,
      rolDescription: rol.rolDescription,
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
    if (form.rolName.trim() === "" && form.rolDescription.trim() === "") return;
    try {
      if (rolSelected) {
        dispatch(updateRol({ ...form, idRol: rolSelected.idRol }));
      } else {
        dispatch(createRol(form));
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const openDialogDelete = (rol) => {
    setRolSelected(rol);
    setIsOpenDelete(true);
  };
  const handleDelete = () => {
    dispatch(deleteRol(rolSelected.idRol));
    onCloseDelete();
  };

  if (rolState === LoadState.LOADING)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {" "}
        <Spinner size={"xl"} />{" "}
      </div>
    );
  if (rols.length === 0) return <div> No Data </div>;
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
          <ModalHeader>Crear Rol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre de Rol
            </FormLabel>
            <Input
              value={form.rolName}
              name="rolName"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="text"
              placeholder="Nombre del rol"
              size="lg"
              onChange={handleChangeInput}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Descripci&oacute;n
            </FormLabel>
            <Input
              value={form.rolDescription}
              name="rolDescription"
              borderRadius="15px"
              mb="36px"
              fontSize="sm"
              type="text"
              placeholder="Descripcion"
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
              Borrar Rol
            </AlertDialogHeader>

            <AlertDialogBody>Estas Seguro de borrar el rol?</AlertDialogBody>

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
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Tabla de roles
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th textAlign={"center"} pl="0px" color="gray.400">
                  Nombre
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Descripci&oacute;n
                </Th>
                <Th textAlign={"center"} color="gray.400">
                  Numero de Permisos
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
              {rols.map((row) => {
                return (
                  <RolsTable
                    data={row}
                    handleUpdate={handleSelectRole}
                    handleDelete={openDialogDelete}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}
