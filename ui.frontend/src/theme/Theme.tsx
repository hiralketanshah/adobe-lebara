import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import colors from "./colors";
const theme = extendTheme(
  {
    colors,
    fonts: {
      heading: "Roboto",
      body: "Roboto",
    },
  },
  withDefaultColorScheme({ colorScheme: "lebaraChambray" })
);

export default theme;
