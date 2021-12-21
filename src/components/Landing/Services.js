import { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Replace test data with your own
const financiera = [
  {
    id: 1,
    text: "Presupuesto y planificación financiera.",
  },
  {
    id: 2,
    text: "Monitoreo y seguimiento financiero.",
  },
  {
    id: 3,
    text: "Aplacamiento financiero.",
  },
];
const tributaria = [
  {
    id: 1,
    text: "Atención a fiscalización y requerimiento Sunat.",
  },
  {
    id: 2,
    text: "Diagnóstico sobre cumplimientos tributarios.",
  },
  {
    id: 3,
    text: "Trámite de permisos ante SBS.",
  },
  {
    id: 4,
    text: "Implementación de sistemas de lavado de activos.",
  },
];
const contable = [
  {
    id: 1,
    text: "Constitución de empresas.",
  },
  {
    id: 2,
    text: "Elaboración de libros de registros contables.",
  },
  {
    id: 3,
    text: "Evaluación de estados financieros.",
  },
  {
    id: 4,
    text: "Declaraciones juradas - PDT ante SUNAT PLAME.",
  },
];

export default function Services(props) {
  const refDiv = props.ref;
  const animationControl = useAnimation();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      animationControl.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          delay: 1,
          duration: 0.8,
          type: "spring",
        },
      });
    }
  }, [inView]);
  return (
    <Box p={4} ref={refDiv}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Nuestros Servicios</Heading>
      </Stack>

      <Container maxW={"full"} px={{ base: 0, md: 10 }} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
          <motion.div
            ref={ref}
            initial={{ x: 0, y: -100, opacity: 0 }}
            animate={animationControl}
          >
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Asesoría Financiera</Text>
                {financiera.map((feature) => (
                  <Text color={"gray.600"} key={feature.id}>
                    {feature.text}
                  </Text>
                ))}
              </VStack>
            </HStack>
          </motion.div>
          <motion.div
            ref={ref}
            initial={{ x: 0, y: -100, opacity: 0 }}
            animate={animationControl}
          >
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Asesoría Tributaria</Text>
                {tributaria.map((feature) => (
                  <Text color={"gray.600"} key={feature.id}>
                    {feature.text}
                  </Text>
                ))}
              </VStack>
            </HStack>
          </motion.div>
          <motion.div
            ref={ref}
            initial={{ x: 0, y: -100, opacity: 0 }}
            animate={animationControl}
          >
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Asesoría Contable</Text>
                {contable.map((feature) => (
                  <Text color={"gray.600"} key={feature.id}>
                    {feature.text}
                  </Text>
                ))}
              </VStack>
            </HStack>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
