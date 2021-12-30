import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Landing from "layouts/Landing";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import SignIn from "views/Pages/SignIn";

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/admin" component={AdminLayout} />
            <Route path={`/auth`} component={SignIn} />
            <Route exact path={`/`} component={Landing} />
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}
