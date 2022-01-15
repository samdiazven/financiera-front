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
  Radio,
} from "@chakra-ui/react";
import Messages from "apis/messages";

function SendToGroup({ groups, messages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [channel, setChannel] = React.useState("1");

  const [messageText, setMessage] = React.useState("");
  async function sendMessages() {
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
  }

  return (
    <Stack spacing={4}>
      <Button
        onClick={onOpen}
        backgroundColor={"blue.500"}
        width={"50%"}
        alignSelf={"center"}
      >
        Enviar al grupo
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
              onChange={(e) => setSelectedGroup(e.target.value)}
              borderRadius={"15px"}
              size={"lg"}
            >
              <option>Seleccione un grupo</option>
              {groups.map((group) => (
                <option key={group.idLoan} value={group.idLoan}>
                  {group.loanName}
                </option>
              ))}
            </Select>

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

export default SendToGroup;
