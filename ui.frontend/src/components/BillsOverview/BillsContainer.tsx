import React from "react";
import moment from "moment";
import { BillOverviewProps } from "./types";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import BillOverview from "./BillsOverview";
import { Flex } from "@chakra-ui/react";

const BillsContainer: React.FC<BillOverviewProps> = ({ ...rest }) => {
  const [getDashboardData] = useGetDashboardData();
  const isPostPaid = !!getDashboardData?.bills;
  return (<>
    {isPostPaid && getDashboardData?.bills?.length > 0 && (
      <Flex flexDirection="column" alignItems="center">
        <Flex
          w={{ base: "100%", lg: "846px" }}
          flexDirection="column"
          px={{ base: "20px", lg: 0 }}
          gridGap={{ base: "17px", lg: "20px" }}
          pt={{ base: "17px", lg: "20px" }}
        >
          <BillOverview
            {...rest}
            data={getDashboardData.bills.map((t: any) => ({
              month: moment(t.period, "YYYY-MM-DD").format("MMM"),
              value: t.totalBillAmount,
            }))}
          />
        </Flex>
      </Flex>
    )}
  </>);
};

export default BillsContainer;
