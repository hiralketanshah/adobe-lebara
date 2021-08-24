import {extendTheme, withDefaultColorScheme} from "@chakra-ui/react";
import colors from "./colors";
import breakpoints from "./breakpoints";


const theme = extendTheme(
    {
        colors,
        breakpoints,
        fonts: {
            heading: "Roboto",
            body: "Roboto",
        },

    },
    withDefaultColorScheme({colorScheme: "lebaraChambray"})
);

export default theme;
