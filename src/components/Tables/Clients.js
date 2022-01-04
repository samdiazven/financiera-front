import React, { useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Spinner,
  Switch,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

function ClientsTable(props) {
  const {
    clientName,
    clientLastname,
    clientAddress,
    clientPhoneNumber,
    clientDateOfBirth,
    idFinancialState,
    idClientState,
  } = props.data;
  const { handleUpdate, handleDelete } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr
      style={{
        backgroundColor: idClientState !== 1 ? "rgba(0,0,0,0.2)" : "",
      }}
    >
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {clientName}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {clientLastname}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {clientAddress}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {clientPhoneNumber}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {clientDateOfBirth}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {idFinancialState === 1 ? "Solvente" : "En mora"}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Button
          p="10px"
          bg="blue.500"
          variant="no-hover"
          onClick={() => handleUpdate(props.data)}
        >
          <Text
            fontSize="md"
            color={"white"}
            fontWeight="bold"
            cursor="pointer"
          >
            <EditIcon />
          </Text>
        </Button>
      </Td>
      <Td textAlign={"center"}>
        <Switch
          isChecked={idClientState === 1 ? true : false}
          onChange={() => handleDelete(props.data)}
        />
      </Td>
    </Tr>
  );
}

export default ClientsTable;
