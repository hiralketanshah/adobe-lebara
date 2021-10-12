import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { BuyPlanLayoutProps } from "./types";
import Button from "../components/Button/Button";
import PaymentDialog from "../components/PaymentDialog/PaymentDialog";

const BuyPlanLayout: React.FC<BuyPlanLayoutProps> = ({
  children,
  hideButton,
  noPadding,
  fullWidth,
  maxW,
  paymentButtonLabel
}) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  return (
    <Box>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
      />
      <Box
        backgroundColor="lightenPrimary.50"
        px={noPadding ? 0 : "20px"}
        pt={noPadding ? 0 : "15px"}
      >
        <Center>
          <Box
            maxW={maxW !== undefined ? maxW : fullWidth ? "100% " : "630px"}
            w="100%"
            bg={fullWidth || noPadding ? {} : { lg: "white" }}
            px={fullWidth || noPadding ? {} : { lg: "60px" }}
            my={fullWidth || noPadding ? {} : { lg: "20px" }}
          >
            {children}
            {!hideButton && (
              <Center>
                <Box py="20px" w="100%">
                  <Button
                    isFullWidth
                    onClick={() => setIsPaymentDialogOpen(true)}
                  >
                    {paymentButtonLabel}
                  </Button>
                </Box>
              </Center>
            )}
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default BuyPlanLayout;
