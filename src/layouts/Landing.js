import { useRef } from "react";
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
  const scrollIntoView = (ref) => {
    console.log(ref);
    refs[ref].current.scrollIntoView({ behavior: "smooth" });
  };
  const refs = {
    hero: useRef(null),
    features: useRef(null),
    services: useRef(null),
    stadistics: useRef(null),
    testimonials: useRef(null),
    contacts: useRef(null),
    footer: useRef(null),
  };

  return (
    <>
      <NavBar onClick={scrollIntoView} />
      <div ref={refs.hero}>
        <Hero />
      </div>

      <div ref={refs.features}>
        <Features />
      </div>

      <div ref={refs.services}>
        <Services />
      </div>

      <div ref={refs.stadistics}>
        <Statistics />
      </div>

      <div ref={refs.testimonials}>
        <Testimonials />
      </div>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "space-between", md: "space-around" }}
        alignItems={"center"}
        ref={refs.contacts}
      >
        <Socials />
        <Contacts />
      </Flex>
      <div ref={refs.footer}>
        <Footer />
      </div>
    </>
  );
}

export default Landing;
