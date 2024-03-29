import React, { useEffect } from "react";
// Chakra imports
import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Rols from "components/Access/Rols";
import Permises from "components/Access/Permises";
import { useDispatch } from "react-redux";
import { loadRols } from "store/slices/rols";
function Tables() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRols());
  }, []);
  return (
    <Tabs
      isFitted
      variant={"enclosed"}
      pt={{ base: "120px", md: "20px" }}
      mt={{ base: "120px", md: "50px" }}
      height={"200px"}
    >
      <TabList>
        <Tab>Roles</Tab>
        <Tab>Permisos</Tab>
      </TabList>
      <TabPanels>
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
