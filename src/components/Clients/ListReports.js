import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  Spinner,
  ModalFooter,
  Button,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import Clients from "apis/clients";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

function ListReports({ isOpen, setOpenModal, idPerson }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [ramd, setRamd] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const getReports = async () => {
      try {
        const person = new Clients();
        const data = await person.getFiles(idPerson);
        setReports(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getReports();
  }, [idPerson, ramd]);

  async function deleteReport(idReport) {
    try {
      const person = new Clients();
      await person.deleteFiles(idReport);
      setRamd(Math.random() * 100);
    } catch (error) {
      setRamd(Math.random() * 100);
      console.log(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpenModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>Lista de Archivos</Heading>
          <List>
            <ListItem>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>Fecha</Text>

                <Box display={"flex"} alignItems={"center"}>
                  <Text>Enlace</Text>
                  <Text pl={4}>Elimnar </Text>
                </Box>
              </Flex>
              {isLoading ? (
                <Box
                  w={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Spinner alignSelf={"center"} size={"lg"} />
                </Box>
              ) : (
                reports.map((report) => (
                  <Flex
                    py={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={report.idReport}
                  >
                    <Text>{report.uploadDate}</Text>
                    <Box display={"flex"} alignItems={"center"}>
                      <Button as="a" href={report.filePDF} target={"_blank"}>
                        <DownloadIcon />
                      </Button>
                      <Button
                        as="button"
                        onClick={() => deleteReport(report.idReport)}
                        pl={4}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Flex>
                ))
              )}
            </ListItem>
          </List>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ListReports;
