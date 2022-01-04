import React, { useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Spinner,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

function ClientsTable(props) {
  const { name, username, lastname, idUser } = props.data;
  const { handleUpdate, handleDelete } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {username}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {lastname}
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
        <Button
          p="10px"
          bg="red.500"
          variant="no-hover"
          onClick={() => handleDelete(props.data)}
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
    </Tr>
  );
}

export default ClientsTable;
