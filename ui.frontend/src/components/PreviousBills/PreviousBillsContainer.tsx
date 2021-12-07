import React from "react";
import { PreviousBillProps } from "./types";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import PreviousBills from "./PreviousBills";

const PreviousBillsContainer: React.FC<PreviousBillProps> = ({...rest}) => {
  const [getDashboardData] = useGetDashboardData();
  const isPostPaid = !!getDashboardData?.bills;
  return (<>
      {isPostPaid && getDashboardData?.bills?.length > 0 && (
        <PreviousBills bills={getDashboardData?.bills} {...rest} />
      )}
  </>);
};

export default PreviousBillsContainer;
