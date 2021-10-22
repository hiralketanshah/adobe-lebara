import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import ProgressStep from "../ProgressStep/ProgressStep";
import "@adyen/adyen-web/dist/adyen.css";
import BuyPlanLayout from "../../layouts/BuyPlanLayout";
import { SuccessCard } from "../SuccessCard/SuccessCard";
// import DesktopCreateAccountForm from "../components/DesktopCreateAccountForm/DesktopCreateAccountForm";
// import Carousel from "../components/Carousel/Carousel";
// import AppPromo from "../components/GetTheApp/AppPromo";
// import PopularPlansCard from "../components/PopularPlansCard/PopularPlansCard";
// import useGetAddons from "../hooks/useGetAddons";

const OrderSubmittedRoute: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location =
    useLocation<{ phoneNumber?: string; email?: string; isGuest?: boolean }>();
  console.log(location);
  // const [addons] = useGetAddons({
  //   variables: {
  //     country: "DE",
  //   },
  // });

  return (
    <BuyPlanLayout hideButton noPadding fullWidth>
      <Box px={{ base: "20px", lg: "50px" }}>
        {/* <ProgressStep
          activeStepIndex={2}
          steps={["Order Details", "Confirmation"]}
        /> */}
        <Box mt="32px">
          <SuccessCard
            icon={IoIosCheckmarkCircleOutline}
            title={`Order N.${orderId || 1}`}
            subtitle="Thank you for purchasing the selected product. Your SIM will arrive next working day. Occasionally it may take a little longer."
          />
        </Box>

        {/* {location?.state?.isGuest && (
          <Box bg={{ lg: "white" }}>
            <DesktopCreateAccountForm
              initialValues={{
                email: location?.state?.email ?? "",
                mobile: location?.state?.phoneNumber ?? "",
                password: "",
                confirmPassword: "",
              }}
            />
          </Box>
        )} */}

        {/* <Heading
          fontSize={{ lg: "32px" }}
          color="lightenPrimary.150"
          textAlign="left"
          fontWeight="bold"
          pt="28px"
          pb="20px"
        >
          Unmissable Offers
        </Heading> */}
      </Box>
      {/* <Box paddingBottom={{ lg: "40px" }}>
        <Carousel
          slides={
            addons?.slice(0, 10)?.map((t: any) => ({
              element: (
                <PopularPlansCard
                  price={t.price}
                  planName={t.planName}
                  minutes="Unlimited"
                  onActionClick={t.onActionClick}
                />
              ),
              index: 0,
            })) || []
          }
          popularPlans
        />
      </Box> */}

      {/* <Box bg="white" mt="21px">
        <AppPromo />
      </Box> */}
    </BuyPlanLayout>
  );
};

export default OrderSubmittedRoute;
