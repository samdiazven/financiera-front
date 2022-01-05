import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

function Pagination({ length, handlePrev, handleNext, currentPage }) {
  return (
    <Flex
      marginTop={5}
      justifyContent={{ base: "center", md: "flex-end" }}
      alignItems={"center"}
    >
      <Button onClick={handlePrev}>Anterior</Button>
      <Text mx={{ base: 0, md: 2 }}>
        Pagina: {currentPage + 1}/{Math.max(Math.round(length / 10), 1)}
      </Text>
      <Text mx={{ base: 0, md: 6 }}>Registros Total: {length} </Text>
      <Button onClick={handleNext}>Siguiente</Button>
    </Flex>
  );
}

export default Pagination;
