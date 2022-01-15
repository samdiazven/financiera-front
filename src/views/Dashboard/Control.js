import React, { useEffect, useState } from "react";
import Loan from "apis/loans";
import { Divider, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getLoanSelected } from "store/selectors/loans";
import Stats from "components/Control/Stats";
import Clients from "components/Control/Clients";
import Dates from "components/Control/Dates";

function Control() {
  const loan = useSelector(getLoanSelected);
  const [loanInformation, setLoanInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [random, setRandom] = useState(null);
  const handleAddUserToLoan = async (userId) => {
    const loanInstance = new Loan();
    try {
      await loanInstance.addUserToLoan([
        {
          idLoan: loan.idLoan,
          idClient: userId,
        },
      ]);
      setRandom(Math.random() * 100);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const loanInstance = new Loan();
        const resData = await loanInstance.getFullLoan(loan.idLoan);
        setLoanInformation(resData);
      } catch (error) {
        setError("Hubo un error obteniendo la información del prestamo");
      }
      setIsLoading(false);
    }
    getData();
  }, [loan, random]);

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Spinner size={"xl"} />
      </div>
    );

  if (error) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Text>Lo sentimos hubo un error</Text>
      </div>
    );
  }
  return (
    <Stack>
      <Stats stats={loanInformation.amortization} />
      <Divider paddingTop={5} />
      <Clients
        clients={loanInformation.clientList}
        addToLoan={handleAddUserToLoan}
      />
      <Divider paddingBottom={5} />
      <Dates dates={loanInformation.paymentSchedule} />
    </Stack>
  );
}

export default Control;
