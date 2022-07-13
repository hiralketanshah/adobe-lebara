import React, { useState } from "react";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { HeroBannerProps } from "./types";
import Button from "../Button/Button";
import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import {
  selectIsAuthenticated,
  selectMsisdn,
  selectLogout
} from "@lebara/ui/src/redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import useAddToCart from "@lebara/ui/src/hooks/useAddToCart";
import { ReduxState } from "@lebara/ui/src/redux/types";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import { Image } from "@lebara/ui/src/components/Image/Image";
import AttachSimModels from "@lebara/ui/src/components/AttachSim/AttachSimModels";
import { selectIsLoading } from "@lebara/ui/src/redux/selectors/loadingSelectors";

const HeroBanner: React.FC<HeroBannerProps> = ({
  imagePath,
  title,
  description,
  buttonCTALabel,
  buttonCTALink,
  getItNowErrorMessage,
  headingType,
  isSimChoiceFlow,
  showAttachSim
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
