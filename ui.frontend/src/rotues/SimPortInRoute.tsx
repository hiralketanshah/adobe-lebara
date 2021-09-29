import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Flex, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import SelectNumberAndOrderDetailsLayout from "../layouts/SelectNumberAndOrderDetailsLayout";
import { highlightButton } from "../redux/actions/highlightActions";
import SimPortNumberForm from "../components/SimPortNumberForm/SimPortNumberForm";
import Button from "../components/Button/Button";
import { SimPortInProps } from "../layouts/types";

const SimPortInRoute: React.FC<SimPortInProps> = ({
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
        {pretitle ? <Heading color="primary.500" fontSize="20px" fontWeight="bold">
          {pretitle}
        </Heading> : null}
        {doitLaterButtonLabel ? <Button
          variant="link"
          textTransform="none"
          colorScheme="secondary"
          onClick={handleWillDoItLaterClick}
        >
          {doitLaterButtonLabel}
        </Button> : null}
      </Flex>
      <SimPortNumberForm
        {...{
          portInCodeHelpline: 3179,
          maxLengthMobileNumber: 12,
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
        onCancel={() => history.goBack()}
        onWillDoItLater={handleWillDoItLaterClick}
        {...props}
      />
    </SelectNumberAndOrderDetailsLayout>
  );
};

export default SimPortInRoute;

