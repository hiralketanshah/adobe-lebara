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
  HOUSE_NUMBER_REGEX,
  STREET_REGEX,
  ZIP_CODE_REGEX,
} from "../../utils/lebara.constants";
import {
  emailRegex,
  nameRegex,
} from "../Formik/validations/regeularExpressions";
import { globalConfigs as GC, globalConstants as C } from "../../GlobalConfigs";
import FormikInput from "../Formik/FormikInput/FormikInput";
import { ReduxState } from "../../redux/types";
import PaymentDialog from "../PaymentDialog/PaymentDialog";
import VALIDATE_EMAIL_SPS from "../../graphql/VALIDATE_EMAIL_SPS";
import { setLoading } from "../../redux/actions/loadingActions";
import useCartHelpers from "../../hooks/useCartHelpers";
import useSubmitOrder from "../../hooks/useSubmitOrder";
import { loadInitialCart } from "../../redux/actions/cartActions";
import { saveFormDetails, resetForms } from "../../redux/actions/formsActions";
import { selectFormValues } from "../../redux/selectors/formsSelectors";
import FormikPassword from "../Formik/FormikPassword/FormikPassword";

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
  paymentCta,
  enterPasswordLabel,
  confirmPasswordLabel,
  minimumCharactersLabel,
  samePasswordLabel,
  passwordField,
  confirmPasswordField,
  showPasswordLabel,
  hidePasswordLabel
}) => {
  const formInitialValues = useSelector(selectFormValues("personalDetails"));
  const history = useHistory();
  const [isManualAddress, setIsManualAddress] = useState(
    formInitialValues?.isManualAddress
  );
  const location = useLocation<{
    bundlePlan: string;
    planDuration: string;
    toPortIn?: boolean;
  }>();
  const toPortIn = location?.state?.toPortIn;
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isFreeTopUpAndFreeSim =
    cartItems.length > 0 &&
    cartItems.every((t) => (t.isFreeSimTopup && t.price === 0) || t.isFreeSim);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [
    validateEmailSps,
    { data: validateEmailSpsResult, loading: validateEmailLoading },
  ] = useLazyQuery(VALIDATE_EMAIL_SPS);
  const dispatch = useDispatch();
  const { freeSimWithAutoTopUp } = useCartHelpers();
  const { submitOrder } = useSubmitOrder();
  const handleAddressChange = (setFieldValue: any) => (address: any) => {
    dispatch(setLoading(true));
    axios
      .get(
        `${GC.apiHostUri}/google/getAddress?placeId=${address.value.place_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const split = res.data.address1?.split(" ");
        setFieldValue(
          "streetName",
          split && split.length > 1
            ? split.slice(1, split.length).join(" ")
            : ""
        );
        setFieldValue("houseNumber", split && split.length > 0 ? split[0] : "");
        setFieldValue("townCity", res.data.city);
        setFieldValue("addition", res.data.state);
        setFieldValue("zipCode", res.data.postcode);
        setIsManualAddress(true);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const validationSchema = (manualAddress: boolean) => {
    let scheme: any = {
      firstName: yup
        .string()
        .max(50, firstNameErrorMax)
        .required(firstNameErrorRequired)
        .matches(nameRegex, firstNameErrorPattern),
      lastName: yup
        .string()
        .max(75, lastNameErrorMax)
        .required(lastNameErrorRequired)
        .matches(nameRegex, lastNameErrorPattern),
      email: yup
        .string()
        .max(100, emailErrorMax)
        .required(emailErrorRequired)
        .matches(emailRegex, emailErrorPattern),
      ...(freeSimWithAutoTopUp
        ? {
          password: yup
            .string()
            .min(8, minimumCharactersLabel)
            .required(enterPasswordLabel),
          confirmPassword: yup
            .string()
            .required(confirmPasswordLabel)
            .min(8, minimumCharactersLabel)
            .when("password", {
              is: (val: string | any[]) => val && val.length > 0,
              then: yup
                .string()
                .oneOf(
                  [yup.ref("password")],
                  samePasswordLabel
                ),
            }),
        }
        : {}),
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
  const isFreeTopUpWithAmountAndFreeSim = cartItems.every(
    (t) => (t.isFreeSimTopup && t.price > 0) || t.isFreeSim
  );
  return (
    <>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
      />
      <Formik
        validationSchema={validationSchema(isManualAddress)}
        initialValues={formInitialValues}
        onSubmit={(values: any) => {
          const userDetails = {
            ...values,
            isManualAddress,
          };
          dispatch(
            saveFormDetails({
              formName: "personalDetails",
              values: userDetails,
            })
          );
          if (isFreeTopUpWithAmountAndFreeSim) {
            setIsPaymentDialogOpen(true);
            return Promise.resolve();
          }
          if (isFreeTopUpAndFreeSim) {
            dispatch(setLoading(true));
            submitOrder({}, userDetails)
              .then((res: any) => res.json())
              .then(async (res: any) => {
                history.push((GC.journeyPages[C.ORDER_SUBMITTED] || '/'), {
                  orderId: res,
                  isGuest: false,
                  signedUp: !!values.password,
                  email: values.email,
                  personalDetails: {
                    ...values,
                  },
                  cartItems: [...cartItems],
                  paymentMethod: "Free",
                });
                dispatch(loadInitialCart([]));
                dispatch(resetForms());
              })
              .finally(() => {
                dispatch(setLoading(false));
              });

            return Promise.resolve();
          }
          history.push(toPortIn ? (GC.journeyPages[C.SIM_PORT_IN] || '/') : (GC.journeyPages[C.ORDER_DETAILS] || '/'), {
            ...(location.state || {}),
            personalDetails: values,
          });
          return Promise.resolve();
        }}
      >
        {({ handleSubmit, errors, setFieldValue }) => {
          const isExistingUser = errors.email === "exists";
          const disabledInputProps = {
            inputProps: {
              isDisabled: isExistingUser,
            },
          };
          return (
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
                  {...disabledInputProps}
                />
                <FormikInput
                  name="lastName"
                  label={lastNameLabel}
                  placeholder={lastNamePlaceholder}
                  isRequired
                  {...disabledInputProps}
                />
                <FormikInput
                  name="email"
                  label={emailAddressLabel}
                  placeholder={emailAddressPlaceholder}
                  isPrepaid
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
                {freeSimWithAutoTopUp && (
                  <>
                    <FormikPassword
                      name="password"
                      label={passwordField}
                      isRequired
                      showPasswordLabel={showPasswordLabel}
                      hidePasswordLabel={hidePasswordLabel}
                      {...disabledInputProps}
                    />
                    <FormikPassword
                      name="confirmPassword"
                      label={confirmPasswordField}
                      showPasswordLabel={showPasswordLabel}
                      hidePasswordLabel={hidePasswordLabel}
                      isRequired
                      {...disabledInputProps}
                    />
                  </>
                )}
                <AddressCard
                  onSetAutomatic={() => {
                    setIsManualAddress(false);
                    setFieldValue("streetName", "");
                    setFieldValue("houseNumber", "");
                    setFieldValue("townCity", "");
                    setFieldValue("addition", "");
                    setFieldValue("zipCode", "");
                  }}
                  onSetManual={() => {
                    setIsManualAddress(true);
                  }}
                  initialStatus={
                    isManualAddress ? "NewAddress" : "SearchNewAddress"
                  }
                  onAddressChange={handleAddressChange(setFieldValue)}
                  isDisabled={isExistingUser}
                  addressLabel={addressLabel}
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
                  isDisabled={
                    Object.keys(errors).length > 0 || validateEmailLoading
                  }
                >
                  {isFreeTopUpWithAmountAndFreeSim
                    ? paymentCta
                    : orderDetailsCta}
                </Button>
              </Flex>
            </form>
          );
}}
      </Formik>
    </>
  );
};

export default PersonalDetailsForm;