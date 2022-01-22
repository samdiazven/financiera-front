import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function LoansTable(props) {
  const {
    loanName,
    capital,
    percentage,
    guaranteeAmount,
    idGuaranteeState,
    idLoan,
  } = props.data;
  const { handleUpdate, handleControl } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {loanName}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            S/.{capital}
          </Text>
        </Flex>
      </Td>
      <Td textAlign={"center"}>
        <Badge fontSize="16px" p="3px 10px" borderRadius="8px">
          {percentage}%
        </Badge>
      </Td>
      <Td textAlign={"center"}>
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          S/.{guaranteeAmount}
        </Text>
      </Td>
      <Td textAlign={"center"}>
        <Badge fontSize="16px" p="3px 10px" borderRadius="8px">
          {idGuaranteeState === 1 ? "Abonado" : "No abonado"}
        </Badge>
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
              color={textColor}
              fontWeight="bold"
              cursor="pointer"
            >
              <EditIcon />
            </Text>
          </Button>
        </Td>
      )}
      <Td textAlign={"center"}>
        <Button
          p="10px"
          _hover={{ bg: "blue.500" }}
          variant="no-hover"
          onClick={() => handleControl(props.data)}
        >
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            cursor="pointer"
          >
            <ViewIcon />
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default LoansTable;
