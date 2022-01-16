import { Badge, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function PayTable(props) {
  const {
    paymentDate,
    grupalFee,
    operationNumber,
    depositor,
    canal,
    payConstancy,
    paymentObservation,
  } = props.data;
  const { banks } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
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
          {depositor}
        </Text>
      </Td>
      <Td textAlign={"center"}>
        <Text
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          maxW={{ base: "100px", md: "200px" }}
        >
          {payConstancy}
        </Text>
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
    </Tr>
  );
}

export default PayTable;
