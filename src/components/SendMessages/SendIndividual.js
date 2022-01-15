import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Select,
  Textarea,
  FormLabel,
  RadioGroup,
  Stack,
  ListItem,
  Radio,
  List,
  Text,
  Checkbox,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Messages from "apis/messages";
import Loan from "apis/loans";

function SendIndividual({ groups, messages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [channel, setChannel] = React.useState("1");
  const [loadClients, setLoadClients] = React.useState(false);
  const [clientsSelected, setClientsSelected] = React.useState([]);
  const [clients, setClients] = React.useState([]);

  const [messageText, setMessage] = React.useState("");
  async function getClients(id) {
    setLoadClients(true);
    if (id === 0) return;
    const loan = new Loan();
    const res = await loan.getClientsByLoan(id);
    setClients(res);
    setLoadClients(false);
  }
  async function sendMessages() {
    if (messageText === "" || clientsSelected.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, seleccione un grupo y escriba un mensaje",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const message = new Messages();
      const data = {
        clientList: clientsSelected,
        idChannel: Number(channel),
        message: messageText,
      };
      console.log(data);
      await message.sendSmsToGroup(data);
      toast({
        title: "Mensaje enviado",
        description: "El mensaje se ha enviado correctamente",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  }
  const textColor = useColorModeValue("white");
  return (
    <Stack spacing={4}>
      <Button
        backgroundColor={"red.500"}
        width={{ base: "60%", md: "50%" }}
        alignSelf={"center"}
        onClick={() => {
          setClientsSelected([]);
          setClients([]);
          onOpen();
        }}
      >
        Enviar individualmente
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar mensaje</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel marginTop={5}>Canal de envio</FormLabel>
            <RadioGroup onChange={setChannel} value={channel}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Radio value={"1"}>SMS</Radio>
                <Radio value={"2"}>Whatsapp</Radio>
              </Stack>
            </RadioGroup>
            <FormLabel marginTop={5}>Grupos</FormLabel>
            <Select
              onChange={(e) => {
                setClientsSelected([]);
                getClients(e.target.value);
              }}
              borderRadius={"15px"}
              size={"lg"}
            >
              <option value="0">Seleccione un grupo</option>
              {groups.map((group) => (
                <option key={group.idLoan} value={group.idLoan}>
                  {group.loanName}
                </option>
              ))}
            </Select>
            <List>
              <FormLabel marginTop={5}>Clientes</FormLabel>
              {loadClients ? (
                <ListItem>Cargando...</ListItem>
              ) : clients && clients.length ? (
                clients.map((client) => (
                  <ListItem key={client.idClient}>
                    <Flex
                      backgroundColor={"gray.600"}
                      p={4}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text color={textColor}>{client.clientName}</Text>
                      <Text color={textColor}>{client.clientLastName}</Text>
                      <Text color={textColor}>{client.clientPhoneNumber}</Text>
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setClientsSelected([
                              ...clientsSelected,
                              client.idClient,
                            ]);
                          } else {
                            setClientsSelected(
                              clientsSelected.filter(
                                (clientId) => clientId !== client.idClient
                              )
                            );
                          }
                        }}
                      />
                    </Flex>
                  </ListItem>
                ))
              ) : (
                <ListItem>No hay clientes</ListItem>
              )}
            </List>

            <FormLabel marginTop={5}>Mensajes predeterminados</FormLabel>
            <Select
              onChange={(e) => setMessage(e.target.value)}
              borderRadius={"15px"}
              size={"lg"}
            >
              <option value="">Seleccione un mensaje</option>
              {messages.map(({ titleMessage, message }, idx) => (
                <option key={idx} value={message}>
                  {titleMessage}
                </option>
              ))}
            </Select>

            <FormLabel marginTop={5}>Mensaje </FormLabel>
            <Textarea
              name="message"
              value={messageText}
              borderRadius={"15px"}
              size={"lg"}
              type="text"
              placeholder="Mensaje"
              onChange={(e) => setMessage(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button marginRight={4} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={sendMessages}>Enviar mensaje</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default SendIndividual;
