import React, { useState, useEffect } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanState } from "store/selectors/loans";
import { getLoans } from "store/selectors/loans";
import { getMessages, getMessagesState } from "store/selectors/messages";
import { LoadState } from "store/slices/state";
import SendToGroup from "components/SendMessages/SendToGroup";
import { loadLoans } from "store/slices/loan";
import SendIndividual from "components/SendMessages/SendIndividual";
function SendMessages() {
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
    <Stack spacing={4} marginTop={{ base: 10, md: 40 }}>
      <SendToGroup groups={loans} messages={messages} />
      <SendIndividual groups={loans} messages={messages} />
    </Stack>
  );
}

export default SendMessages;
