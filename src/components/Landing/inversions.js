import { useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import Transporte from "../../assets/img/Transporte.png";
import Digitales from "../../assets/img/Digitales.png";
import Agro from "../../assets/img/Agro.png";
import Grupales from "../../assets/img/Grupales.png";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const inversiones = [
  {
    Image: Transporte,
    title: "Sector de Transporte",
  },
  {
    Image: Digitales,
    title: "Sector Digital",
  },
  {
    Image: Agro,
    title: "Sector Agrario",
  },
  {
    Image: Grupales,
    title: "Inversiones Grupales",
  },
];

export default function ProductSimple() {
  const animationControl = useAnimation();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      animationControl.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.8,
          duration: 1.2,
          type: "spring",
        },
      });
    }
  }, [inView]);
  return (
    <>
      <Stack
        spacing={4}
        mt={10}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
      >
        <Heading fontSize={"3xl"}>Nuestras Inversiones</Heading>
      </Stack>

      <Flex
        py={12}
        alignItems={"center"}
        direction={{ base: "column", md: "row" }}
        justifyContent={"center"}
      >
        {inversiones.map((inversion, idx) => (
          <motion.div
            key={idx}
            ref={ref}
            initial={{
              x: idx % 2 === 0 ? -200 : 200,
              y: -500,
              opacity: 0,
            }}
            animate={animationControl}
          >
            <Box
              role={"group"}
              p={6}
              mx={4}
              maxW={{ base: "full", md: "330px" }}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"230px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${inversion.Image})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"contain"}
                  src={inversion.Image}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {inversion.title}
                </Heading>
              </Stack>
            </Box>
          </motion.div>
        ))}
      </Flex>
    </>
  );
}
