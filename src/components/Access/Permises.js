import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Box,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Button,
  Heading,
  Flex,
  Switch,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getRolState } from "store/selectors/rols";
import { getRols } from "store/selectors/rols";
import { LoadState } from "store/slices/state";
import Axios from "apis/axios";
import { loadRols } from "store/slices/rols";
export default function Permises() {
  const rolState = useSelector(getRolState);
  const rols = useSelector(getRols);
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState(0);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("/url").then((res) => {
      setData(res.data.objModel);
    });
  }, [state]);

  function handleChange(data) {
    console.log(data);
    setSelected(data);
    setIsOpen(true);
  }
  function updateRol() {
    const data = rols.find((item) => item.idRol === selected.idRol);
    const rolFounded = data.permissionList.find(
      (item) => item.idUrl === selected.idUrl
    );
    let formData;
    if (rolFounded) {
      const filterData = data.permissionList.filter(
        (item) => item.idUrl !== selected.idUrl
      );
      formData = filterData.map((i) => {
        return { idRol: selected.idRol, idUrl: i.idUrl };
      });
    } else {
      const filterData = data.permissionList.map((i) => {
        return { idRol: selected.idRol, idUrl: i.idUrl };
      });
      formData = [...filterData, selected];
    }
    Axios.put("/permission", formData)
      .then((res) => {
        toast({
          title: "Transaccion Finalizada.",
          description: "Permisos actualizados correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setState(Math.random() * 100);
        dispatch(loadRols());
        setSelected({});
        onClose();
        console.log(formData);
      })
      .catch((err) => {
        toast({
          title: "Error.",
          description: "Hubo un error.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        console.log(formData);
        setSelected({});
        onClose();
      });
  }
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
        <Spinner size={"xl"} />{" "}
      </div>
    );
  if (rolState === LoadState.NOT_LOADED && rols.length === 0)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Flex flexDirection={"column"} flexGrow={1}>
          <Text
            pt={6}
            fontSize={"xl"}
            textAlign={"center"}
            alignSelf={"center"}
          >
            No hay Roles
          </Text>
        </Flex>
      </div>
    );
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Actualizar permiso
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas Seguro de actualizar el permiso?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue.200" onClick={updateRol} ml={3}>
                Actualizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Heading as="h3" size={"lg"} py={5} textAlign={"center"}>
        Por favor selecciona los permisos necesarios para cada rol{" "}
      </Heading>
      <Heading as="h5" size={"md"} mb={10} textAlign={"center"}>
        Solo un rol a la vez!
      </Heading>
      <Accordion allowMultiple allowToggle>
        {rols.map((rol) => (
          <AccordionItem key={rol.idRol}>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight={"bold"}>{rol.rolName}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  {data.length === 0 ? (
                    <Spinner size={"lg"} />
                  ) : (
                    data.map((item) => (
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        key={item.idUrl}
                        padding={3}
                      >
                        <Text fontWeight={"bold"}>{item.urlName}</Text>
                        <Text>{item.urlDescription}</Text>
                        <Switch
                          isChecked={rol.permissionList.some(
                            (r) => item.idUrl === r.idUrl
                          )}
                          onChange={(e) =>
                            handleChange({
                              idUrl: item.idUrl,
                              idRol: rol.idRol,
                            })
                          }
                        />
                      </Flex>
                    ))
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
