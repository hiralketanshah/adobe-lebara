import {
  ChakraProvider,
  // ColorModeScript,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";
import colors from "./theme/colors";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";


const theme = extendTheme(
  {
    // colors,
    // For DE customization we hardcoded the different color pattern
    // latter on we will decide on the bases of domain name which color pattern needs to be follow
    colors,
    fonts: {
      heading: "Roboto",
      body: "Roboto",
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <ChakraProvider theme={theme}>
        {this.childComponents}
        {this.childPages}
      </ChakraProvider>
    );
  }
}

export default withModel(App);
