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
import { DownloadIcon } from "@chakra-ui/icons";

function ListReports({ isOpen, setOpenModal, idPerson }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getReports = async () => {
      try {
        const person = new Clients();
        const data = await person.getFiles(idPerson);
        console.log(data);
        setReports(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getReports();
  }, [idPerson]);

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
                <Text>Enlace</Text>
              </Flex>
              {isLoading ? (
                <Spinner alignSelf={"center"} size={"lg"} />
              ) : (
                reports.map((report) => (
                  <Flex
                    py={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text>{report.uploadDate}</Text>
                    <Text>
                      <Button as="a" href={report.filePDF} target={"_blank"}>
                        <DownloadIcon />
                      </Button>
                    </Text>
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
