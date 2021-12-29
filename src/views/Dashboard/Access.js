import React from "react";
// Chakra imports
import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Users from "components/Access/Users";
import Rols from "components/Access/Rols";
import Permises from "components/Access/Permises";
function Tables() {
  return (
    <Tabs
      isFitted
      variant={"enclosed"}
      pt={{ base: "120px", md: "20px" }}
      mt={{ base: "120px", md: "50px" }}
      height={"200px"}
    >
      <TabList>
        <Tab>Usuarios</Tab>
        <Tab>Roles</Tab>
        <Tab>Permisos</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Users />
        </TabPanel>
        <TabPanel>
          <Rols />
        </TabPanel>
        <TabPanel>
          <Permises />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Tables;
