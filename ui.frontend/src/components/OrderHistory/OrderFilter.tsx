import React, { useState } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import Select from "@lebara/ui/src/components/Select/Select";
import Button from "@lebara/ui/src/components/Button/Button";
import DatePickerComp from "@lebara/ui/src/components/DatePicker/DatePicker";
import { OrderFilterProps, CompDefaultBindings } from "./types";

const OrderFilter: React.FC<OrderFilterProps> = ({
  isOpen,
  onClose,
  sims,
  onSubmit,
  frmFields,
}) => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const labelHeading = {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    color: "grey.300",
    mt: "15px",
  };
  const options = sims?.map((sim: any) => ({
    value: sim.value,
    name: sim.name,
    key: sim.key,
  }));
  const handleContinueClick = () => {
    onSubmit(fromDate, toDate);
  };
  const [selectedSim, setSelectedSim] = useState(options[0].value);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="8px" minHeight="auto" mx="18px">
        <ModalBody
          pt="39px"
          pb="62px"
          px={{ base: "23px", lg: "73px" }}
          w="auto"
          bgColor="white"
          borderRadius="8px"
        >
          <Flex flexDirection="column">
            <Text
              fontWeight="500"
              fontSize="20px"
              lineHeight="22px"
              letterSpacing="0.15px"
              mb="15px"
            >
              {frmFields?.modalTitle || CompDefaultBindings?.modalTitle}
            </Text>
            <Text {...labelHeading}>{frmFields?.fromLabel || CompDefaultBindings?.fromLabel}</Text>
            <DatePickerComp
              selectRange={false}
              dateValue={fromDate}
              onDateSelect={(date) => setFromDate(date)}
            />
            <Text {...labelHeading}>{frmFields?.toLabel || CompDefaultBindings?.toLabel}</Text>
            <DatePickerComp
              selectRange={false}
              dateValue={toDate}
              onDateSelect={(date) => setToDate(date)}
            />
            <Text fontWeight="500" fontSize="16px" lineHeight="22px" mt="23px">
              {frmFields?.mobileNumberLabel || CompDefaultBindings?.mobileNumberLabel}
            </Text>
            <Select
              id="chooseSim"
              backgroundColor="white"
              color="bodyCopy"
              fontWeight="normal"
              isRequired
              mt="6px"
              onChange={(e) => setSelectedSim(e.target.value)}
              value={selectedSim}
              options={options}
            />
            <Flex flexDir="column" justifyContent="center" alignItems="center">
              <Button
                w={{ base: "100%", lg: "284px" }}
                mt="39px"
                isDisabled={fromDate > toDate}
                onClick={() => handleContinueClick()}
              >
                {frmFields?.continueCTALabel || CompDefaultBindings?.continueCTALabel}
              </Button>
              <Button
                w={{ base: "100%", lg: "284px" }}
                variant="outline"
                mt="15px"
                onClick={onClose}
              >
                {frmFields?.cancelCTALabel || CompDefaultBindings?.cancelCTALabel}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default OrderFilter;
