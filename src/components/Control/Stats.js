import React from "react";
import {
  StatGroup,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  Flex,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";

function Stats({ stats }) {
  let amortization = Object.entries(stats).map((item) => {
    let [key, value] = item;
    let label = key;
    let amount = value;
    return { label, amount };
  });

  return (
    <Stack marginTop={{ base: 10, md: 20 }}>
      <Card>
        <CardHeader>
          <Heading as="h3" size={"lg"}>
            Amortizaci&oacute;n
          </Heading>
        </CardHeader>
        <StatGroup marginTop={10}>
          {amortization.map(({ label, amount }) => (
            <Stat key={label}>
              <StatLabel>{label}</StatLabel>
              <Flex alignItems={"center"}>
                <StatNumber>{amount}</StatNumber>
                <StatArrow marginLeft={2} type="increase" />
              </Flex>
            </Stat>
          ))}
        </StatGroup>
      </Card>
    </Stack>
  );
}

export default Stats;
