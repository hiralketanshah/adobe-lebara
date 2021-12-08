/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdyenCheckout from "@adyen/adyen-web";
import { useHistory, useLocation } from "react-router-dom";
import "@adyen/adyen-web/dist/adyen.css";
import { Text } from "@chakra-ui/react";
import { ReduxState } from "../../redux/types";
import { loadInitialCart } from "../../redux/actions/cartActions";
import { setPaymentMethods } from "../../redux/actions/paymentMethodsActions";
import {globalConfigs, globalConstants} from  '../../GlobalConfigs.js';
import { googleAnalyticsCheckout } from "../../utils/gtm";
import { useApolloClient } from "@apollo/client";
import useSubmitOrder from "../../hooks/useSubmitOrder";
import AUTHENTICATE_USER_SPS from "../../graphql/AUTHENTICATE_USER_SPS";
import { saveUserInfo } from "../../redux/actions/userActions";
import { setLoading } from "../../redux/actions/loadingActions";
import { resetForms } from "../../redux/actions/formsActions";
const PaymentFrame: React.FC<{isPostpaid?: boolean}> = ({isPostpaid}) => {
  const [address, setAddress] = useState<string>("");
  const dispatch = useDispatch();
  const loadPaymentMethods = useCallback(() => {
    fetch(`${globalConfigs.apiHostUri}/payments/adyen/paymentMethods`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setPaymentMethods(res));
      });
  }, [dispatch]);
  
  React.useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);
  const location = useLocation<{
    isGuest?: boolean;
    phoneNumber?: boolean;
    email?: string;
    bundlePlan: string;
    planDuration: string;
    personalDetails: any;
    portIn: any;
  }>();

  const history = useHistory();
  const client = useApolloClient();
  const { submitOrder, userDetails, portIn } = useSubmitOrder();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  let paymentMethods = useSelector(
    (state: ReduxState) => state.paymentMethods.paymentMethods
  );
  const voucherCode = useSelector(
    (state: ReduxState) => state.voucher.voucherCode
  );
  const isPostPaid = !!isPostpaid;
  // For postpaid only show SEPA
  if (isPostPaid && paymentMethods) {
    paymentMethods = {
      paymentMethods: paymentMethods?.paymentMethods?.filter(
        (t: any) => t?.type === "sepadirectdebit"
      ),
    };
  }
  React.useEffect(() => {
    googleAnalyticsCheckout("EEcheckoutPayment", 3, cartItems);
  }, []);
  const paymentContainerRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef("");
  const checkout = useRef<AdyenCheckout>();
  const [error, setError] = useState("");
  const total =
    (cartItems.reduce((sum, t) => sum + t.price, 0) * 100).toLocaleString(
      globalConfigs.locale,
      {
        maximumFractionDigits: 2,
        useGrouping: false,
      }
    ) || 1500;

  React.useEffect(() => {
    if (location.state && location.state?.personalDetails) {
      setAddress(location.state.personalDetails.address);
    }
  }, [address, location]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAdditionalDetails = useCallback(
    (state: any) => {
      fetch(
        `${globalConfigs.apiHostUri}/payments/adyen/payments/details?orderRef=${orderRef.current}`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(state.data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then(async (res) => {
          if (res) {
            if (userDetails.password) {
              const authUser = await client.query({
                query: AUTHENTICATE_USER_SPS,
                variables: {
                  email: userDetails.email,
                  password: userDetails.password,
                },
              });

              if (authUser.data.authenticateUserSPS) {
                dispatch(
                  saveUserInfo({
                    ...authUser.data.authenticateUserSPS,
                    email: userDetails.email,
                  })
                );
              }
            }
            dispatch(loadInitialCart([]));
            history.push(`${(globalConfigs.journeyPages[globalConstants.ORDER_SUBMITTED]  || '/')}`, {
              isGuest: location?.state?.isGuest,
              signedUp: !!userDetails.password,
              email:
                location?.state?.email ??
                location.state?.personalDetails?.email,
              phoneNumber:
                location?.state?.phoneNumber ?? location?.state?.portIn?.msisdn,
              personalDetails: location?.state?.personalDetails,
              voucherCode,
              cartItems: [...cartItems],
              paymentMethod: state.data?.paymentMethod?.type,
              orderId: res.orderId
            });
          }
        });
    },
    [dispatch, history]
  );
  React.useEffect(() => {
    if (!paymentMethods || checkout.current) return;
    checkout.current = new AdyenCheckout({
      setStatusAutomatically: false,
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true,
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          amount: {
            value: Number(total),
            currency: globalConfigs.currencyName,
          },
        },
      },
      locale: globalConfigs.locale,
      showPayButton: true,
      clientKey: globalConfigs.paymentClientKey,
      environment: globalConfigs.paymentAdeyenEnv,
      paymentMethodsResponse: paymentMethods,
      onAdditionalDetails,

      onSubmit: (state: any, component: any) => {
        if (state.isValid) {
          dispatch(setLoading(true));
          component.setStatus("loading");
          submitOrder(state.data)
            .then((res) => res.json())
            .then(async (res) => {
              if (res && res.error) {
                setError(res.error);
                component.setStatus("ready");
                return;
              }
              if (
                res &&
                res.length &&
                res.length > 0 &&
                res[0].resultCode === "Refused"
              ) {
                setError(res[0].refusalReason);
                component.setStatus("ready");
                return;
              }
              if (res && res.length && res.length > 0 && res[0].action) {
                // eslint-disable-next-line prefer-destructuring
                orderRef.current = res[1];
                component.handleAction(res[0].action);
                return;
              }
              if (res) {
                if (userDetails.password) {
                  const authUser = await client.query({
                    query: AUTHENTICATE_USER_SPS,
                    variables: {
                      email: userDetails.email,
                      password: userDetails.password,
                    },
                  });

                  if (authUser.data.authenticateUserSPS) {
                    dispatch(
                      saveUserInfo({
                        ...authUser.data.authenticateUserSPS,
                        email: userDetails.email,
                      })
                    );
                  }
                }

                dispatch(loadInitialCart([]));
                dispatch(resetForms());

                history.push(`${(globalConfigs.journeyPages[globalConstants.ORDER_SUBMITTED]  || '/')}`, {
                  isGuest: location?.state?.isGuest,
                  email: location?.state?.email ?? userDetails.email,
                  signedUp: !!userDetails.password,
                  phoneNumber: location?.state?.phoneNumber ?? portIn?.msisdn,
                  personalDetails: userDetails,
                  voucherCode,
                  cartItems: [...cartItems],
                  paymentMethod: state.data?.paymentMethod?.type,
                  orderId: res.orderId
                });
                dispatch(saveUserInfo);
              }
            })
            .catch(() => {})
            .finally(() => {
              dispatch(setLoading(false));
            });
          }
        },
      });
    if (paymentContainerRef.current != null) {
      checkout.current
        .create("dropin", {
          openFirstPaymentMethod: isPostPaid,
        })
        .mount(paymentContainerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethods, total]);
  return (
    <div className="payment-container">
      {error && (
        <Text color="unsuccessful" fontSize="20px" pb="10px">
          {error}
        </Text>
      )}
      <div ref={paymentContainerRef} className="payment" />
    </div>
  );
};

export default PaymentFrame;
