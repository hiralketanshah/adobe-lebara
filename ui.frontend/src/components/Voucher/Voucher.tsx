import React, { useState, ChangeEvent } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FiPlus, IoClose } from "react-icons/all";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { Icon } from "../Icon/Icon";
import { VoucherProps } from "./types";
import SplitInputWithButton from "../SplitInputWithButton/SplitInputWithButton";
import { selectVoucher } from "../../redux/actions/selectVoucherActions";
import VALIDATE_VOUCHER from "../../graphql/VALIDATE_VOUCHER";

const Voucher: React.FC<VoucherProps> = ({	addVoucherCodeLabel,
	applyVoucherLabel,
	enterVoucherCodeLabel,
	voucherCodeInvalidMessage,
	voucherCodeExpiredMessage}) => {
  const dispatch = useDispatch();
  const [voucher, setVoucher] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const client = useApolloClient();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setVoucher(event.target.value);
  const handleClick = () => {
    if (voucher && showInput) {
      setErrorMessage("");
      client
        .query({ query: VALIDATE_VOUCHER, variables: { code: voucher } })
        .then((res) => {
          if (res.data.validateVoucher.status === "Invalid") {
            setErrorMessage(voucherCodeInvalidMessage || '');
            dispatch(selectVoucher(""));
          } else if (res.data.validateVoucher.status === "Expired") {
            setErrorMessage(voucherCodeExpiredMessage || '');
            dispatch(selectVoucher(""));
          } else {
            // res.data.validateVoucher.discountValue
            setShowInput(false);
            dispatch(selectVoucher(voucher));
          }
        });
    } else if (voucher) {
      setVoucher("");
      dispatch(selectVoucher(""));
    } else {
      setShowInput(true);
    }
  };

  const isDisabled = !voucher;
  const icon = voucher ? IoClose : FiPlus;

  const inputWrapperStyles = {
    opacity: showInput ? 1 : 0,
    visibility: showInput ? "visible" : "hidden",
    transform: showInput ? "scale(1)" : "scale(0.8)",
    transition: "all 0.1s ease-in",
    transformOrigin: "center",
    position: "absolute",
    top: 0,
    width: "100%",
  };

  return (
    <Box position="relative" lineHeight={1.2}>
      <Flex
        as="button"
        w="100%"
        p="12px 15px"
        minHeight="25px"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
        onClick={handleClick}
        opacity={showInput ? "0" : "1"}
        textAlign="left"
        bg="white"
        border="1px"
        borderRadius="8px"
        borderColor="greySuccess"
      >
        <Flex flexDir="row" gridGap="18px">
          <Text fontSize={16} fontWeight="bold">
            {voucher ? "" : addVoucherCodeLabel}
          </Text>

          {voucher && (
            <Text
              textTransform="uppercase"
              fontSize={14}
              color="lebaraGreen"
              mt="3px"
              fontWeight="semibold"
            >
              {voucher}
            </Text>
          )}
        </Flex>
        <Icon
          icon={icon}
          h="20px"
          w="20px"
          alignItems="center"
          color="secondary.500"
        />
      </Flex>
      {errorMessage && (
        <Text color="lebaraRed" size="14px">
          {errorMessage}
        </Text>
      )}

      <Flex sx={inputWrapperStyles}>
        <SplitInputWithButton
          placeholder={enterVoucherCodeLabel }
          value={voucher}
          textTransform="uppercase"
          background="white"
          lineHeight={1.2}
          fontSize={14}
          fontWeight="500"
          isDisabled={isDisabled}
          onChange={handleInputChange}
          onClick={handleClick}
          buttonLabel={applyVoucherLabel}
          buttonProps={{
            borderLeftRadius: 0,
            children: "Apply",
            color: "white",
            colorScheme: "blue",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        />
      </Flex>
    </Box>
  );
};

export default Voucher;
