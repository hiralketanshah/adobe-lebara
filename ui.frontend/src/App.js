import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import colors from "./theme/colors";
// This component is the application entry point

class App extends Page {
  render() {
    return (
      <>
        <ChakraProvider>
          <div>
            {this.childComponents}
            {this.childPages}
          </div>
        </ChakraProvider>
      </>
    );
  }
}

export default withModel(App);
