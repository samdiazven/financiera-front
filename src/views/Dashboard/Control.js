import React from "react";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getLoanSelected } from "store/selectors/loans";

function Control() {
  const loan = useSelector(getLoanSelected);
  console.log("HERE -> ");
  console.log(loan);
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Text color={"white"}>{loan.loanName}</Text>
    </div>
  );
}

export default Control;
