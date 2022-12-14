import React, { useMemo, useState } from "react";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { HeroBannerProps } from "./types";
import Button from "@lebara/core/components/Button/Button";
import { setLoading } from "@lebara/core/redux/actions/loadingActions";
import {
  selectIsAuthenticated,
  selectMsisdn,
  selectLogout
} from "@lebara/core/redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import useAddToCart from "@lebara/core/hooks/useAddToCart";
import { ReduxState } from "@lebara/core/redux/types";
import { useHistory } from "@lebara/core/hooks/useHistory";
import { Image } from "@lebara/core/components/Image/Image";
import AttachSimModels from "@lebara/core/components/AttachSim/AttachSimModels";
import { selectIsLoading } from "@lebara/core/redux/selectors/loadingSelectors";

const HeroBanner: React.FC<HeroBannerProps> = ({
  imagePath,
  title,
  description,
  buttonCTALabel,
  buttonCTALink,
  getItNowErrorMessage,
  headingType,
  isSimChoiceFlow,
  showAttachSim,
  imageUrl,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const msisdn = useSelector(selectMsisdn);
  const toast = useToast();
  const dispatch = useDispatch();
  const [addItemToCart] = useAddToCart();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const history = useHistory();
  const [isAttachSim, setAttachSim] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const isLogout = useSelector(selectLogout);
  const previousTopUp = useMemo(
    () =>
      cartItems.find(
        (t) =>
          t.duration.includes("Free Sim Top Up") ||
          t.duration.includes("Top-up") ||
          t.id === 99999998
      ),
    [cartItems]
  );
return (
  <>
  {isAttachSim && <AttachSimModels />}
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
          onClick={imageUrl ? (() => history.push(imageUrl)) : undefined}
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
        as={headingType || 'h1' }
      >
        {title}
      </Heading>
      <span className="about-lebara" dangerouslySetInnerHTML={{ __html: description || ""}} />
      <Button my="20px" fontSize={{ lg: "16px" }} onClick={buttonCTALink ? ()=> history.push(buttonCTALink) : async () => {
        setAttachSim(false);
        if (isAuthenticated && !isLoading && !msisdn && !isLogout && showAttachSim) {
          setAttachSim(true);
          return;
        }
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
      try{
        if (!cartItems.find((t : any) => t.id === 99999999)) {
          await addItemToCart(99999999, "Free Sim", "", 0, "free-sim");
        }
        if (!previousTopUp) {
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
      }catch (e){
      }
      dispatch(setLoading(false));
      history.push(isSimChoiceFlow ? "/mobile-number-from-another-operator-choice" : "/order-details");
    }}>
        {buttonCTALabel}
      </Button>
    </Flex>
  </Flex>
  </>
);
  }

export default HeroBanner;
