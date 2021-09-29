import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ExpandableSimPlanCardProps } from "./types";
import Button from "../Button/Button";
import PlanDetailsDialog from "../PlanDetailsDialog/PlanDetailsDialog";
import { allowanceListProps } from "../ExpandablePlanCard/types";
import { useHistory } from "react-router-dom";
const ExpandableSimPlanCard: React.FC<ExpandableSimPlanCardProps> = ({
  planName,
  previewIcon,
  showProductInformationButton,
  productInformationButtonLabel,
  onActionClick,
  allowanceList,
  validity,
  cost,
  showLabel,
  buttonLabel,
  planInfo,
  additionalOffers
}) => {
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const filteredAllowanceList: allowanceListProps = allowanceList && allowanceList.find((list) => list.name && list.name.includes('Data')) || {};
  const handleActionClick = async () => {
    setIsButtonDisabled(true);
    // if (onActionClick) {
    //   await onActionClick();
    // }
    history.push("/lebara-sim-choice");
    setIsButtonDisabled(false);
  };
  return (
    <Flex
      flexDirection="column"
      background="white"
      borderRadius="lg"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      px={{ base: "15px", lg: "27.23px" }}
      pt={{ base: "15px", lg: "34px" }}
      pb={{ base: "15px", lg: "18px" }}
    >
      {planName && (
        <Text color="primary.500" fontWeight="bold">
          {planName}
        </Text>
      )}

      <PlanDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        planName={planName}
        price={parseFloat(cost || '')}
        duration={validity || ''}
        countries={(planInfo && planInfo.countryList) || []}
        previewIcon={previewIcon}
        previewItems={(planInfo && planInfo.listPlanItem) || []}
        title={planInfo?.title}
        countryTitle={planInfo?.countryTitle}
        dataValue={filteredAllowanceList.formatedValue}
        isButtonDisabled={isButtonDisabled}
        onActionClick={async () => {
          setIsButtonDisabled(true);
          // if (onActionClick) {
          //   await onActionClick();
          // }
          history.push("/lebara-sim-choice");
          setIsButtonDisabled(false);
          setIsDialogOpen(false);
        }}
        buttonText={buttonLabel}
      />
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          as="h3"
          fontSize={32}
          pr="6px"
          pl="2px"
          fontWeight="bold"
          color="secondary.500"
          fontFamily="Chiswick Grotesque Lebara"
        >
          {filteredAllowanceList.formatedValue}
        </Text>

        <Flex alignItems="baseline" color="primary.600">
          <Text
            as="h3"
            fontSize={24}
            pr="6px"
            pl="2px"
            color="secondary.500"
            fontWeight={500}
          >
            {cost} €
          </Text>
          <Text as="p" fontSize={14} color="lightenPrimary.150">
            {" "}
            {`/ ${validity}`}
          </Text>
        </Flex>
      </Flex>
      {additionalOffers && (
        <Box mt="7px" color="primary.700">
          {additionalOffers.match(/<li>.*?<\/li>/g)?.length ? additionalOffers.match(/<li>.*?<\/li>/g)?.map((t) => (
            <Flex width="100%" alignItems="center" mb={1}>
              {previewIcon}
              <Text ml="8px" dangerouslySetInnerHTML={{ __html: t.replace(/<li>|<\/li>/g, '') }}></Text>
            </Flex>
          )) : <Flex width="100%" alignItems="center" mb={1}>
            <Text ml="8px" dangerouslySetInnerHTML={{ __html: additionalOffers }}></Text>
          </Flex>}
        </Box>
      )}
      {showProductInformationButton && (
        <Text
          color="grey.200"
          textDecorationLine="underline"
          fontSize={12}
          lineHeight="17px"
          pt="10px"
        >
          {productInformationButtonLabel}
        </Text>
      )}

      <Divider my={3.5} />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color="primary"
        gridGap="16px"
      >
        <Button
          isFullWidth
          variant="ghost"
          color="secondary.500"
          fontSize="16px"
          colorScheme="secondary"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          {" "}
          {showLabel}
        </Button>
        <Button
          isFullWidth
          fontSize="16px"
          onClick={handleActionClick}
          disabled={isButtonDisabled}
          isLoading={isButtonDisabled}
        >
          {buttonLabel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExpandableSimPlanCard;
