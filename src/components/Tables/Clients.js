import React, { useEffect, useState } from "react";
import {
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
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
    name,
    lastname,
    address,
    phoneNumber,
    dateOfBirth,
    idFinancialState,
    idPersonState,
    amount,
    age,
  } = props.data;
  const {
    handleUpdate,
    handleDelete,
    handleUpload,
    hasAmount,
    handleSeeReports,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr
      style={{
        backgroundColor: idFinancialState !== 1 ? "rgba(0,0,0,0.2)" : "",
      }}
    >
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {lastname}
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
          {hasAmount ? (
            <Text fontSize="sm" color={textColor} fontWeight="normal">
              S/.{amount}
            </Text>
          ) : (
            <Text fontSize="sm" color={textColor} fontWeight="normal">
              {address}
            </Text>
          )}
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {phoneNumber}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {age || ""}
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
      {handleUpload && (
        <Td textAlign={"center"}>
          <Button
            p="10px"
            bg="green.500"
            variant="no-hover"
            onClick={() => {
              handleUpload(props.data);
            }}
          >
            <Text
              fontSize="md"
              color={"white"}
              fontWeight="bold"
              cursor="pointer"
            >
              <AttachmentIcon />
            </Text>
          </Button>
        </Td>
      )}
      {handleSeeReports && (
        <Td textAlign={"center"}>
          <Button
            p="10px"
            bg="pink.500"
            variant="no-hover"
            onClick={() => {
              handleSeeReports(props.data);
            }}
          >
            <Text
              fontSize="md"
              color={"white"}
              fontWeight="bold"
              cursor="pointer"
            >
              <HamburgerIcon />
            </Text>
          </Button>
        </Td>
      )}
    </Tr>
  );
}

export default ClientsTable;
