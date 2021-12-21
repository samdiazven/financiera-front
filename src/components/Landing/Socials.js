import React from "react";
import {
  VStack,
  chakra,
  useColorModeValue,
  VisuallyHidden,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMobile,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

function Socials() {
  return (
    <VStack
      direction={"column"}
      spacing={6}
      alignItems={"center"}
      marginTop={{ base: "12", md: 0 }}
    >
      <Flex alignItems={"center"} marginRight={"16"}>
        <SocialButton label={"Twitter"} href={"#"}>
          <FaFacebook />
        </SocialButton>
        <Text
          ml={4}
          style={{
            color: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
          }}
        >
          @saludfinancierape
        </Text>
      </Flex>
      <Flex alignItems={"center"}>
        <SocialButton label={"Twitter"} href={"#"}>
          <FaMailBulk />
        </SocialButton>
        <Text
          ml={4}
          style={{
            color: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
          }}
        >
          contacto@saludfinanciera.pe{" "}
        </Text>
      </Flex>
    </VStack>
  );
}

export default Socials;