import React from "react";
import {
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { CancelPlanChangeDialogProps } from "./types";
import Button from "../Button/Button";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";
import getDynamicValues from "../../utils/get-aem-dynamic-values";

const CancelPlanChangeDialog: React.FC<CancelPlanChangeDialogProps> = ({
  isOpen,
  data,
  onClose,
  onConfirm,
  planChangeTitle,
  planChangeDesc,
  termsConsentLabel,
  termsConditionsLabel,
  termsConditionsLink,
  contractConsentLabel,
  confirmLabel,
  cancelLabel
}) => (
  <Modal
    size="2xl"
    blockScrollOnMount={false}
    isOpen={isOpen}
    closeOnOverlayClick={false}
    onClose={onClose}
    isCentered
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader px={{ base: "16px", lg: "40px" }}>
        <Text fontSize="20px">{planChangeTitle}</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody px={{ base: "16px", lg: "40px" }}>
        <Formik
          initialValues={{
            agreeToTerms: false,
            contractHolderChecked: false,
          }}
          onSubmit={onConfirm}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Text color="primary.800">
                {getDynamicValues(planChangeDesc, [data])}
              </Text>
              <Flex flexDirection="column" mt={{ base: "16px", lg: "24px" }}>
                <FormikCheckbox name="agreeToTerms">
                  <Text color="bodyCopy" fontSize="16px">
                    {termsConsentLabel}
                    <Link to={termsConditionsLink} d="inline" color="secondary.500">
                      {termsConditionsLabel}
                    </Link>
                  </Text>
                </FormikCheckbox>
                <Divider my={{ base: "10px", lg: "22px" }} />

                <FormikCheckbox name="contractHolderChecked">
                  <Text color="bodyCopy" fontSize="16px">
                    {contractConsentLabel}
                  </Text>
                </FormikCheckbox>
              </Flex>
              <Flex
                flexDirection="column"
                gridGap="20px"
                mt={{ base: "25px", lg: "33px" }}
                mb={{ base: "25px", lg: "65px" }}
                alignItems="center"
              >
                <Button
                  w={{ base: "100%", lg: "403px" }}
                  type="submit"
                  disabled={
                    !values.agreeToTerms ||
                    !values.contractHolderChecked ||
                    isSubmitting
                  }
                >
                  {confirmLabel}
                </Button>
                <Button
                  isFullWidth
                  w={{ base: "100%", lg: "403px" }}
                  variant="outline"
                  onClick={onClose}
                >
                  {cancelLabel}
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default CancelPlanChangeDialog;
