import React, { useState } from "react";
import { Box, Circle, Flex, Spacer } from "@chakra-ui/react";
import { IoCheckmarkCircle, IoChevronForwardSharp } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { MyBalanceCardProps } from "./types";
import LebaraText from "../LebaraText/LebaraText";
import Button from "../Button/Button";
import AutoTopUp from "./AutoTopup";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import getDynamicValues from "../../utils/get-aem-dynamic-values";
import { globalConfigs as GC, globalConstants as GCST } from "../../GlobalConfigs";

const MyBalanceCard: React.FC<MyBalanceCardProps> = ({
  ...props
}) => {
  const { title, description, topupLabel, autoTopupLabel, activeLabel, activeDesc, editLabel } = props;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [getDashboardData] = useGetDashboardData();
  const { mainBalance = "" } = getDashboardData || "";
  const isPostPaid = !!(getDashboardData && getDashboardData.bills);
  const isActivated = false;
  if (!isPostPaid) {
    return (
      <Flex flexDirection="column" bg="lightenPrimary.50" alignItems="center">
        <Flex
          w={{ base: "100%", lg: "846px" }}
          flexDirection="column"
          px={{ base: "20px", lg: 0 }}
          gridGap={{ base: "17px", lg: "20px" }}
          pt={{ base: "17px", lg: "20px" }}
        >
          <Box p={15} borderRadius="lg" bg="white">
            <Flex
              flexDirection={{ base: "row", md: "row" }}
              justifyContent={{ base: "space-between", md: "space-between" }}
            >
              <Box>
                <LebaraText type="subtitle2" color="primary.500">
                  {title}
                </LebaraText>
                <LebaraText type="body2" color="primary.800">
                  <span dangerouslySetInnerHTML={{ __html: getDynamicValues(description, [`<strong>${GC.currencySymbol}${mainBalance && mainBalance[0]?.currentAmount}</strong>`]) }} />
                </LebaraText>
              </Box>
              <Box width={{ base: "initial", md: "250px" }}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    isFullWidth
                    color="primary.500"
                    width={{ base: "initial", md: "150px" }}
                    display={{ base: "none", md: "inline-block" }}
                    onClick={() => history.push(GC.journeyPages[GCST.TOP_UP] || '/')}
                  >
                    <LebaraText
                      type="button"
                      color="white"
                      fontSize={16}
                      lineHeight="25px"
                      textTransform="uppercase"
                    >
                      {topupLabel}
                    </LebaraText>
                  </Button>
                  <Spacer />
                  <Circle size="80px" bg="darkTurquoise" color="white">
                    <LebaraText type="h6" color="white">
                      {mainBalance && mainBalance[0]?.currentAmount}
                    </LebaraText>
                  </Circle>
                </Flex>
              </Box>
            </Flex>
            <Button
              isFullWidth
              color="primary.500"
              display={{ base: "inline-block", md: "none" }}
              mt="17px"
              onClick={() => history.push(GC.journeyPages[GCST.TOP_UP] || '/')}
            >
              <LebaraText
                type="button"
                color="white"
                fontSize={16}
                lineHeight="25px"
                textTransform="uppercase"
              >
                {topupLabel}
              </LebaraText>
            </Button>
            <Box
              mt="15px"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <Flex flexDirection="row" alignItems="center">
                  <LebaraText type="subtitle2" color="primary.500">
                    {autoTopupLabel}
                  </LebaraText>
                  {isActivated && (
                    <>
                      <Box mx="5px">
                        <IoCheckmarkCircle
                          color="white"
                          fill="darkTurquoise"
                          size="20px"
                        />
                      </Box>
                      <LebaraText type="caption" color="darkTurquoise">
                        {activeLabel}
                      </LebaraText>
                    </>
                  )}
                </Flex>
                {isActivated && (
                  <LebaraText type="caption">
                    {/* replace 3 & 10 once backend is done in storybook */}
                    <span dangerouslySetInnerHTML={{ __html: getDynamicValues(activeDesc, [`<strong>${GC.currencySymbol}3</strong>`, `<strong>${GC.currencySymbol}10</strong>`]) }} />
                  </LebaraText>
                )}
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(true)}
                  rightIcon={<IoChevronForwardSharp color="secondary.500" />}
                >
                  <LebaraText
                    type="button"
                    color="secondary.500"
                    textTransform="uppercase"
                  >
                    {editLabel}
                  </LebaraText>
                </Button>
              </Box>
            </Box>
            <AutoTopUp
              open={open}
              close={() => setOpen(false)}
              {...props}
            />
          </Box>
        </Flex>
      </Flex>
    );
  }
  return <></>;
};

export default MyBalanceCard;
