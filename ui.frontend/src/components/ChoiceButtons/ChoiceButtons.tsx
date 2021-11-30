import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";
import { ChoiceButtonsProps } from "./types";
import LebaraText from "../LebaraText/LebaraText";
import { saveFormDetails } from "../../redux/actions/formsActions";
import { useDispatch } from "react-redux";

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  text,
  buttonOptions,
  formName
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Box
      px={{ base: "16px", md: "0px" }}
      py={{ base: "32px", lg: "84px" }}
      background="white"
      borderRadius="md"
      alignItems="center"
    >
      <LebaraText
        fontFamily={{ lg: "Chiswick Grotesque Lebara" }}
        fontWeight={{ base: "500", lg: "700" }}
        pb={{ base: "39px", lg: "35px" }}
        fontSize={{ base: "16px", lg: "32px" }}
        type="formLabel"
        lineHeight={{ base: "22px", lg: "41px" }}
        textAlign="center"
        color="primary.500"
        letterSpacing={{ base: "0.15px", lg: "0.25px" }}
      >
        {text}
      </LebaraText>

      <VStack spacing={{ base: "23px", lg: "17px" }}>
        {buttonOptions.map(({ key, path, state, onClick, ...rest }) => (
          <Button
            maxW={{ lg: "296px" }}
            key={key}
            textTransform="uppercase"
            {...rest}
            isFullWidth
            onClick={() =>{
              dispatch(
                saveFormDetails({
                  formName: formName || "simChoice",
                  values: {
                    selectedValue: key,
                  },
                })
              );
              if (onClick) {
                onClick();
                return;
              }
              if (path) {
                history.push(path, state);
              }
            }
            }
          />
        ))}
      </VStack>
    </Box>
  );
};

export default ChoiceButtons;
