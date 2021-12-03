import React, { useCallback, useState } from "react";
import moment from "moment";
import { useApolloClient } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import GET_DASHBOARD_DATA from "../graphql/GET_DASHBOARD_DATA";
import DataIcon from "../assets/images/dataIcon.png";
import MinIcon from "../assets/images/minIcon.png";
import SMSIcon from "../assets/images/smsIcon.png";
import GlobeIcon from "../assets/images/globeIcon.png";
import { DashboardPlanLabelsProps } from "../components/PlanManagement/types";
import { selectMsisdn } from "../redux/selectors/userSelectors";
import { setLoading } from "../redux/actions/loadingActions";


function useGetDashboardData(planLabels?: DashboardPlanLabelsProps) {
  const msisdn = useSelector(selectMsisdn);
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState<any>(undefined);
  const client = useApolloClient();

  const getDashboardData = useCallback(async () => {
    try {
      setDashboardData(
        (
          await client.query({
            query: GET_DASHBOARD_DATA,
            variables: {
              type: "All",
              msisdn,
            },
          })
        ).data
      );
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }, [client, msisdn]);

  const reloadDashboard = async () => {
    dispatch(setLoading(true));
    await getDashboardData();
    dispatch(setLoading(false));
  };

  React.useEffect(() => {
    if (!msisdn) return;
    dispatch(setLoading(true));
    getDashboardData().then(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch, msisdn, getDashboardData]);

  if (!dashboardData || !dashboardData.getDashboardData)
    return [null, null, undefined];

  const { plans, balance, userOffers } = dashboardData.getDashboardData;
  const formattedPlans = plans.map((plan: any) => {
    const offer = userOffers.find((item: any) => item.offerId === plan.offerId);
    return {
    name: plan.name,
    offerId: plan.offerId,
    price: offer.cost / 100,
    expirationDate: moment(plan.expiration).format("D, MMM YYYY"),
    validity: offer.validity,
    duration: `${offer.validity} Days`,
    data: `${offer.allowances[0].allowanceValue / 1024}GB`,
    recurring: plan.recurring,
    internationalCalls: offer.allowances.find(
      (t: any) => t.account.name === "DE_Srilanka_India_EU_voice"
    )?.allowanceValue,
    nationalCalls:
      offer.allowances.find(
        (t: any) => t.account.name === "DE_National_Voice"
      )?.allowanceValue || "Unlimited",
    plan: [
      {
        icon: DataIcon,
        planTabName: planLabels?.dataPlanName,
        dataType: plan.total_data_unit || planLabels?.dataType,
        leftQuantity: plan.data_left,
        totalQuantity: plan.total_data,
        validUpto: moment(
          balance.find((t: any) => t.description === "Data")?.expirationDate
        ).format("MM/YY"),
      },
      {
        icon: MinIcon,
        planTabName: planLabels?.minPlanName,
        dataType: planLabels?.minDataType,
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
            planTabName: planLabels?.smsPlanName,
            dataType: planLabels?.smsDataType,
            leftQuantity: plan.sms_left,
            totalQuantity: plan.total_sms,
            validUpto: undefined,
          },
        ]
        : []),
      {
        icon: GlobeIcon,
        planTabName: planLabels?.internationalMinPlanName,
        dataType: planLabels?.internationalMinDataType,
        leftQuantity: plan.international_call_left,
        totalQuantity: plan.total_international_call,
        validUpto: moment(
          balance.find((t: any) => t.description === "DE_L2L_InBundle")
            ?.expirationDate
        ).format("MM/YY"),
      },
    ],
  };
});
  return [
    dashboardData.getDashboardData, 
    msisdn,
    reloadDashboard,
    formattedPlans,
  ];
}

export default useGetDashboardData;
