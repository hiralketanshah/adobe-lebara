import React, { useState, useEffect } from "react";
import "@adyen/adyen-web/dist/adyen.css";
import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
// import { useHistory } from "@hooks/useHistory";
import { useHistory, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import moment from "moment";

import ChooseSim from "./ChooseSim";
import Order from "./Order";
import OrderFilter from "./OrderFilter";
import { selectMsisdn } from "../../redux/selectors/userSelectors";
import GET_ORDER_HISTORY from "../../graphql/GET_ORDER_HISTORY";
import Button from "../Button/Button";

import FilterIcon from "../../assets/images/filter.png";
import NoDataImage from "../../assets/images/order-history-no-data.png";

const OrderHistoryContainer: React.FC = () => {
  const history = useHistory();
  const { data: orderHistory } = useQuery(GET_ORDER_HISTORY, {
    variables: {
      country: "DE",
      channel: "Web",
    },
  });
  const groupBy = (items: any, key: any) =>
    items.reduce(
      (result: any, item: any) => ({
        ...result,
        [moment(item[key]).format("MMM YYYY")]: [
          ...(result[moment(item[key]).format("MMM YYYY")] || []),
          item,
        ],
      }),
      {}
    );
  const [orders, setOrders] = useState<any>({});
  useEffect(() => {
    if (orderHistory?.getOrderHistory)
      setOrders(groupBy(orderHistory?.getOrderHistory, "created"));
  }, [orderHistory]);

  const msisdn = useSelector(selectMsisdn);
  const msisdns = [
    {
      value: msisdn,
      name: msisdn,
      key: 1,
    },
  ];

  const [isFilterVisible, setFilterVisible] = useState(false);
  const setFilter = (dateFrom: Date, dateTo: Date) => {
    const orderDataHistory = orderHistory?.getOrderHistory?.filter(
      (order: any) =>
        new Date(order.created) >= dateFrom && new Date(order.created) <= dateTo
    );
    setOrders(orderDataHistory ? groupBy(orderDataHistory, "created") : {});
    setFilterVisible(false);
  };
  return (
    <>
      <Flex
        flexDirection="column"
        bg="lightenPrimary.50"
        justifyContent="center"
        alignItems="center"
        pb={{ base: "29px", lg: "100px" }}
        px={{ base: "20px" }}
      >
        <Flex width={{ base: "100%", lg: "846px" }}>
          <Text
            fontWeight="bold"
            display={{ base: "none", lg: "block" }}
            mt="30px"
            fontSize="20px"
            lineHeight="40px"
            letterSpacing="-0.01em"
            color="primary.500"
          >
            Order & Payment History
          </Text>
        </Flex>
        <Flex
          py={{ base: "30px", lg: "90px" }}
          px={{ base: "0px", lg: "149px" }}
          bg={{ base: "lightenPrimary.50", lg: "white" }}
          width={{ base: "100%", lg: "846px" }}
          mt={{ base: "0px", lg: "19px" }}
          borderRadius="8px"
          mb="9px"
          flexDirection="column"
        >
          <ChooseSim sims={msisdns} />
          <Flex mt={{ base: "30px", lg: "45px" }}>
            <Text
              fontWeight="500"
              fontSize="20px"
              lineHeight="28px"
              letterSpacing="0.15px"
            >
              Months
            </Text>
            <Flex
              ml="auto"
              alignItems="center"
              cursor="pointer"
              onClick={() => setFilterVisible(true)}
            >
              <Box height="17px" width="20px">
                <Image src={FilterIcon} />
              </Box>
              <Text
                ml="7px"
                fontWeight="bold"
                fontSize="16px"
                lineHeight="25px"
                letterSpacing="0.01em"
                color="secondary.500"
              >
                FILTER
              </Text>
            </Flex>
          </Flex>
          {Object.keys(orders).length > 0 ? (
            Object.keys(orders).map((key: string) => (
              <Box key={key} mt={{ base: "22px", lg: "29px" }}>
                <Text fontSize="16px" lineHeight="22px" letterSpacing="0.5px">
                  {key}
                </Text>
                {orders[key].map((order: any) => (
                  <Order
                    type={order.orderProducts[0].productType}
                    {...order}
                    key={order.orderId}
                  />
                ))}
              </Box>
            ))
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              mt="50px"
              flexDir="column"
            >
              <Image src={NoDataImage} height="257px" width="264px" />
              <Text
                fontWeight="500"
                fontSize="24px"
                lineHeight="30px"
                letterSpacing="0.25px"
                mt="31px"
              >
                Your order history is Empty
              </Text>
              <Text
                fontSize="16px"
                lineHeight="23px"
                letterSpacing="0.15px"
                mt="20px"
              >
                Looks like you haven’t made any orders yet
              </Text>
              <Button w="264px" mt="40px" onClick={() => history.push("/")}>
                Shop now
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <OrderFilter
        isOpen={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        sims={msisdns}
        onSubmit={(dateFrom: Date, dateTo: Date) => setFilter(dateFrom, dateTo)}
      />
    </>
  );
};

export default OrderHistoryContainer;
