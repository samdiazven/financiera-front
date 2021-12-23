import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as NextLink } from "react-router-dom";
import LogoImg from "../../assets/img/logo.png";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
const Logo = (props) => {
  return <Image src={LogoImg} height={35} width={35} objectFit={"cover"} />;
};

export default function NavBar({ onClick }) {
  const Links = [
    { name: "Inicio", ref: "hero" },
    { name: "Nosotros", ref: "features" },
    { name: "¿Qué hacemos?", ref: "services" },
    { name: "Estadísticas", ref: "stadistics" },
    { name: "Referencias", ref: "testimonials" },
    { name: "Contáctanos", ref: "contacts" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const handleScroll = (name) => onClick(name);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          flexGrow={1}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack flexGrow={1} spacing={8} alignItems={"center"}>
            <Box ml={{ base: 4, md: 0 }}>
              <Logo />
            </Box>
            <HStack
              flexGrow={1}
              justifyContent={"center"}
              as={"nav"}
              spacing={6}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={link.ref}
                  onClick={() => handleScroll(link.ref)}
                >
                  {link.name}
                </div>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <NextLink style={{ marginRight: "2rem" }} to="auth/signin">
              Login
            </NextLink>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                key={useColorModeValue("light", "dark")}
                style={{ display: "inline-block" }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Toggle theme"
                  icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
                ></IconButton>
              </motion.div>
            </AnimatePresence>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={link.ref}
                  onClick={() => handleScroll(link.ref)}
                >
                  {link.name}
                </div>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
