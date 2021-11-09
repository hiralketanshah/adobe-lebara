import { useLazyQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";
import React from "react";
import GET_DASHBOARD_DATA from "../graphql/GET_DASHBOARD_DATA";
import DataIcon from "../assets/images/dataIcon.png";
import MinIcon from "../assets/images/minIcon.png";
import SMSIcon from "../assets/images/smsIcon.png";
import GlobeIcon from "../assets/images/globeIcon.png";

function useGetDashboardData() {
  const location = useLocation<{
    msisdn?: string;
  }>();
  const msisdn = location?.state?.msisdn || "";
  const [getDashboardData, { data: dashboardData }] = useLazyQuery(
    GET_DASHBOARD_DATA,
    {
      variables: {
        type: "All",
        msisdn,
      },
    }
  );
  React.useEffect(() => {
    if (!msisdn) return;
    getDashboardData();
  }, [msisdn, getDashboardData]);
  if (!dashboardData || !dashboardData.getDashboardData)
    return [null, [], null];

  const { plans, balance } = dashboardData.getDashboardData;
  const formattedPlans = plans.map((plan: any) => ({
    name: plan.name,
    offerId: plan.offerId,
    plan: [
      {
        icon: DataIcon,
        planTabName: "Data",
        dataType: plan.total_data_unit,
        leftQuantity: plan.data_left,
        totalQuantity: plan.total_data,
        validUpto: moment(
          balance.find((t: any) => t.description === "Data")?.expirationDate
        ).format("MM/YY"),
      },
      {
        icon: MinIcon,
        planTabName: "DE Min",
        dataType: "Min",
        leftQuantity: plan.call_left,
        totalQuantity: plan.total_call,
        validUpto: moment(
          balance.find((t: any) => t.description.includes("DE National Voice"))
            ?.expirationDate
        ).format("MM/YY"),
      },
      ...(plan.total_sms !== 0
        ? [
          {
            icon: SMSIcon,
            planTabName: "UK SMS",
            dataType: "SMS",
            leftQuantity: plan.sms_left,
            totalQuantity: plan.total_sms,
            validUpto: undefined,
          },
        ]
        : []),
      {
        icon: GlobeIcon,
        planTabName: "International min",
        dataType: "Min",
        leftQuantity: plan.international_call_left,
        totalQuantity: plan.total_international_call,
        validUpto: moment(
          balance.find((t: any) => t.description === "DE_L2L_InBundle")
            ?.expirationDate
        ).format("MM/YY"),
      },
    ],
  }));
  return [dashboardData.getDashboardData, msisdn];
}

export default useGetDashboardData;
