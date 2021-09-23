import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Flex, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import SelectNumberAndOrderDetailsLayout from "./SelectNumberAndOrderDetailsLayout";
import { highlightButton } from "../../redux/actions/highlightActions";
import SimPortNumberForm from "../SimPortNumberForm/SimPortNumberForm";
import Button from "../Button/Button";
import { SimPortInProps } from "./types";

const SimPortIn: React.FC<SimPortInProps> = ({
  ...props
}) => {
  const { pretitle, doitLaterButtonLabel, consentTwo, dataProtectionMessage, portingInfo, consentOne, dobTitle, dobDesc, dayFieldLabel, monthFieldLabel, yearFieldLabel, currentProvidersOptions } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(
    () => () => {
      dispatch(
        highlightButton({
          key: 0,
        })
      );
    },
    [dispatch]
  );

  const handleWillDoItLaterClick = () => {
    history.push("/personal-details");
  };

  return (
    <SelectNumberAndOrderDetailsLayout>
      <Flex pb="15px" alignItems="center" justifyContent="space-between">
        {pretitle ? <Heading color="lebaraChambray.500" fontSize="20px" fontWeight="bold">
          {pretitle}
        </Heading> : null}
        {doitLaterButtonLabel ? <Button
          variant="link"
          textTransform="none"
          colorScheme="lebaraChambray"
          onClick={handleWillDoItLaterClick}
        >
          {doitLaterButtonLabel}
        </Button> : null}
      </Flex>
      <SimPortNumberForm
        {...{
          portInCodeHelpline: 3179,
          maxLengthMobileNumber: 10,
          maxLengthPortInCode: 5,
          consent: consentTwo || '',
          dataProtectionDeclation: dataProtectionMessage || '',
          confirm: portingInfo || '',
          marketting: consentOne || '',
          multiFieldOptions: {
            label: dobTitle,
            explainer: dobDesc,
            fields: [dayFieldLabel || '', monthFieldLabel || '', yearFieldLabel || ''],
          },
          currentProviderSelectOptions: currentProvidersOptions || []
        }}
        onContinue={() => history.push("/order-details")}
        onCancel={() => history.goBack()}
        onWillDoItLater={handleWillDoItLaterClick}
        {...props}
      />
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimPortIn;
