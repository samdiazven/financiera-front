import React from "react";
import { Select } from "chakra-react-select";
import {
  useDisclosure,
  Button,
  useToast,
  Textarea,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import Messages from "apis/messages";
import Loan from "apis/loans";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

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
      const messageInstance = new Messages();
      const data = {
        clientList: clientsSelected.map((client) => {
          return {
            idClient: client.value,
          };
        }),
        idChannel: Number(channel),
        message: messageText,
      };
      await messageInstance.sendSmsIndividual(data);
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
    setClientsSelected([]);
    setMessage("");
    setChannel("1");
    setClients([]);
  }
  const textColor = useColorModeValue("white");
  return (
    <Stack alignSelf={"center"} flexGrow={1} p={6}>
      <Card maxW={"xl"} alignSelf="center" paddingTop={4}>
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Envios individuales
          </Text>
        </CardHeader>
        <CardBody>
          <Stack flexGrow={1}>
            <FormLabel marginTop={5}>Canal de envio</FormLabel>
            <RadioGroup onChange={setChannel} value={channel}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Radio value={"1"}>SMS</Radio>
                <Radio value={"2"}>Whatsapp</Radio>
              </Stack>
            </RadioGroup>
            <FormLabel marginTop={5}>Grupos</FormLabel>
            <Select
              placeholder="Seleccione un grupo"
              onChange={(e) => {
                setClientsSelected([]);
                setClients([]);
                getClients(e.value);
              }}
              options={groups.map((group) => ({
                value: group.idLoan,
                label: group.loanName,
              }))}
              borderRadius={"15px"}
              size={"lg"}
            />
            <FormLabel marginTop={5}>Clientes</FormLabel>
            {loadClients ? (
              <Spinner />
            ) : clients && clients.length ? (
              <Select
                isMulti={true}
                onChange={(e) => {
                  setClientsSelected(e);
                }}
                placeholder="Seleccione un cliente"
                options={clients.map((client) => ({
                  value: client.idPerson,
                  label: `${client.name} ${client.lastname}`,
                }))}
                borderRadius={"15px"}
                size={"lg"}
              />
            ) : (
              <Text>No hay clientes</Text>
            )}

            <FormLabel marginTop={5}>Mensajes predeterminados</FormLabel>
            <Select
              placeholder="Seleccione un mensaje"
              onChange={(e) => {
                setMessage(e.value);
              }}
              options={messages.map((message) => ({
                value: message.message,
                label: message.titleMessage,
              }))}
              borderRadius={"15px"}
              size={"lg"}
            />

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
            <Button onClick={sendMessages}>Enviar mensaje</Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default SendIndividual;
