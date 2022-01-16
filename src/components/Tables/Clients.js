import React, { useEffect, useState } from "react";
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
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {new Date(clientDateOfBirth).toLocaleDateString()}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {idFinancialState === 1 ? "Solvente" : "En mora"}
          </Text>
        </Flex>
      </Td>
      {handleUpdate && (
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
      )}
      {handleDelete && (
        <Td textAlign={"center"}>
          <Button
            p="10px"
            bg="red.500"
            variant="no-hover"
            onClick={() => {
              console.log("delete");
              handleDelete(props.data);
            }}
          >
            <Text
              fontSize="md"
              color={"white"}
              fontWeight="bold"
              cursor="pointer"
            >
              <DeleteIcon />
            </Text>
          </Button>
        </Td>
      )}
    </Tr>
  );
}

export default ClientsTable;
