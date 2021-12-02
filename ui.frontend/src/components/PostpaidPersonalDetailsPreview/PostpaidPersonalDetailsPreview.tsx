import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { PostpaidPersonalDetailsPreviewProps } from "./types";
import InfoBox from "../InfoBox/InfoBox";
import Button from "../Button/Button";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import TextWithMoreButton from "../TextWithMoreButton/TextWithMoreButton";
import { ReduxState } from "../../redux/types";
import { useSelector } from "react-redux";
import usePostPaidOrderSummary from "../../hooks/usePostPaidOrderSummary";

const DetailsRow: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) =>
  !value ? null : (
    <Box>
      <Heading fontSize="16px" fontWeight="bold" lineHeight="22px">
        {label}
      </Heading>
      <Text fontSize="14px" pt="8px">
        {value}
      </Text>
    </Box>
  );

const PostpaidPersonalDetailsPreview: React.FC<PostpaidPersonalDetailsPreviewProps> =
  ({ heading,
    fNameLabel,
    lNameLabel,
    emailLabel,
    dobLabel,
    address,
    portingSectionHeading,
    customerSupportText,
    productAndServiceDescription,
    privacyPolicyTextDescription,
    productAndServicePreviewText,
    ctaContinueLabel,
    orderTotalLabel,
    paymentMethodLabel,
  ...rest }) => {
    const user = useSelector((state: ReduxState) => state.user);
    const location = useLocation<{
      personalDetails: any;
      portIn: any;
    }>();

    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const orderSummary = usePostPaidOrderSummary(orderTotalLabel, {...rest});

    return (
      <Box>
        <Flex
          f
          bg="lightenPrimary.50"
          pb={{ base: "23px", lg: "60px" }}
          pt={{ base: "19px", lg: "89px" }}
          px="20px"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            w="100%"
            maxW={{ lg: "846px" }}
            flexDirection="column"
            gridGap={{ base: "10px", lg: "50px" }}
          >
            <PaymentDialog
              paymentMethodLabel={paymentMethodLabel}
              isOpen={isPaymentDialogOpen}
              onClose={() => setIsPaymentDialogOpen(false)}
            />

            <Formik
              initialValues={{
                isAdvertisingAccepted: false,
              }}
              onSubmit={() => { }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Heading
                    lineHeight="40px"
                    fontWeight="bold"
                    fontSize={20}
                    color="primary.500"
                    my="7px"
                    d={{ base: "block", lg: "none" }}
                  >
                    {heading}
                  </Heading>
                  <Flex
                    pt={{ lg: "55px" }}
                    pb="40px"
                    px={{ base: "16px", lg: "150px" }}
                    bg="white"
                    flexDirection="column"
                    borderRadius="8px"
                  >
                    <Heading
                      lineHeight="40px"
                      fontWeight="bold"
                      fontSize={20}
                      color="primary.500"
                      my="7px"
                      d={{ base: "none", lg: "block" }}
                    >
                      {heading}
                    </Heading>
                    <Flex
                      flexDirection="column"
                      gridGap={{ base: "20px", lg: "28px" }}
                      mt={{ base: "19px", lg: "42px" }}
                    >
                      <DetailsRow
                        label={fNameLabel || ""}
                        value={location?.state?.personalDetails?.firstName}
                      />
                      <DetailsRow
                        label={lNameLabel || ""}
                        value={location?.state?.personalDetails?.lastName}
                      />
                      <DetailsRow
                        label={emailLabel || ""}
                        value={
                          user.isAuthenticated
                            ? user?.email
                            : location?.state?.personalDetails?.emailId
                        }
                      />
                      <DetailsRow
                        label={dobLabel || ""}
                        value={location?.state?.portIn?.dob}
                      />
                      <DetailsRow
                        label={portingSectionHeading || ""}
                        value={
                          user?.isAuthenticated
                            ? user?.msisdn
                            : location?.state?.portIn?.msisdn
                        }
                      />
                      <DetailsRow
                        label={address || ""}
                        value={location?.state?.personalDetails?.addressLabel}
                      />
                    </Flex>
                    <Flex
                      flexDirection="column"
                      bg="white"
                      gridGap="13px"
                      borderRadius="8px"
                      mt="16px"
                      mb="20px"
                    >
                      <Box mt={{ base: "18px", lg: "48px" }}>
                        <InfoBox
                          textProps={{
                            fontSize: 12,
                            color: "grey.300",
                          }}
                          description={customerSupportText || ""}
                        />
                      </Box>

                      <FormikCheckbox name="isPartnersAccepted">
                        <TextWithMoreButton
                          fontSize={12}
                          ml="11px"
                          lineHeight="17.1px"
                          previewText={productAndServicePreviewText}
                        >
                          <span className={'rich-text-consent'} dangerouslySetInnerHTML={{ __html: productAndServiceDescription || "" }} />
                        </TextWithMoreButton>
                      </FormikCheckbox>
                      <Text
                        fontSize="12px"
                        lineHeight="17.1px"
                        letterSpacing="0.23px"
                        fontWeight="400"
                        pt="3px"
                      >
                        <span className={'rich-text-consent'} dangerouslySetInnerHTML={{ __html: privacyPolicyTextDescription || "" }} />
                      </Text>
                    </Flex>
                    <Button
                      w={{ base: "100%", lg: "316px" }}
                      alignSelf="center"
                      type="submit"
                      mt="32px"
                      onClick={() => setIsPaymentDialogOpen(true)}
                    >
                      {ctaContinueLabel}
                    </Button>
                    {orderSummary}
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Box>
    );
  };

export default PostpaidPersonalDetailsPreview;
