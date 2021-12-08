import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { globalConfigs as GC } from "../../GlobalConfigs";
import BillsOverviewIcon from "../../assets/images/BillsOverview.png";
import { BillOverviewProps } from "./types";

const BillOverview: React.FC<BillOverviewProps> = ({ title, data }) => (
  <Box px="35px" py="20px" bgColor="white" borderRadius="12px" width="100%">
    <Flex alignItems="center">
      <Image src={BillsOverviewIcon} />
      <Text
        ml="10px"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="0.1px"
        color="primary.500"
      >
        {title}
      </Text>
    </Flex>
    <Box width="100%" height="220px" mt="15px">
      <ResponsiveContainer width="100%" height="100%">
          <BarChart height={220} data={data || []}>
          <Bar
            dataKey="value"
            barSize={30}
            fill="#00A6EB"
            radius={[10, 10, 10, 10]}
          />
          <XAxis
            height={40}
            dataKey="month"
            tick={(props) => (
              <svg>
                <text
                  textAnchor="middle"
                  fontWeight="bold"
                  x={props.x}
                  y={props.y + 10}
                >
                  {data && data[props.payload.index].value}{" "}{GC.currencySymbol}
                </text>
                <text textAnchor="middle" x={props.x} y={props.y + 30}>
                  {props.payload.value}
                </text>
              </svg>
            )}
            axisLine={false}
            tickLine={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

export default BillOverview;
