import React, { useState } from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AutoTopUpProps } from "./types";
import Select from "../Select/Select";
import Button from "../Button/Button";
import Switch from "../ToggleSwitch/Switch";
import AutoTopupIcon from "../../assets/images/AutoPopup.png";
import getDynamicValues from "../../utils/get-aem-dynamic-values";
import { globalConfigs as GC } from "../../GlobalConfigs";
import { SelectOption } from "../Select/types";

const AutoTopUp: React.FC<AutoTopUpProps> = ({
  open,
  close,
  autoTopupLabel,
  activeDesc,
  topupSelectLabel,
  limitSelectLabel,
  autoTopupButtonLabel,
  autoTopupStatusLabel,
  activeLabel,
  topUpOptions
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const selectOptions: SelectOption[] = topUpOptions.map(option => ({ name: `${GC.currencySymbol}${option}`, value: option }));
  return (
    <Modal isOpen={open} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent minHeight="auto" maxWidth="375px">
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody px="30px" pb="25px">
          <Box>
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Image src={AutoTopupIcon} height="55px" width="55px" />
              <Text
                fontWeight="bold"
                fontSize="20px"
                lineHeight="40px"
                letterSpacing="-0.01em"
                color="primary.800"
              >
                {autoTopupLabel}
              </Text>
              <Text
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.25px"
                color="primary.800"
                textAlign="center"
              >
                {/* replace 3 & 10 once backend is done in storybook */}
                <span dangerouslySetInnerHTML={{ __html: getDynamicValues(activeDesc, [`<strong>${GC.currencySymbol}3</strong>`, `<strong>${GC.currencySymbol}10</strong>`]) }} />
              </Text>
            </Flex>
            <Text
              fontWeight="bold"
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.1px"
              color="primary.500"
              mt="20px"
            >
              {topupSelectLabel}
            </Text>
            <Select options={selectOptions} formControlBorderRadius="12px" mt="5px" />
            <Text
              fontWeight="bold"
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.1px"
              color="primary.500"
              mt="15px"
            >
              {limitSelectLabel}
            </Text>
            <Select
              options={selectOptions}
              formControlBorderRadius="12px"
              mt="5px"
            />
            <Flex mt="20px" alignItems="center">
              <Text
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.1px"
                color="primary.500"
              >
                {autoTopupStatusLabel}
              </Text>
              <Flex ml="auto" alignItems="center">
                <Text
                  fontSize="12px"
                  lineHeight="17px"
                  letterSpacing="0.23px"
                  color="darkTurquoise"
                >
                  {activeLabel}
                </Text>
                <Switch
                  ml="5px"
                  name="active-auto-topup"
                  colorScheme="darkTurquoiseTemp"
                  isChecked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </Flex>
            </Flex>
            {/* add onclick action once backend is done in storybook */}
            <Button mt="25px" width="100%">
              {autoTopupButtonLabel}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AutoTopUp;
