import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ x: 100, y: -20, opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
    >
      <Stack
        minH={"100vh"}
        justifyContent={"space-between"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Salud
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Financiera
              </Text>{" "}
            </Heading>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Empieza Ya!
              </Button>
              <Button rounded={"full"}>Cont&aacute;ctanos</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
          />
        </Flex>
      </Stack>
    </motion.div>
  );
}
