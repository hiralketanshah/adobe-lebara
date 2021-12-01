import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Icon } from "../Icon/Icon";
import { SuccessCardProps } from "./types";
import { selectIsAuthenticated } from "../../redux/selectors/userSelectors";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalConfigs as GC, globalConstants as GCST } from "../../GlobalConfigs";
export const SuccessCard: React.FC<SuccessCardProps> = ({
  icon = IoIosCheckmarkCircleOutline,
  title,
  subtitle,
  msisdn,
  extraButton,
  dashboardButtonLabel
}) => {
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);
return (
  <Box
  w="100%"
  p={50}
  color="white"
  bg="primary.800"
  borderRadius="lg"
  marginTop={{ md: "30px" }}
>
  <Box
    d="flex"
    flexDir="column"
    justifyContent="center"
    alignItems="center"
  >
    <Icon
      icon={icon}
      h="42px"
      w="42px"
      marginTop={{ md: "45px" }}
      mb="20px"
    />

    {title && (
      <Text
        fontSize="20px"
        as="h1"
        textAlign="center"
        fontWeight="500"
        pb="15px"
        lineHeight="19px"
      >
        {title}
      </Text>
    )}
    {subtitle && (
      <Text
        fontSize="14px"
        textAlign="center"
        lineHeight="20px"
        whiteSpace="pre-line"
        width={{ md: "48%" }}
        marginBottom={{ base: "10px", md: "30px" }}
      >
        {subtitle}
      </Text>
    )}
    {isAuthenticated && (
      <Button
        minW="279px"
        onClick={() =>
          history.push((GC.journeyPages[GCST.DASHBOARD] || ''), {
            msisdn,
          })
        }
      >
      {dashboardButtonLabel}
      </Button>
    )}
    {extraButton}
  </Box>
</Box>
);
      }

export default SuccessCard;
