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
const PaymentFrame: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const dispatch = useDispatch();
  const loadPaymentMethods = useCallback(() => {
    fetch(`https://api-aggregator.lebara.com/payments/adyen/paymentMethods`, {
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

  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const paymentMethods = useSelector(
    (state: ReduxState) => state.paymentMethods.paymentMethods
  );

  const paymentContainerRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef("");
  const checkout = useRef<AdyenCheckout>();
  const [error, setError] = useState("");
  const total =
    (cartItems.reduce((sum, t) => sum + t.price, 0) * 100).toLocaleString(
      "en-US",
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
        `https://api-aggregator.lebara.com/payments/adyen/payments/details?orderRef=${orderRef.current}`,
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
        .then((res) => {
          if (res) {
            dispatch(loadInitialCart([]));
            history.push(`/order-submitted/${res}`, {
              isGuest: location?.state?.isGuest,
              email: location?.state?.email,
              phoneNumber: location?.state?.phoneNumber,
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
          billingAddressRequired: true,
          name: "Credit or debit card",
          amount: {
            value: Number(total),
            currency: "EUR",
          },
        },
      },
      locale: "en_US",
      showPayButton: true,
      clientKey: "test_H6OSQDTUINBCDPAD2QBO2CBX2AKULOWL",
      environment: "test",

      paymentMethodsResponse: paymentMethods,
      onAdditionalDetails,

      onSubmit: (state: any, component: any) => {
        if (state.isValid) {
          component.setStatus("loading");
          fetch(`https://api-aggregator.lebara.com/payments/adyen/payments`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({
              channel: "Web",
              country: "DE",
              userType: "Registered",
              personalDetails: {
                firstName:
                  location.state?.personalDetails?.firstName || "Guest",
                lastName: location.state?.personalDetails?.lastName || "User",
                emailId: location.state?.isGuest
                  ? location?.state.email
                  : location.state?.personalDetails?.email || "test1@gmail.com",
              },
              portIn: location.state?.portIn
                ? {
                    ...location.state.portIn,
                  }
                : {},
              addresses: [
                {
                  address1:
                    location.state?.personalDetails?.streetName ||
                    "AVENUE DE HAMBOURG",
                  address2:
                    location.state?.personalDetails?.houseNumber || "139",
                  city:
                    location.state?.personalDetails?.townCity || "MARSEILLE",
                  postcode: location.state?.personalDetails?.zipCode || "13008",
                  addition: location.state?.personalDetails?.addition,
                },
              ],
              ...state.data,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
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
                /*
                component.setStatus("error", {
                  message: res[0].additionalData.refusalReasonRaw
                });
*/
                /*
                component.setStatus('loading'); // start the loading state
                component.setStatus('ready'); // set back to the initial state
*/

                return;
              }
              if (res && res.length && res.length > 0 && res[0].action) {
                // eslint-disable-next-line prefer-destructuring
                orderRef.current = res[1];
                component.handleAction(res[0].action);
                return;
              }
              if (res) {
                dispatch(loadInitialCart([]));
                history.push(`/order-submitted/${res}`, {
                  isGuest: location?.state?.isGuest,
                  email: location?.state?.email,
                  phoneNumber: location?.state?.phoneNumber,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
    if (paymentContainerRef.current != null) {
      checkout.current.create("dropin").mount(paymentContainerRef.current);
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
