import React from "react";
import { Box } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "@adyen/adyen-web/dist/adyen.css";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";
import { SuccessCard } from "../OrderSubmittedRoute/SuccessCard";
import { SuccessCardProps } from './types';

const OrderSubmittedRoute: React.FC<SuccessCardProps> = ({
  title,
  thankYouMessage,
}) => {

  const location = useLocation<{ orderId: string }>();
  const orderId = location.state?.orderId || "12345";

  return (
    <BuyPlanLayout hideButton noPadding fullWidth>
      <Box px={{ base: "20px", lg: "50px" }}>
        <Box mt="32px">
          <SuccessCard
            icon={IoIosCheckmarkCircleOutline}
            title={`${title}${orderId || 1}`}
            thankYouMessage={thankYouMessage}
          />
        </Box>
      </Box>
    </BuyPlanLayout>
  );
};

export default OrderSubmittedRoute;