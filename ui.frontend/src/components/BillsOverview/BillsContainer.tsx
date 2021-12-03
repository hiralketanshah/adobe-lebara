import React from "react";
import moment from "moment";
import { BillOverviewProps } from "./types";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import BillOverview from "./BillsOverview";

const BillsContainer: React.FC<BillOverviewProps> = ({...rest}) => {
  const [getDashboardData] = useGetDashboardData();
  const isPostPaid = !!getDashboardData?.bills;
  return (<>
    {isPostPaid && getDashboardData?.bills?.length > 0 && (
        <BillOverview
            {...rest}
            data={getDashboardData.bills.map((t: any) => ({
            month: moment(t.period, "YYYY-MM-DD").format("MMM"),
            value: t.totalBillAmount,
        }))}
        />
    )}
  </>);
};

export default BillsContainer;
