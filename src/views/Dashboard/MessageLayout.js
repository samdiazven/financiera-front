import React, { useEffect } from "react";
import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Messages from "./Messages";
import SendMessages from "./SendMessages";

function LayoutMessages() {
  return (
    <Tabs
      isFitted
      variant={"enclosed"}
      pt={{ base: "120px", md: "20px" }}
      mt={{ base: "120px", md: "50px" }}
      height={"200px"}
    >
      <TabList>
        <Tab>Lista</Tab>
        <Tab>Enviar</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Messages />
        </TabPanel>
        <TabPanel>
          <SendMessages />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LayoutMessages;
