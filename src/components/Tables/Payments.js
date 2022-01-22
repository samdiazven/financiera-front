import {
  Badge,
  Box,
  Flex,
  Image,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";

function PayTable(props) {
  const {
    paymentDate,
    grupalFee,
    operationNumber,
    depositorFullName,
    canal,
    payConstancy,
    paymentObservation,
  } = props.data;
  const { handleUpdate } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { banks } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const [img, setImg] = React.useState(null);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Detalle de pago
              </Text>
            </Box>
            <ModalCloseButton onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Box
              height={["100%", "100%", "100%", "100%"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                width={{ base: "40px", md: "350px" }}
                height={{ base: "40px", md: "350px" }}
                src={img}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Tr>
        <Td textAlign={"center"}>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {new Date(paymentDate).toLocaleDateString()}
            </Text>
          </Flex>
        </Td>
        <Td textAlign={"center"}>
          <Flex direction="column">
            <Text fontSize="sm" color={textColor} fontWeight="bold">
              {grupalFee}
            </Text>
          </Flex>
        </Td>
        <Td textAlign={"center"}>
          <Badge fontSize="16px" p="3px 10px" borderRadius="8px">
            {operationNumber}
          </Badge>
        </Td>
        <Td textAlign={"center"}>
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {depositorFullName}
          </Text>
        </Td>
        <Td textAlign={"center"}>
          <Box
            maxW={{ base: "100px", md: "200px" }}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            cursor={"pointer"}
            onClick={() => {
              setImg(payConstancy);
              onOpen();
            }}
          >
            <Image src={payConstancy} width={"40px"} height={"40px"} />
          </Box>
        </Td>
        <Td textAlign={"center"}>
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {banks && banks.length > 0
              ? banks.find((bank) => bank.idBank === canal).acronym
              : "No definido"}
          </Text>
        </Td>
        <Td textAlign={"center"}>
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {paymentObservation}
          </Text>
        </Td>
        <Td textAlign={"center"}>
          <Button
            p="10px"
            _hover={{ bg: "blue.500" }}
            variant="no-hover"
            onClick={() => handleUpdate(props.data)}
          >
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              cursor="pointer"
            >
              <EditIcon />
            </Text>
          </Button>
        </Td>
      </Tr>
    </>
  );
}

export default PayTable;
