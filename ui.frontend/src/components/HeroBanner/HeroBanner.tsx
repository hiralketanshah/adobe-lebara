import React from "react";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { HeroBannerProps } from "./types";
import Button from "../Button/Button";
import { setLoading } from "../../redux/actions/loadingActions";
import {
  selectIsAuthenticated,
  selectMsisdn,
} from "../../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import useAddToCart from "../../hooks/useAddToCart";
import { ReduxState } from "../../redux/types";
import { useHistory } from "react-router-dom";
import { globalConfigs as GC, globalConstants as C } from "@lebara/ui/src/configs/globalConfigs.js";
import { Image } from "@lebara/ui/src/components/Image/Image";

const HeroBanner: React.FC<HeroBannerProps> = ({
  imagePath,
  title,
  description,
  buttonCTALabel,
  getItNowErrorMessage
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const msisdn = useSelector(selectMsisdn);
  const toast = useToast();
  const dispatch = useDispatch();
  const [addItemToCart] = useAddToCart();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
return (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    alignItems={{ lg: "center" }}
    justifyContent="center"
    bg="lightenPrimary.500"
    px="20px"
    h={{ lg: "600px" }}
  >
    <Box d="inline-block" mx="auto">
      <Box pos="relative" d="inline-block">
        <Image
          src={imagePath}
          pos="relative"
          zIndex={1}
          w={{ base: 245, lg: 398 }}
        />
      </Box>
    </Box>
    <Flex
      flexDirection="column"
      gridGap={{ base: "11.5px", lg: "21px" }}
      maxW={{ lg: "355px" }}
      mr={{ lg: "auto" }}
    >
      <Heading
        fontSize={{ base: "32px", lg: "47px" }}
        lineHeight={{ base: "40px", lg: "50px" }}
        color="white"
        letterSpacing="0.25px"
      >
        {title}
      </Heading>
      <span className="about-lebara" dangerouslySetInnerHTML={{ __html: description || ""}} />
      <Button my="20px" fontSize={{ lg: "16px" }} onClick={async () => {
      if (isAuthenticated && msisdn) {
        toast.closeAll();
        toast({
          title: getItNowErrorMessage,
          status: "error",
          isClosable: true,
        });
        return;
      }
      dispatch(setLoading(true));

      if (!cartItems.find((t : any) => t.id === 99999999)) {
        await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
      }
      if (!cartItems.find((t : any) => t.id === 99999998)) {
        await addItemToCart(
          99999998,
          "Free Sim Top Up",
          "",
          0,
          "free-sim-top-up",
          undefined,
          undefined,
          true
        );
      }
      dispatch(setLoading(false));
      history.push((GC.journeyPages[C.ORDER_DETAILS] || '/'));
    }}>
        {buttonCTALabel}
      </Button>
    </Flex>
  </Flex>
);
  }

export default HeroBanner;
