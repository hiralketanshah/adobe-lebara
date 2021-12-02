import React from "react";
import { Box } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "@adyen/adyen-web/dist/adyen.css";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";
import {SuccessCard} from "@lebara/ui/src/components/SuccessCard/SuccessCard";
import { SuccessCardProps } from './types';
import getDynamicValues from "../../utils/get-aem-dynamic-values";

const OrderSubmittedRoute: React.FC<SuccessCardProps> = ({
  orderIdTitle,
  simOnlyTitle,
  title,
  orderIdSubtitle,
  simOnlySubtitle,
  planChangeSubtitle,
  dashboardButtonLabel
}) => {

  const location = useLocation<{
    orderId: string;
    msisdn?: string;
    activatedSimOnly?: boolean;
    previousPlanName?: string;
    currentPlan?: string;
  }>();
  const orderId = location.state?.orderId;
  const activatedSimOnly = location?.state?.activatedSimOnly;
  return (
    <BuyPlanLayout hideButton noPadding fullWidth>
      <Box px={{ base: "20px", lg: "50px" }}>
        <Box mt="32px">
          <SuccessCard
          dashboardButtonLabel={dashboardButtonLabel}
            msisdn={location?.state?.msisdn}
            icon={IoIosCheckmarkCircleOutline}
            title={
              orderId
                ? `${orderIdTitle}${orderId}`
                : activatedSimOnly
                  ? simOnlyTitle
                  : title
            }
            subtitle={
              orderId
                ? orderIdSubtitle
                : activatedSimOnly
                  ? simOnlySubtitle
                  : getDynamicValues(planChangeSubtitle, [location?.state?.msisdn, location?.state?.previousPlanName, location?.state?.currentPlan])
            }
          />
        </Box>
      </Box>
    </BuyPlanLayout>
  );
};

export default OrderSubmittedRoute;
