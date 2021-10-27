import React from "react";
import { Box } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import "@adyen/adyen-web/dist/adyen.css";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";
import { SuccessCard } from "../SuccessCard/SuccessCard";
import { SuccessCardProps } from './types';

const OrderSubmittedRoute: React.FC<SuccessCardProps> = ({
  title,
  thankYouMesage,
}) => {

  const { orderId } = useParams<{ orderId: string }>();

  return (
    <BuyPlanLayout hideButton noPadding fullWidth>
      <Box px={{ base: "20px", lg: "50px" }}>
        <Box mt="32px">
          <SuccessCard
            icon={IoIosCheckmarkCircleOutline}
            title={`${title}${orderId || 1}`}
            thankYouMesage={thankYouMesage}
          />
        </Box>
      </Box>
    </BuyPlanLayout>
  );
};

export default OrderSubmittedRoute;
