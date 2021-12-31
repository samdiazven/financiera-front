import React, { useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
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
import { getRols, getRolState } from "../../store/selectors/rols";
import { LoadState } from "store/slices/state";
import { loadRols } from "store/slices/rols";

function RolsTable(props) {
  const { name, username, lastname, idRol, idUser } = props.data;
  const { handleUpdate, handleDelete } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const rols = useSelector(getRols);
  const getStateRol = useSelector(getRolState);

  useEffect(() => {
    if (getStateRol === LoadState.NOT_LOADED) {
      dispatch(loadRols());
    }
  });

  const rolName = rols.find((rol) => rol.idRol === idRol)?.rolName ?? "No rol";

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
        <Badge
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          backgroundColor={"green.500"}
        >
          {rols.length !== 0 ? (
            <Text fontSize="sm" color={"white"} fontWeight="normal">
              {rolName}
            </Text>
          ) : (
            <Spinner size="sm" />
          )}
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

export default RolsTable;
