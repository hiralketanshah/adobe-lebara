import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Progress,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { BsCheck } from "react-icons/all";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Button from "../Button/Button";
import Warning from "../../assets/images/warning.png";
import { PlansProps } from "./types";
import CancelPlanChangeDialog from "../CancelPlanChangeDialog/CancelPlanChangeDialog";
import CANCEL_PLAN_CHANGE_REQUEST from "../../graphql/CANCEL_PLAN_CHANGE_REQUEST";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import { globalConfigs as GC, globalConstants as GCST } from "../../GlobalConfigs";
import getDynamicValues from "../../utils/get-aem-dynamic-values";
import GET_SIM_ONLY_OFFERS from "../../graphql/GET_SIM_ONLY_OFFERS";
import GET_PLAN_CHANGE_REQUEST from "../../graphql/GET_PLAN_CHANGE_REQUEST";

const Plans: React.FC<PlansProps> = ({
  buttonText,
  hideAutoRenew,
  hidePrice,
  showManageButton,
  requestPlanRemoved,
  renewalLabel,
  planChangeMessage,
  cancelLabel,
  manageLabel,
  manageLink,
  autoRenewLabel,
  autoRenewDesc,
  planLabels,
  ...props
}) => {
  const labelStyle = {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    color: "primary.800",
  };
  const progressStyle = {
    mt: "8px",
    px: "5px",
    py: "3px",
    height: "12px",
    bgColor: "grey.50",
    width: "100%",
    borderRadius: "12px",
  };
  const [getDashboardData, formattedPlans, msisdn] = useGetDashboardData(planLabels);
  const isPostPaid = !!(getDashboardData && getDashboardData.bills);
  const { data: simOnlyOffers } = useQuery(GET_SIM_ONLY_OFFERS, {
    variables: {
      country: GC.country,
    },
  });
  const [getPlanChangeRequest, { data: planChangeRequest }] = useLazyQuery(
    GET_PLAN_CHANGE_REQUEST,
    {
      fetchPolicy: "network-only",
      variables: {
        msisdn,
      },
    }
  );

  React.useEffect(() => {
    if (!msisdn || planChangeRequest) return;
    getPlanChangeRequest();
  }, [getPlanChangeRequest, msisdn, planChangeRequest]);
  const oldOffer = simOnlyOffers && simOnlyOffers.getSimOnlyOffers.find(
    (t: any) =>
      t.offerId ===
      planChangeRequest?.getPlanChangeRequest[0]?.oldOcsOfferingId?.toString()
  );
  const newOffer = simOnlyOffers && simOnlyOffers.getSimOnlyOffers.find(
    (t: any) =>
      t.offerId ===
      planChangeRequest?.getPlanChangeRequest[0]?.newOcsOfferingId?.toString()
  );

  const oldPlanName = oldOffer?.name;
  const newPlanName = newOffer?.name;
  const contractId = planChangeRequest?.getPlanChangeRequest[0]?.id;
  const newOfferData =
    newOffer?.allowances.find((e: any) => e.account.name === "DE_Postpaid_Data")
      .allowanceValue / 1024;
  const [cancelPlanChangeDialogOpen, setCancelPlanChangeDialogOpen] =
    useState(false);
  const history = useHistory();
  const [cancelPlanChangeRequest] = useMutation(CANCEL_PLAN_CHANGE_REQUEST);
  const getProgressValue = (leftQuantity: number, totalQuantity: number) =>
    totalQuantity === 0 ? 100 : (leftQuantity / totalQuantity) * 100;
  const getProgressBarColor = (leftQuantity: number, totalQuantity: number) => {
    const progressValue = getProgressValue(leftQuantity, totalQuantity);
    let progressBarColor;
    if (progressValue >= 0 && progressValue <= 20) {
      progressBarColor = "red";
    } else if (progressValue > 20 && progressValue <= 40) {
      progressBarColor = "yellow";
    } else if (progressValue > 40 && progressValue <= 60) {
      progressBarColor = "blue";
    } else if (progressValue > 60) {
      progressBarColor = "green";
    }
    return progressBarColor;
  };
  const handleOnChangePlanClick = (offerId?: string) => {
    const offer: any =
      simOnlyOffers &&
      simOnlyOffers.getSimOnlyOffers.find((t: any) => t.offerId === offerId);

    history.push(GC.journeyPages[GCST.POSTPAID] || '/', {
      msisdn,
      fromDashboard: true,
      oldPlanId: offerId,
      planDuration: offer.name.endsWith("(24M)") ? "24 Month" : "Monthly",
      data:
        offer.allowances.find((e: any) => e.account.name === "DE_Postpaid_Data")
          .allowanceValue / 1024,
      minutes: offer.allowances.find(
        (e: any) => e.account.name === "DE_Postpaid_Intl_Mins"
      ).allowanceValue,
    });
  };
  const handleRequestPlanRemoved = () => {
    getPlanChangeRequest();
  };
  if (isPostPaid) {
    return (
      <>
        <Flex flexDirection="column" alignItems="center">
          <Flex
            w={{ base: "100%", lg: "846px" }}
            flexDirection="column"
            px={{ base: "20px", lg: 0 }}
            gridGap={{ base: "17px", lg: "20px" }}
            pt={{ base: "17px", lg: "20px" }}
          >
            <Flex
              display={{ base: "none", md: "flex" }}
              overflowX="auto"
              gridGap={{ base: "17px", lg: "20px" }}
              flexDirection={{ base: "column", lg: "column" }}
            >
              <Box flex={1}>
                {formattedPlans && JSON.parse(formattedPlans).map((plan: any) => (
                  <>
                    {newOfferData && !Number.isNaN(newOfferData) ? (
                      <CancelPlanChangeDialog
                      {...props}
                        isOpen={cancelPlanChangeDialogOpen}
                        data={newOfferData}
                        onClose={() => setCancelPlanChangeDialogOpen(false)}
                        onConfirm={() =>
                          cancelPlanChangeRequest({
                            variables: {
                              requestId: contractId,
                            },
                          })
                            .then(() => {
                              setCancelPlanChangeDialogOpen(false);
                              if (requestPlanRemoved) {
                                handleRequestPlanRemoved();
                              }
                            })
                            .catch(() => { })
                        }
                      />
                    ) : (
                      <div />
                    )}
                    <Box bgColor="white" borderRadius="12px" p="15px">
                      <Flex
                        alignItems="center"
                        pb="15px"
                        borderBottom="0.5px solid"
                        borderColor="lightCyan"
                      >
                        <Flex direction="column">
                          <Flex alignItems="center">
                            <Text
                              fontSize="14px"
                              fontWeight="bold"
                              lineHeight="20px"
                              color="primary.500"
                            >
                              {plan.name}
                            </Text>
                            <Image src={Warning} height="11px" width="11px" ml="8px" />
                          </Flex>
                          <Text
                            fontSize="12px"
                            lineHeight="17px"
                            letterSpacing="0.23px"
                            color="grey.300"
                          >
                            {/* replace when storybook replaces with actual data */}
                            {renewalLabel} 4,July 2021
                          </Text>
                        </Flex>
                        {!hidePrice && (
                          <Text
                            fontWeight="500"
                            fontSize="20px"
                            lineHeight="22px"
                            letterSpacing="0.15px"
                            color="primary.800"
                            ml="auto"
                          >
                            {/* replace when storybook replaces with actual data */}
                            9,99{GC.currencySymbol}
                          </Text>
                        )}
                      </Flex>
                      {plan.plan.map(
                        ({
                          icon,
                          planTabName,
                          leftQuantity,
                          totalQuantity,
                          dataType,
                        }: any) => (
                          <Flex
                            py="15px"
                            borderBottom="0.5px solid"
                            borderColor="lightCyan"
                            alignItems="center"
                          >
                            <Image src={icon} alt="Data" height="24px" width="24px" />
                            <Box width="100%" ml="17px">
                              <Flex>
                                <Text {...labelStyle}>{planTabName}</Text>
                                <Text
                                  fontSize="14px"
                                  lineHeight="20px"
                                  fontWeight="bold"
                                  letterSpacing="0.1px"
                                  color="primary.800"
                                  ml="auto"
                                >
                                  {leftQuantity}
                                  {getDynamicValues(planLabels?.leftOfLabel, [dataType, totalQuantity])}
                                  {dataType}
                                </Text>
                              </Flex>
                              <Box {...progressStyle}>
                                <Progress
                                  value={getProgressValue(leftQuantity, totalQuantity)}
                                  size="xs"
                                  borderRadius="12px"
                                  colorScheme={getProgressBarColor(
                                    leftQuantity,
                                    totalQuantity
                                  )}
                                />
                              </Box>
                            </Box>
                          </Flex>
                        )
                      )}

                      <Box
                        mt="28px"
                        alignItems="center"
                        display={{
                          md: !hideAutoRenew && !showManageButton ? "flex" : "block",
                        }}
                        justifyContent="center"
                      >
                        {!showManageButton && (
                          <Box
                            pb={{ base: "20px", md: "0px" }}
                            borderBottom={
                              !hideAutoRenew ? { base: "0.5px solid", md: "none" } : {}
                            }
                            borderColor="lightCyan"
                          >
                            <Button
                              width={{ base: "100%", md: "302px" }}
                              onClick={() => {
                                if (isPostPaid) {
                                  handleOnChangePlanClick(plan.offerId);
                                }
                              }}
                            >
                              {buttonText}
                            </Button>
                          </Box>
                        )}
                        {contractId && (
                          <Flex
                            gridGap="12px"
                            boxShadow="0px 1px 4px rgba(0, 0, 0, 0.21)"
                            borderRadius="12px"
                            p="16px"
                            borderColor="#00C800"
                            borderWidth="1px"
                            alignItems="center"
                          >
                            <BsCheck size="24px" color="#00C800" />
                            <Text color="primary.800" fontSize="12px" letterSpacing="0.23px">
                              {/* eslint-disable-next-line react/no-unescaped-entities */}
                              {getDynamicValues(planChangeMessage, [oldPlanName, newPlanName])}
                              <Link
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCancelPlanChangeDialogOpen(true);
                                }}
                              >
                                {cancelLabel}
                              </Link>
                            </Text>
                          </Flex>
                        )}

                        {showManageButton && !contractId && (
                          <Box>
                            <Text
                              onClick={() =>
                                history.push((manageLink || "/"), {
                                  msisdn,
                                })
                              }
                              color="secondary.500"
                              fontWeight="bold"
                              fontSize="16px"
                              lineHeight="25px"
                              letterSpacing="0.01em"
                              mt="20px"
                              textTransform="uppercase"
                              cursor="pointer"
                            >
                              {manageLabel}
                            </Text>
                          </Box>
                        )}
                        {!hideAutoRenew && !showManageButton && (
                          <Flex mt={{ base: "15px", md: "0px" }} ml={{ md: "auto" }}>
                            <Box>
                              <Text
                                fontSize="14px"
                                lineHeight="20px"
                                letterSpacing="0.1px"
                                color="primary.500"
                              >
                                {autoRenewLabel}
                              </Text>
                              <Text
                                fontSize="12px"
                                lineHeight="14px"
                                letterSpacing="0.25px"
                                fontWeight="500"
                                colorScheme="primary"
                              >
                                {autoRenewDesc}
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="primary"
                              size="lg"
                              ml={{ base: "auto", md: "25px" }}
                            />
                          </Flex>
                        )}
                      </Box>
                    </Box>
                  </>
                ))}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
  return <></>;
};

export default Plans;
