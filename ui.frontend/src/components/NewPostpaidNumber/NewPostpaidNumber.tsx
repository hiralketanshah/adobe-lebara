import React, { useState } from "react";
import { Formik } from "formik";
import { Box, Text, Flex, RadioGroup } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import RadioButton from "../RadioButton/RadioButton";
import Button from "../Button/Button";
import { NewPostPaidNumberProps } from "./types";
import { selectProduct } from "../../redux/actions/selectProductActions";
import { loadInitialCart } from "../../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../../utils/mapMagentoProductToCartItem";
import ADD_TO_CART from "../../graphql/ADD_TO_CART";
import GET_SIM_ONLY_OFFERS from "../../graphql/GET_SIM_ONLY_OFFERS";
import DurationModal from "./DurationModal";
import DataModal from "./DataModal";
import MinutesModal from "./MinutesModal";
import PlanChangeDialog from "../PlanChangeDialog/PlanChangeDialog";
import { globalConfigs, globalConstants } from "../../GlobalConfigs";
import CHANGE_PLAN from "../../graphql/CHANGE_PLAN";
import getDynamicValues from "../../utils/get-aem-dynamic-values";

const NewPostpaidNumber: React.FC<NewPostPaidNumberProps> = ({
  durationLabel,
  moreDetailsLabel,
  dataVolumeLabel,
  abroadMinutesLabel,
  yourOrderLabel,
  productInformationLabel,
  productInformationLink,
  yourOrderContractdurationLabel,
  yourOrderDataLabel,
  yourOrderInternationalMinLabel,
  yourOrderMinutesInGermany,
  yourOrderPerMonthOrderTotalLabel,
  yourOrderOneTimeActivationFeeLabel,
  yourOrderOneTimeActivationFee,
  orderNowLabel,
  durationRadioLabelList,
  dataVolumeRadioLabel,
  abroadMinutesRadioLabel,
  yourOrdersimPlanLabel,
  yourOrderMinutesInGermanyValue,
  contractPeriodPopupHeading,
  contractPeriodPopupInfo,
  popupCloseLabel,
  switchCtaLabel,
  dataVolumePopupHeading,
  dataVolumePopupInfo,
  abroadMinutesPopupHeading,
  abroadMinutesPopupInfoTop,
  abroadMinutesPopupInfoBottom,
  countryFlagFrom,
  countryFlagTo
}) => {
  const history = useHistory();
  const [isDurationModalOpen, setDurationModalOpen] = useState(false);
  const [isDataModalOpen, setDataModalOpen] = useState(false);
  const [isMinutesModalOpen, setMinutesModalOpen] = useState(false);
  const location = useLocation<{
    msisdn?: string;
    oldPlanId?: string;
    data: number;
    planDuration: string;
    minutes: number;
    fromDashboard: boolean;
  }>();
  const dispatch = useDispatch();
  const [changePlan] = useMutation(CHANGE_PLAN);
  const [addToCartApi] = useMutation(ADD_TO_CART);
  const isFromDashboard = location?.state?.fromDashboard ?? false;
  const initialValues = {
    data:
      location.state && location?.state.data ? Number(location.state.data) : 4,
    minutes:
      location.state && location?.state.minutes
        ? Number(location.state.minutes)
        : 50,
    planDuration:
      location.state && location?.state.planDuration
        ? location.state.planDuration
        : "Month",
  };
  const { data: simOnlyOffers } = useQuery(GET_SIM_ONLY_OFFERS, {
    variables: {
      country: globalConfigs.country,
    },
  });
  const dataOptions = [
    ...new Set<number>(
      simOnlyOffers?.getSimOnlyOffers.map(
        (t: any) =>
          t.allowances.find((e: any) => e.account.name === "DE_Postpaid_Data")
            .allowanceValue / 1024
      )
    ),
  ];
  const minuteOptions = [
    ...new Set<number>(
      simOnlyOffers?.getSimOnlyOffers.map(
        (t: any) =>
          t.allowances.find(
            (e: any) => e.account.name === "DE_Postpaid_Intl_Mins"
          ).allowanceValue
      )
    ),
  ];
  const headingStyles = {
    fontSize: "20px",
    letterSpacing: "-0.01em",
    fontWeight: "bold",
    color: "primary.500",
    lineHeight: "40px",
  };
  const moreDetailsStyles = {
    fontSize: "14px",
    letterSpacing: "0.1px",
    fontWeight: "bold",
    color: "secondary.500",
    lineHeight: "20px",
    cursor: "pointer",
  };
  const boxStyle = {
    backgroundColor: "white",
    py: "10px",
    paddingLeft: "17px",
    width: "100%",
    marginTop: "22px",
    borderRadius: "8px",
    cursor: "pointer",
  };
  const radioButtonLabel = {
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "0.5px",
    marginLeft: "10px",
  };
  const totalTextStyle = {
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "0.5px",
    color: "black",
  };
  const previousPlan = !isFromDashboard
    ? undefined
    : simOnlyOffers?.getSimOnlyOffers.find(
      (t: any) =>
        (location.state.planDuration === "Month" ||
          t.name.endsWith(" (24M)")) &&
        t.allowances.find((e: any) => e.account.name === "DE_Postpaid_Data")
          .allowanceValue /
        1024 ===
        location.state.data &&
        t.allowances.find(
          (e: any) => e.account.name === "DE_Postpaid_Intl_Mins"
        ).allowanceValue === location.state.minutes
    );
  const [isPlanChangeDialogOpen, setIsPlanChangeDialogOpen] = useState(false);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (isFromDashboard) {
            setIsPlanChangeDialogOpen(true);
            return;
          }
          const plan = simOnlyOffers?.getSimOnlyOffers.find(
            (t: any) =>
              (values.planDuration === "Month" || t.name.endsWith(" (24M)")) &&
              t.allowances.find(
                (e: any) => e.account.name === "DE_Postpaid_Data"
              ).allowanceValue /
              1024 ===
              values.data &&
              t.allowances.find(
                (e: any) => e.account.name === "DE_Postpaid_Intl_Mins"
              ).allowanceValue === values.minutes
          );
          if (!plan) return;
          dispatch(
            selectProduct({
              id: plan.offerId,
              product: `${plan.name} Plan ${plan.cost / 100}`,
              isPostPaid: true,
            })
          );
          addToCartApi({
            variables: {
              productInput: {
                product: {
                  sku: plan.offerId,
                  name: `${plan.name}|${values.planDuration}| ${values.data}GB - ${values.minutes} mins|true`,
                  price: plan.cost / 100,
                },
              },
            },
          }).then((res) => {
            dispatch(
              loadInitialCart(
                mapMagentoProductToCartItem(res.data.addProduct.items)
              )
            );
            history.push((globalConfigs.journeyPages[globalConstants.POSTPAID_DETAILS] || '/'), values);
          });
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => {
          const selectedPlan = simOnlyOffers?.getSimOnlyOffers.find(
            (t: any) =>
              (values.planDuration === "Month" || t.name.endsWith(" (24M)")) &&
              t.allowances.find(
                (e: any) => e.account.name === "DE_Postpaid_Data"
              ).allowanceValue /
              1024 ===
              values.data &&
              t.allowances.find(
                (e: any) => e.account.name === "DE_Postpaid_Intl_Mins"
              ).allowanceValue === values.minutes
          );
          return (
            <form onSubmit={handleSubmit}>
              <PlanChangeDialog
                isOpen={isPlanChangeDialogOpen}
                onClose={() => setIsPlanChangeDialogOpen(false)}
                fromData={location?.state?.data}
                toData={values.data}
                onConfirm={() => {
                  changePlan({
                    variables: {
                      msisdn: location?.state?.msisdn,
                      existingPlan: Number(location?.state?.oldPlanId),
                      newPlan: Number(selectedPlan?.offerId),
                    },
                  })
                    .then(() => {
                      history.push((globalConfigs.journeyPages[globalConstants.ORDER_SUBMITTED] || '/'), {
                        msisdn: location?.state?.msisdn,
                        previousPlanName: previousPlan?.name,
                        currentPlan: selectedPlan?.name,
                      });
                    })
                    .catch(() => { })
                }}
              />
              <Box
                backgroundColor={{ base: "lightenPrimary.50", md: "white" }}
                pl={{ base: "17px", md: "150px" }}
                pt={{ base: "28px", md: "48px" }}
                pb={{ base: "28px", md: "48px" }}
                pr={{ base: "23px", md: "150px" }}
                width={{ base: "100%", md: "1000px" }}
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  mt={{ md: "16px" }}
                  alignItems={{ md: "center" }}
                >
                  <Text {...headingStyles}>
                    {durationLabel}
                  </Text>
                  <Text
                    {...moreDetailsStyles}
                    ml={{ md: "auto" }}
                    onClick={() => setDurationModalOpen(true)}
                  >
                    {moreDetailsLabel}
                  </Text>
                </Flex>
                <RadioGroup
                  onChange={(value) => setFieldValue("planDuration", value)}
                  name="planDuration"
                  value={values.planDuration}
                >
                  <Flex flexDirection={{ base: "column", md: "row" }}>
                    <Box
                      {...boxStyle}
                      border={
                        values.planDuration === "Month"
                          ? "2px solid"
                          : "0.5px solid"
                      }
                      borderColor={
                        values.planDuration === "Month"
                          ? "lightenPrimary.500"
                          : "grey.100"
                      }
                    >
                      <RadioButton
                        value="Month"
                        size="lg"
                        isDisabled={
                          isFromDashboard &&
                          location.state.planDuration === "24 Month"
                        }
                      >
                        <Text {...radioButtonLabel}>{durationRadioLabelList && durationRadioLabelList[0].label1}</Text>
                        <Text
                          fontSize="12px"
                          lineHeight="17px"
                          letterSpacing="0.5px"
                          marginLeft="10px"
                        >
                          {durationRadioLabelList && durationRadioLabelList[0].label2}
                        </Text>
                      </RadioButton>
                    </Box>
                    <Box
                      ml={{ md: "15px" }}
                      {...boxStyle}
                      border={
                        values.planDuration === "24 Month"
                          ? "2px solid"
                          : "0.5px solid"
                      }
                      borderColor={
                        values.planDuration === "24 Month"
                          ? "lightenPrimary.500"
                          : "grey.100"
                      }
                    >
                      <RadioButton value="24 Month" size="lg">
                        <Text {...radioButtonLabel}>{durationRadioLabelList && durationRadioLabelList[1]?.label1}</Text>
                        <Text
                          fontSize="12px"
                          lineHeight="17px"
                          letterSpacing="0.5px"
                          marginLeft="10px"
                        >
                          {durationRadioLabelList && durationRadioLabelList[1]?.label2}
                        </Text>
                      </RadioButton>
                    </Box>
                  </Flex>
                </RadioGroup>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  mt={{ md: "16px" }}
                  alignItems={{ md: "center" }}
                >
                  <Text {...headingStyles} marginTop="10px">
                    {dataVolumeLabel}
                  </Text>
                  <Text
                    {...moreDetailsStyles}
                    ml={{ md: "auto" }}
                    onClick={() => setDataModalOpen(true)}
                  >
                    {moreDetailsLabel}
                  </Text>
                </Flex>
                <RadioGroup
                  onChange={(value) => setFieldValue("data", Number(value))}
                  name="data"
                  value={values.data}
                >
                  <Flex direction="column">
                    {dataOptions.map((data: number) => (
                      <Box
                        key={`plan-key-${data}`}
                        {...boxStyle}
                        border={
                          values.data === data ? "2px solid" : "0.5px solid"
                        }
                        borderColor={
                          values.data === data
                            ? "lightenPrimary.500"
                            : "grey.100"
                        }
                      >
                        <RadioButton
                          value={data}
                          size="lg"
                          isDisabled={
                            isFromDashboard && data < location.state?.data
                          }
                        >
                          <Text {...radioButtonLabel} fontWeight="bold">
                            {data} GB
                          </Text>
                          <Text {...radioButtonLabel}>
                            {dataVolumeRadioLabel}
                          </Text>
                        </RadioButton>
                      </Box>
                    ))}
                  </Flex>
                </RadioGroup>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  mt={{ md: "16px" }}
                  alignItems={{ md: "center" }}
                >
                  <Text {...headingStyles} marginTop="10px">
                    {abroadMinutesLabel}
                  </Text>
                  <Text
                    {...moreDetailsStyles}
                    ml={{ md: "auto" }}
                    onClick={() => setMinutesModalOpen(true)}
                  >
                    {moreDetailsLabel}
                  </Text>
                </Flex>
                <RadioGroup
                  onChange={(value) => setFieldValue("minutes", Number(value))}
                  name="minutes"
                  value={values.minutes}
                >
                  <Flex justifyContent="space-between" flexWrap="wrap">
                    {minuteOptions?.map((minutes: number) => (
                      <Box
                        key={`minutes-key-${minutes}`}
                        {...boxStyle}
                        padding="22px"
                        border={
                          values.minutes === minutes
                            ? "2px solid"
                            : "0.5px solid"
                        }
                        borderColor={
                          values.minutes === minutes
                            ? "lightenPrimary.500"
                            : "grey.100"
                        }
                      >
                        <RadioButton
                          value={minutes}
                          size="lg"
                          isDisabled={
                            isFromDashboard && minutes < location.state.minutes
                          }
                        >
                          <Text {...radioButtonLabel}>
                            {minutes} {abroadMinutesRadioLabel}
                          </Text>
                        </RadioButton>
                      </Box>
                    ))}
                  </Flex>
                </RadioGroup>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  mt={{ md: "16px" }}
                  alignItems={{ md: "center" }}
                >
                  <Text {...headingStyles} marginTop="10px">
                    {yourOrderLabel}
                  </Text>
                  <Text
                    onClick={() =>
                      window.open(getDynamicValues(productInformationLink, [selectedPlan.offerId]))
                    }
                    {...moreDetailsStyles}
                    mt={{ md: "16px" }}
                    ml={{ md: "auto" }}
                  >
                    {productInformationLabel}
                  </Text>
                </Flex>
                <Box
                  backgroundColor="white"
                  width="100%"
                  py="17px"
                  marginTop="22px"
                  borderRadius="8px"
                  border={{ base: "none", md: "0.5px solid" }}
                  borderColor={{ md: "grey.200" }}
                >
                  {selectedPlan && selectedPlan.name && (
                    <Flex
                      mt="9px"
                      ml="17px"
                      mr="15px"
                      pb="9px"
                      borderBottom="0.25px solid"
                      borderColor="grey.100"
                    >
                      <Text {...totalTextStyle}>{yourOrdersimPlanLabel}</Text>
                      <Text {...totalTextStyle} marginLeft="auto">
                        {selectedPlan.name}
                      </Text>
                    </Flex>
                  )}
                  {selectedPlan && values.planDuration && (
                    <Flex
                      mt="9px"
                      ml="17px"
                      mr="15px"
                      pb="9px"
                      borderBottom="0.25px solid"
                      borderColor="grey.100"
                    >
                      <Text {...totalTextStyle}>{yourOrderContractdurationLabel}</Text>
                      <Text {...totalTextStyle} marginLeft="auto">
                        {values.planDuration}
                      </Text>
                    </Flex>
                  )}
                  {selectedPlan && values.data && (
                    <Flex
                      mt="9px"
                      ml="17px"
                      mr="15px"
                      pb="9px"
                      borderBottom="0.25px solid"
                      borderColor="grey.100"
                    >
                      <Text {...totalTextStyle}>{yourOrderDataLabel}</Text>
                      <Text {...totalTextStyle} marginLeft="auto">
                        {`${values.data} GB`}
                      </Text>
                    </Flex>
                  )}
                  {selectedPlan && values.minutes && (
                    <Flex
                      mt="9px"
                      ml="17px"
                      mr="15px"
                      pb="9px"
                      borderBottom="0.25px solid"
                      borderColor="grey.100"
                    >
                      <Text {...totalTextStyle}>{yourOrderInternationalMinLabel}</Text>
                      <Text {...totalTextStyle} marginLeft="auto">
                        {values.minutes}
                      </Text>
                    </Flex>
                  )}
                  <Flex
                    mt="9px"
                    pb="9px"
                    borderBottom={{ base: "0.5px solid", md: "1.5px solid" }}
                    borderColor={{ base: "grey.100", md: "grey.200" }}
                  >
                    <Text {...totalTextStyle} ml="17px">
                      {yourOrderMinutesInGermany}
                    </Text>
                    <Text {...totalTextStyle} mr="15px" marginLeft="auto">
                      {yourOrderMinutesInGermanyValue}
                    </Text>
                  </Flex>
                  <Flex mt="9px" pl="17px" pr="15px">
                    <Text {...totalTextStyle}>{yourOrderPerMonthOrderTotalLabel}</Text>
                    <Text {...totalTextStyle} marginLeft="auto">
                      {globalConfigs.currencySymbol}
                      {selectedPlan &&
                        values.planDuration &&
                        selectedPlan.cost / 100
                        ? selectedPlan.cost / 100
                        : 0}
                    </Text>
                  </Flex>
                  <Flex mt="11px" pl="17px" pr="15px" pb="9px">
                    <Text
                      fontSize="12px"
                      lineHeight="17px"
                      letterSpacing="0.23px"
                      fontFamily="Roboto"
                      color="black"
                    >
                      {yourOrderOneTimeActivationFeeLabel}
                    </Text>
                    <Text {...totalTextStyle} marginLeft="auto">
                      {yourOrderOneTimeActivationFee}
                    </Text>
                  </Flex>
                </Box>
                <Flex justifyContent="center">
                  <Button
                    disabled={
                      !values.data || !values.minutes || !values.planDuration
                    }
                    mt={{ base: "20px", md: "60px" }}
                    width={{ base: "100%", md: "320px" }}
                    mb={{ base: "21px" }}
                    type="submit"
                  >
                    {isFromDashboard ? switchCtaLabel : orderNowLabel}
                  </Button>
                </Flex>
              </Box>
              <Box
                backgroundColor="white"
                px="21px"
                py="16px"
                boxShadow="0px 1px 4px rgba(0, 0, 0, 0.21)"
                borderRadius="6px 6px 0px 0px"
                display={{ md: "none" }}
              >
                <Flex>
                  <Flex flexDirection="column">
                    <Text
                      fontWeight="500"
                      fontSize="20px"
                      lineHeight="22px"
                      letterSpacing="0.15px"
                    >
                      {globalConfigs.currencySymbol}
                      {selectedPlan &&
                        values.planDuration &&
                        selectedPlan.cost / 100
                        ? selectedPlan.cost / 100
                        : 0}{" "}
                      / {values.planDuration}{" "}
                    </Text>
                    <Text
                      fontWeight="500"
                      fontSize="12px"
                      lineHeight="14px"
                      letterSpacing="0.25px"
                      color="grey.200"
                    >
                      {yourOrderOneTimeActivationFeeLabel} {yourOrderOneTimeActivationFee}
                    </Text>
                  </Flex>
                  <Button
                    ml="auto"
                    disabled={
                      !values.data || !values.minutes || !values.planDuration
                    }
                    type="submit"
                  >
                    {isFromDashboard ? switchCtaLabel : orderNowLabel}
                  </Button>
                </Flex>
              </Box>
            </form>
          );
        }}
      </Formik>
      <DurationModal
        open={isDurationModalOpen}
        onClose={setDurationModalOpen}
        heading={contractPeriodPopupHeading}
        info={contractPeriodPopupInfo}
        closeLabel={popupCloseLabel}
      />
      <DataModal open={isDataModalOpen} onClose={setDataModalOpen}
        heading={dataVolumePopupHeading}
        info={dataVolumePopupInfo}
        closeLabel={popupCloseLabel} />
      <MinutesModal open={isMinutesModalOpen} onClose={setMinutesModalOpen}
        heading={abroadMinutesPopupHeading}
        info={abroadMinutesPopupInfoTop}
        additionalInfo={abroadMinutesPopupInfoBottom}
        closeLabel={popupCloseLabel}
        countryFlagFrom={countryFlagFrom}
        countryFlagTo={countryFlagTo} />
    </>
  );
};
export default NewPostpaidNumber;
