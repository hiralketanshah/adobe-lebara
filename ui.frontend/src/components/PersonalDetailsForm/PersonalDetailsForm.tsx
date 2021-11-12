import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import AddressCard from "../AddressCard/AddressCard";
import { PersonalDetailsFormProps } from "./types";
import Button from "../Button/Button";
import {
  EMAIL_FIELD_PATTERN,
  HOUSE_NUMBER_REGEX,
  NAME_FIELD_PATTERN,
  STREET_REGEX,
  ZIP_CODE_REGEX,
} from "../../utils/lebara.constants";
import { globalConfigs as GC, globalConstants as C } from "../../GlobalConfigs";
import FormikInput from "../Formik/FormikInput/FormikInput";
import { ReduxState } from "../../redux/types";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import VALIDATE_EMAIL_SPS from "../../graphql/VALIDATE_EMAIL_SPS";
import { setLoading } from "../../redux/actions/loadingActions";

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  heading,
  firstNameLabel,
  firstNamePlaceholder,
  firstNameErrorMax,
  firstNameErrorRequired,
  firstNameErrorPattern,
  orderDetailsCta,
  lastNameLabel,
  lastNamePlaceholder,
  lastNameErrorMax,
  lastNameErrorRequired,
  lastNameErrorPattern,
  emailAddressLabel,
  emailAddressPlaceholder,
  emailErrorMax,
  emailErrorRequired,
  emailErrorPattern,
  addressLabel,
  addressKeyInText,
  addressErrorRequired,
  streetLabel,
  streetPlaceholder,
  streetLabelErrorMax,
  streetLabelErrorRequired,
  streetLabelErrorPattern,
  houseNumberLabel,
  houseNumberPlaceholder,
  houseNumberErrorMax,
  houseNumberErrorRequired,
  houseNumberErrorPattern,
  zipCodeLabel,
  zipCodePlaceholder,
  zipCodeErrorMax,
  zipCodeErrorRequired,
  zipCodeErrorPattern,
  zipCodeErrorMin,
  cityLabel,
  postalcodePlaceholder,
  cityPlaceholder,
  cityErrorMax,
  cityErrorRequired,
  cities,
  enterAddressManually,
  keyInAddress,
  saveAddress,
  emailAddressAlreadyExistMsg,
}) => {
  const [firstNamePattern] = useState(NAME_FIELD_PATTERN);
  const [lastNamePattern] = useState(NAME_FIELD_PATTERN);
  const [emailIdPattern] = useState(EMAIL_FIELD_PATTERN);
  const history = useHistory();
  const [isManualAddress, setIsManualAddress] = useState(false);
  const location = useLocation<{
    bundlePlan: string;
    planDuration: string;
    toPortIn?: boolean;
  }>();
  const toPortIn = location?.state?.toPortIn;
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isFreeTopUpAndFreeSim = cartItems.every(
    (t) => t.isFreeSimTopup || t.isFreeSim
  );
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [validateEmailSps, { data: validateEmailSpsResult }] =
    useLazyQuery(VALIDATE_EMAIL_SPS);
  const dispatch = useDispatch();
  
  const validationSchema = (manualAddress: boolean) => {
      let scheme: any = {
        firstName: yup
          .string()
          .max(50, firstNameErrorMax)
          .required(firstNameErrorRequired)
          .matches(firstNamePattern, firstNameErrorPattern),
        lastName: yup
          .string()
          .max(75, lastNameErrorMax)
          .required(lastNameErrorRequired)
          .matches(lastNamePattern, lastNameErrorPattern),
        email: yup
          .string()
          .max(100, emailErrorMax)
          .required(emailErrorRequired)
          .matches(emailIdPattern, emailErrorPattern),
      };
      scheme = manualAddress
        ? {
            ...scheme,
            streetName: yup
              .string()
              .max(250, streetLabelErrorMax)
              .required(streetLabelErrorRequired)
              .matches(STREET_REGEX, streetLabelErrorPattern),
            houseNumber: yup
              .string()
              .max(20, houseNumberErrorMax)
              .required(houseNumberErrorRequired)
              .matches(HOUSE_NUMBER_REGEX, houseNumberErrorPattern),
            townCity: yup
              .string()
              .max(20, cityErrorMax)
              .required(cityErrorRequired),
            zipCode: yup
              .string()
              .max(10, zipCodeErrorMax)
              .min(5, zipCodeErrorMin)
              .required(zipCodeErrorRequired)
              .matches(ZIP_CODE_REGEX, zipCodeErrorPattern),
          }
        : {
            ...scheme,
            address: yup.object({
              label: yup.string().required(addressErrorRequired),
            }),
          };
      return yup.object(scheme);
    };
  return (
    <>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
      />
      <Formik
        validationSchema={validationSchema(isManualAddress)}
        initialValues={{
          addressCheckBox: false,
        }}
        onSubmit={(values: any) => {
          if (isManualAddress) {
            if (isFreeTopUpAndFreeSim) {
              setIsPaymentDialogOpen(true);
              return Promise.resolve();
            }

          history.push(toPortIn ? (GC.journeyPages[C.SIM_PORT_IN]  || '/') : (GC.journeyPages[C.ORDER_DETAILS]  || '/'), {
              ...(location.state || {}),
              personalDetails: values,
            });
            return Promise.resolve();
          }
          dispatch(setLoading(true));
          return axios
            .get(
              `${GC.apiHostUri}/google/getAddress?placeId=${values.address.value.place_id}`,
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              if (isFreeTopUpAndFreeSim) {
                setIsPaymentDialogOpen(true);
                return;
              }
            history.push(toPortIn ? (GC.journeyPages[C.SIM_PORT_IN]  || '/') : (GC.journeyPages[C.ORDER_DETAILS]  || '/'), {
                ...(location.state || {}),
                personalDetails: {
                  ...values,
                  streetName: res.data.address1,
                  houseNumber: res.data.address2,
                  townCity: res.data.city,
                  addition: res.data.state,
                  zipCode: res.data.postcode,
                },
              });
            })
            .finally(() => {
              dispatch(setLoading(false));
            });
        }}
        style={{border: '1px solid red'}}
      >
        {({ handleSubmit, errors, dirty, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Flex
              px={{ base: "16px", lg: "168px" }}
              pt={{ base: "20px", lg: 0 }}
              pb={{ base: "20px", lg: "135px" }}
              bg="white"
              borderRadius="8px"
              gridGap="20px"
              flexDirection="column"
            >
              {heading && (<Text
                d={{ base: "none", lg: "block" }}
                color="primary.500"
                fontSize={20}
                pt="60px"
                pb="42px"
                letterSpacing="-0.01em"
                fontWeight="bold"
                textTransform="capitalize"
                textAlign={{ lg: "center" }}
              >
                {heading}
              </Text>
              )}
              <FormikInput
                name="firstName"
                label={firstNameLabel}
                placeholder={firstNamePlaceholder}
                isRequired
              />
              <FormikInput
                name="lastName"
                label={lastNameLabel}
                placeholder={lastNamePlaceholder}
                isRequired
              />
              <FormikInput
                name="email"
                label={emailAddressLabel}
                placeholder={emailAddressPlaceholder}
                validate={async (email) => {
                  await validateEmailSps({
                    variables: {
                      email,
                    },
                  });
                  if (
                    validateEmailSpsResult?.validateEmailSPS?.startsWith(
                      "Customer already exists"
                    )
                  ) {
                    return emailAddressAlreadyExistMsg;
                  }
                  return undefined;
                }}
                isRequired
              />
              <AddressCard
                onSetManual={() => {
                  setIsManualAddress(true);
                  setFieldValue("address", undefined);
                }}
                setValue={(value) =>
                  setFieldValue("address", value)
                }
                addressLabel={addressLabel}
                initialStatus="SearchNewAddress"
                searchAddressSubText={addressKeyInText}
                streetLabel={streetLabel}
                streetPlaceholder={streetPlaceholder}
                houseNumberLabel={houseNumberLabel}
                houseNumberPlaceholder={houseNumberPlaceholder}
                zipCodeLabel={zipCodeLabel}
                zipCodePlaceholder={zipCodePlaceholder}
                cityLabel={cityLabel}
                postalcodePlaceholder={postalcodePlaceholder}
                cityPlaceholder={cityPlaceholder}
                cities={cities}
                enterAddressManually={enterAddressManually}
                saveAddress={saveAddress}
                keyInAddress={keyInAddress}
                postalCodeText={addressKeyInText}
                country={GC.country}
              />
              <Button
                isFullWidth
                mt="14px"
                mx="auto"
                d={{ lg: "block" }}
                type="submit"
                maxW={{ lg: "403px" }}
                isDisabled={Object.keys(errors).length > 0 || !dirty}
              >
                {isManualAddress && !isFreeTopUpAndFreeSim && !toPortIn
                  ? "Continue to order details"
                  : orderDetailsCta}
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PersonalDetailsForm;