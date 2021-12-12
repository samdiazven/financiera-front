import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "components/Landing/NavBar";
import Hero from "components/Landing/Hero";
import Features from "components/Landing/Features";
import Services from "components/Landing/Services";
import Statistics from "components/Landing/Statistics";
import Testimonials from "components/Landing/Testimonials";
import Contacts from "components/Landing/Contacts";
import Socials from "components/Landing/Socials";
import Footer from "components/Landing/Footer";
function Landing() {
  return (
    <>
      <NavBar />
      <Hero />
      <Features />
      <Services />
      <Statistics />
      <Testimonials />
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "space-between", md: "space-around" }}
        alignItems={"center"}
      >
        <Socials />
        <Contacts />
      </Flex>
      <Footer />
    </>
  );
}

export default Landing;
