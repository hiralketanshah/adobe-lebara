import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/all";
import Select from "@lebara/ui/src/components/Select/Select";
import StatementIcon from "../../assets/images/order-history.png";
import { ChooseSimProps, CompDefaultBindings } from "./types";

const ChooseSim: React.FC<ChooseSimProps> = ({ sims, frmFields }) => {
  const [selectedSim, setSelectedSim] = React.useState(sims[0].value);
  const options = sims.map((sim: any) => ({
    value: sim.value,
    name: sim.name,
    key: sim.key,
  }));
  return (
    <Box
      bg="white"
      width="100%"
      borderWidth={{ base: "0px", lg: "0.5px" }}
      borderColor="grey.200"
      borderRadius="8px"
      py="24px"
      pl={{ base: "13px", lg: "78px" }}
      pr={{ base: "9px", lg: "51px" }}
    >
      <Text
        fontSize="20px"
        lineHeight="28px"
        fontWeight="500"
        letterSpacing="0.15px"
      >
        {frmFields?.historyLabel || CompDefaultBindings?.historyLabel}
      </Text>
      <Select
        id="chooseSim"
        backgroundColor="white"
        color="bodyCopy"
        fontWeight="normal"
        isRequired
        mt="23px"
        onChange={(e) => setSelectedSim(e.target.value)}
        value={selectedSim}
        options={options}
      />
      <Flex
        py="15px"
        boxShadow="0px 0px 6px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        mt="21px"
        px="23px"
        alignItems="center"
      >
        <Image src={StatementIcon} height="20px" width="22px" />
        <Text
          fontWeight="300"
          fontSize="12px"
          lineHeight="14px"
          ml={{ base: "15px", lg: "20px" }}
        >
          {frmFields?.transactionSummery || CompDefaultBindings?.transactionSummery}
        </Text>
        <Box ml="auto" cursor="pointer">
          <IoIosArrowForward />
        </Box>
      </Flex>
    </Box>
  );
};

export default ChooseSim;
