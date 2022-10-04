import {withPageHook, App} from "../../core/src/setupApp";
import store from "@lebara/netherlands/redux/store";
import { withModel } from "@adobe/aem-react-editable-components";
import { extendTheme, withDefaultColorScheme,} from "@chakra-ui/react";
import colors from "@lebara/core/theme/colors";

const theme = extendTheme(
    {
      colors,
      fonts: {
        heading: "Chiswick Grotesque Lebara",
        body: "Roboto",
      },
      components: {
        Radio: {
          parts: ['label'],
          baseStyle: {
            label: {
              flex: "1",
            }
          }
        },
        Checkbox: {
          parts: ['label'],
          baseStyle: {
            label: {
              flex: "1",
            }
          }
        }
      }
    },
    withDefaultColorScheme({ colorScheme: "primary" })
  );
export default withModel(withPageHook(App, store, theme));