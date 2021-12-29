import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  ListIcon,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function RolsTable(props) {
  const { rolName, rolDescription, permissionList } = props.data;
  const { handleUpdate, handleDelete } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {rolName}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {rolDescription}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {permissionList.length || 0}
        </Badge>
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
            color="gray.400"
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
            color="gray.400"
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

export default RolsTable;
