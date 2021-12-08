import React from "react";
import { Text, Box, Flex, Image } from "@chakra-ui/react";
import moment from "moment";
import { OrderProps } from "./types";
import OrderHistoryPlan from "../../assets/images/order-history-plan.png";
import { formatNumber } from "../../utils/formatNumber";

const Order: React.FC<OrderProps> = ({
  type,
  // name,
  actualAmount,
  created,
  paymentMethod,
  orderId,
}) => {
  const styles = {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    color: "primary.800",
  };
  return (
    <Box
      mt={{ base: "10px", lg: "14px" }}
      mb={{ base: "0px", lg: "14px" }}
      bg="white"
      borderRadius="8px"
      borderWidth={{ base: "0px", lg: "0.5px" }}
      borderColor="grey.200"
      px={{ base: "15px", lg: "20px" }}
      py="15px"
    >
      <Flex>
        <Flex
          height="35px"
          width="35px"
          borderRadius="17.5px"
          bg="grey.50"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={OrderHistoryPlan} />
        </Flex>
        <Box ml={{ base: "7px", lg: "15px" }} width="100%">
          <Text
            color="primary.800"
            fontWeight="bold"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.1px"
          >
            {type}
          </Text>
          <Box>
            <Flex alignItems="center">
              <Box>
                {/* <Text
                  color="primary.500"
                  fontWeight="bold"
                  fontSize="16px"
                  lineHeight="22px"
                  letterSpacing="0.5px"
                >
                  {name || type}
                </Text> */}
                <Text
                  mt="2px"
                  color="grey.300"
                  fontWeight="500"
                  fontSize="12px"
                  lineHeight="14px"
                  letterSpacing="0.25px"
                >
                  {moment(created).format("DD MMM, YYYY HH:mma")}
                </Text>
              </Box>
              <Text
                ml="auto"
                color="primary.500"
                fontWeight="500"
                fontSize="24px"
                lineHeight="30px"
                letterSpacing="0.25px"
              >
                {formatNumber(Number(actualAmount) / 100)} €
              </Text>
            </Flex>
            <Flex mt="7px">
              <Text {...styles}>Payment Mode</Text>
              <Text {...styles} ml="auto">
                {paymentMethod}
              </Text>
            </Flex>
            <Flex mt="7px">
              <Text {...styles}>Reference Number</Text>
              <Text {...styles} ml="auto">
                {orderId}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default Order;
