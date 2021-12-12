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
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

export default function Services() {
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
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>This is the headline</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={"full"} px={{ base: 0, md: 10 }} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, idx) => (
            <motion.div
              ref={ref}
              initial={{ x: idx % 2 === 0 ? -40 : 40, y: -40, opacity: 0 }}
              animate={animationControl}
            >
              <HStack key={feature.id} align={"top"}>
                <Box color={"green.400"} px={2}>
                  <Icon as={CheckIcon} />
                </Box>
                <VStack align={"start"}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={"gray.600"}>{feature.text}</Text>
                </VStack>
              </HStack>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
