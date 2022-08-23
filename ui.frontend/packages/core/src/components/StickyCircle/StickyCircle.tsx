import React from "react";
import { Text, Box, Button, Circle } from "@chakra-ui/react";
import { StickyCircleProps } from "./types";
import { useHistory } from "@lebara/core/hooks/useHistory";
import './styles.css';
import { useDispatch, useSelector } from "react-redux";
import useAddToCart from "@lebara/core/hooks/useAddToCart";
import { ReduxState } from "@lebara/core/redux/types";
import { setLoading } from "@lebara/core/redux/actions/loadingActions";
const StickyCircle: React.FC<StickyCircleProps> = ({
  linkLabel,
  linkPath
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [addItemToCart] = useAddToCart();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  return (
    <Box
      position="fixed"
      paddingRight="20px"
      display={{ lg: "inline-block", base: "none" }}
     // left={{ lg: "calc(50% + 387px)", base: "50px" }}
      top="450px"
      right="0"
      className="stickycircle"
    >
      <Circle
        size="72px"
        bg="secondary.500"
        color="white"
        textAlign="center"
      >
        <Button
          display="flex"
          flexDirection="column"
          bg="secondary.500"
          _hover={{ bg: "secondary.500", background: "none" }}
          _active={{ bg: "secondary.500", borderColor: "secondary.500", background: "none" }}
          onClick={linkPath ? ()=> history.push(linkPath) : async () => {
            dispatch(setLoading(true));
            try{
              if (!cartItems.find((t : any) => t.id === 99999998)) {
                await addItemToCart(
                    99999998,
                    "Free Sim Top Up",
                    "",
                    10,
                    "free-sim-top-up",
                    undefined,
                    undefined,
                    true
                );
              }
            }catch (e){
            }
            dispatch(setLoading(false));
            history.push("/order-details");
          }}
          _focus={{
            outline: "none",
          }}
          background="none"
        >
          <Text textTransform="capitalize" 
            fontSize={linkLabel && linkLabel?.length > 7 ? '.75rem' : '17px'} 
            color="white" whiteSpace="break-spaces">
            {linkLabel}
          </Text>
        </Button>
      </Circle>
    </Box>
  );
}

export default StickyCircle;
