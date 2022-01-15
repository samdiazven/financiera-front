import React from "react";
import { Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";

function DatesTable(props) {
  const {
    installmentNumber,
    paymentDate,
    fee,
    capitalRepayment,
    creditLifeInsurance,
    itf,
    interest,
    principalBalance,
  } = props.data;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {new Date(paymentDate).toLocaleDateString() || "Sin fecha"}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {fee}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {capitalRepayment}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {itf}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {interest}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {creditLifeInsurance}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            {principalBalance}
          </Text>
        </Flex>
      </Td>
    </Tr>
  );
}

export default DatesTable;
