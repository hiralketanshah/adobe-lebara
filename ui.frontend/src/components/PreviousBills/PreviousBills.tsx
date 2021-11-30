import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/all";
import PreviousBillPaidDetails from "../../assets/images/previousBillPaidDetails.png";
import Button from "../Button/Button";
import { globalConfigs as GC } from "../../GlobalConfigs";
import { PreviousBillProps } from "./types";
import { formatNumber } from "../../utils/formatNumber";
import moment from "moment";

const PreviousBills: React.FC<PreviousBillProps> = ({ 
  dateLabel,
  ctaButtonLabel,
  ctaLoadMoreLabel,
  bills,
 }) => {
  const [totalBills] = React.useState(bills || []);
  const [billsToShow, setBillsToShow] = React.useState(5);
  const shownBills = (bills && bills.slice(0, billsToShow)) || [];
  
  return (
    <Box>
      {shownBills?.map((t: any) => (
        <Box
          mt="15px"
          backgroundColor="white"
          borderRadius="12px"
          pl="25px"
          pr="20px"
          py="19px"
        >
          <Flex alignItems="center">
            <Box>
              <Text
                fontSize="10px"
                lineHeight="17px"
                letterSpacing="0.23px"
                color="grey.300"
              >
                {dateLabel || 'Date'}: {moment(t.period, "YYYY-MM-DD").format("DD.MM.YYYY")}
              </Text>
              <Flex mt="2px">
                <img
                  src={PreviousBillPaidDetails}
                  alt="Pay"
                  width="14.25px"
                  height="18px"
                />
                <Text
                  fontSize="20px"
                  lineHeight="18px"
                  letterSpacing="0.15px"
                  fontWeight="500"
                  color="primary.800"
                  ml="8px"
                >
                  {GC.currencySymbol}{formatNumber(t.totalBillAmount)}
                </Text>
              </Flex>
            </Box>
            <Button
              marginLeft="auto"
              alignItems="center"
              color="primary.800"
              rightIcon={<IoIosArrowForward size={20} fill="#3D4998" />}
              variant="ghost"
              onClick={() => window.open(t.pdfUrl)}
            >
              <Text
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.25px"
                mr="11px"
              >
                {ctaButtonLabel || 'View Bill'}
              </Text>
            </Button>
          </Flex>
        </Box>
      ))}

      {billsToShow < totalBills?.length && (
        <Flex justifyContent="center">
          <Button
            width={{ base: "100%", md: "295px" }}
            marginTop="17px"
            variant="outline"
            onClick={() => setBillsToShow(billsToShow + 5)}
          >
            {ctaLoadMoreLabel || 'Load more'}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default PreviousBills;
