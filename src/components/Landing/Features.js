import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoIosTrendingUp,
  IoAlbums,
  IoSearchSharp,
} from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container
      maxW={"full"}
      py={12}
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={
              "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            objectFit={"cover"}
          />
        </Flex>
        <Stack spacing={4} px={{ sm: 2, md: 20 }}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Nosotros
          </Text>
          <Heading>Agencia Financiera</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Somos una empresa peruana que brinda soluciones financieras a
            emprendedores y empresarios de todo rubro.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={IoAlbums} color={"yellow.500"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Asesoriamiento Contable"}
            />
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"green.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Asesoramiento Financiero"}
            />
            <Feature
              icon={
                <Icon
                  as={AiFillDollarCircle}
                  color={"purple.500"}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Asesoriamiento Tributario"}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
