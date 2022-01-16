import React, { useEffect } from "react";
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import Messages from "./Messages";
import SendToGroup from "components/SendMessages/SendToGroup";
import SendIndividual from "components/SendMessages/SendIndividual";
import { useSelector, useDispatch } from "react-redux";
import { getLoanState } from "store/selectors/loans";
import { getLoans } from "store/selectors/loans";
import { getMessages, getMessagesState } from "store/selectors/messages";
import { LoadState } from "store/slices/state";
import { loadLoans } from "store/slices/loan";

function LayoutMessages() {
  const dispatch = useDispatch();
  const stateLoans = useSelector(getLoanState);
  const loans = useSelector(getLoans);
  const messages = useSelector(getMessages);
  const stateMessages = useSelector(getMessagesState);
  useEffect(() => {
    if (stateLoans === LoadState.NOT_LOADED) {
      dispatch(loadLoans());
    }
  });
  if (stateLoans === LoadState.LOADING || stateMessages === LoadState.LOADING) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size={"xl"} />
      </div>
    );
  }
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
        <Tab>Envios grupales</Tab>
        <Tab>Envios individuales</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Messages />
        </TabPanel>
        <TabPanel>
          <SendToGroup messages={messages} groups={loans} />
        </TabPanel>
        <TabPanel>
          <SendIndividual messages={messages} groups={loans} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LayoutMessages;
