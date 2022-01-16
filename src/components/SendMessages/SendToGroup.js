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
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Messages from "apis/messages";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

function SendToGroup({ groups, messages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [channel, setChannel] = React.useState("1");
  const [isLoading, setIsLoading] = React.useState(false);

  const [messageText, setMessage] = React.useState("");
  async function sendMessages() {
    setIsLoading(true);
    if (selectedGroup === null || messageText === "") {
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
        idLoan: Number(selectedGroup),
        idChannel: Number(channel),
        message: messageText,
      };
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
    setMessage("");
    setSelectedGroup(null);
    setChannel("1");
    setIsLoading(false);
  }

  const textColor = useColorModeValue("white");
  if (isLoading) return <Spinner />;
  return (
    <Stack alignSelf={"center"} flexGrow={1} p={6}>
      <Card maxW={"xl"} alignSelf="center" paddingTop={4}>
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Envios Grupales
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
              onChange={(e) => setSelectedGroup(e.value)}
              isMulti={false}
              options={groups.map((group) => ({
                value: group.idLoan,
                label: group.loanName,
              }))}
              borderRadius={"15px"}
            />

            <FormLabel marginTop={5}>Mensajes predeterminados</FormLabel>
            <Select
              onChange={(e) => setMessage(e.value)}
              isMulti={false}
              options={messages.map((message) => ({
                value: message.message,
                label: message.titleMessage,
              }))}
              borderRadius={"15px"}
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

export default SendToGroup;
