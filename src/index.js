import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Landing from "layouts/Landing";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route exact path={`/`} component={Landing} />
        </Switch>
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
