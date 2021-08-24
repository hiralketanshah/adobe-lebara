import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./theme/Theme";

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <ChakraProvider theme={Theme}>
        {this.childComponents}
        {this.childPages}
      </ChakraProvider>
    );
  }
}

export default withModel(App);
