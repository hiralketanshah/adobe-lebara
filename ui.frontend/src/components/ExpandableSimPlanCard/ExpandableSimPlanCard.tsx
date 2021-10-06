import { Box, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { ExpandableSimPlanCardProps } from "./types";
import OfferTypes from "./types";
import Button from "../Button/Button";
import PlanDetailsDialog from "../PlanDetailsDialog/PlanDetailsDialog";
import { allowanceListProps } from "../ExpandablePlanCard/types";
import { useHistory } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";
import { useLocalStorage } from "@rehooks/local-storage";
const ExpandableSimPlanCard: React.FC<ExpandableSimPlanCardProps> = ({
  planName,
  previewIcon,
  showProductInformationButton,
  productInformationButtonLabel,
  allowanceList,
  validity,
  cost,
  showLabel,
  planInfo,
  additionalOffers,
  id,
  buttonLabel,
  addedtoCartLabel,
  viewCartLabel,
  offerType
}) => {
  const history = useHistory();
  const [addItemToCart] = useAddToCart();
  const toast = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [userToken] = useLocalStorage("userToken");
  const handleViewCartClick = () => {
    //will be replaced once common authoring for routing decided on AEM
    history.push(userToken ? "/order-details" : "/login");
  };
  const filteredAllowanceList: allowanceListProps = (allowanceList && allowanceList.find((list) => list.name && list.name.includes('Data'))) || {};
  const handleAddToCart = async () => {
    setIsButtonDisabled(true);
    switch (offerType) {
      case OfferTypes.BOLTON:
      case OfferTypes.TOPUP: {
        const updatedAddtoCart: string = addedtoCartLabel?.replace('{0}', planName) || '';
        await addItemToCart(parseInt(id || ''), planName, filteredAllowanceList as string, parseFloat(cost || ''), "addon");
        toast({
          position: "bottom",
          render: () => (
            <Flex
              color="white"
              p={3}
              bg="primary.700"
              borderRadius="4px"
              justifyContent="space-between"
              maxW="420px"
            >
              <Text py="12px">{updatedAddtoCart}</Text>
              <Button
                variant="ghost"
                colorScheme="secondary"
                onClick={handleViewCartClick}
              >
                {viewCartLabel}
              </Button>
            </Flex>
          ),
        });
        break;
      }
      case OfferTypes.PREPAID:
      case OfferTypes.POSTPAID: {
        await addItemToCart(parseInt(id || ''), planName, ((allowanceList && allowanceList.join()) || ''), parseFloat(cost || ''), "plan");
        //will be replaced once common authoring for routing decided on AEM
        history.push(userToken ? "/order-details" : "/lebara-sim-choice");
      }
    }
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
        onActionClick={handleAddToCart}
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
          onClick={handleAddToCart}
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
