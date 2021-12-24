import {
  Box,
  chakra,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import LogoImg from "../../assets/img/logo.png";

const Logo = (props) => {
  return <Image src={LogoImg} height={39} width={40} objectFit={"contain"} />;
};

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

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"full"}
        py={4}
        px={{ base: 0, md: 10 }}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>
          © {new Date().getFullYear()} Salud Financiera. Todos los derechos
          reservados
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Facebook"}
            href={"https://www.facebook.com/SaludFinacieraPe"}
          >
            <FaFacebook />
          </SocialButton>

          <SocialButton
            label={"Instagram"}
            href={"#https://www.instagram.com/saludfinanciera.pe/"}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
