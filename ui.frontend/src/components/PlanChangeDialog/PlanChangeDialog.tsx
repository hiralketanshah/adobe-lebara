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
import { PlanChangeDialogProps } from "./types";
import Button from "../Button/Button";
import FormikCheckbox from "../Formik/FormikCheckbox/FormikCheckbox";

const PlanChangeDialog: React.FC<PlanChangeDialogProps> = ({
  isOpen,
  fromData,
  toData,
  onClose,
  onConfirm,
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
        <Text fontSize="20px">Bundle change confirmation</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody px={{ base: "16px", lg: "40px" }}>
        <Formik initialValues={{}} onSubmit={onConfirm}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Text color="primary.800">
                Are you sure you want to change your {fromData}GB Plan to{" "}
                {toData}GB Plan at the beginning of the month.
              </Text>
              <Flex flexDirection="column" mt={{ base: "16px", lg: "24px" }}>
                <FormikCheckbox name="contractHolderChecked">
                  <Text color="bodyCopy" fontSize="16px">
                    I confirm that I am the contract holder of the plan.
                  </Text>
                </FormikCheckbox>
                <Divider my={{ base: "10px", lg: "22px" }} />

                <FormikCheckbox name="contractHolderChecked">
                  <Text color="bodyCopy" fontSize="16px">
                    I agree to the tariff change and accept{" "}
                    <Link to="/" d="inline" color="secondary.500">
                      the data protection guidelines cancellation policy
                    </Link>
                    , the{" "}
                    <Link to="/" d="inline" color="secondary.500">
                      Service description for term tariffs
                    </Link>{" "}
                    and the{" "}
                    <Link to="/" d="inline" color="secondary.500">
                      terms and conditions for term contracts.
                    </Link>
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
                <Button w={{ base: "100%", lg: "403px" }} type="submit">
                  Confirm
                </Button>
                <Button
                  isFullWidth
                  w={{ base: "100%", lg: "403px" }}
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default PlanChangeDialog;
