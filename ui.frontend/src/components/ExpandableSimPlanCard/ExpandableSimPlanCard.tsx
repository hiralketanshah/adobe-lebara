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
import {globalConfigs, globalConstants} from  '../../GlobalConfigs.js';
import { useMutation } from "@apollo/client";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";
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
  offerType,
  isRelatedPlan,
  isRemoveFromCart,
  onClose
}) => {
  const history = useHistory();
  const [addItemToCart] = useAddToCart();
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const toast = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [userToken] = useLocalStorage("userToken");
  const handleViewCartClick = () => {
    history.push(userToken ? (globalConfigs.journeyPages[globalConstants.ORDER_DETAILS] || '/') : (globalConfigs.journeyPages[globalConstants.LOGIN]  || ''));
  };
  const filteredAllowanceList: allowanceListProps = (allowanceList && allowanceList.find((list) => list.name && list.name.includes('Data'))) || {};
  const handleAddToCart = async () => {
   const description:string | undefined = additionalOffers?.match(/(?<=>)([\w\s]+)(?=<\/)/g)?.length ? additionalOffers.replaceAll('\n','').match(/(?<=>)([\w\s^\\n]+)(?=<\/)/g)?.join('+') : additionalOffers;
    setIsButtonDisabled(true);
    if(isRemoveFromCart){
      await removeFromCartApi({
        variables: {
          itemId: id,
        },
      });
    }
    switch (offerType) {
      case OfferTypes.BOLTON:
      case OfferTypes.TOPUP: {
        const updatedAddtoCart: string = addedtoCartLabel?.replace('{0}', planName) || '';
        await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), parseFloat(cost || ''), "addon");
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
        await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), parseFloat(cost || ''), "plan");
          isRemoveFromCart && onClose? onClose() : history.push(userToken ? (globalConfigs.journeyPages[globalConstants.ORDER_DETAILS]  || '/') : (globalConfigs.journeyPages[globalConstants.LEBARA_SIM_CHOICE]  || '/'));
      }
    }
    setIsButtonDisabled(false);
  };
  return (
    <Flex
    flexDirection="column"
    background="white"
    borderRadius={isRelatedPlan ? undefined : "lg"}
    boxShadow={isRelatedPlan ? undefined : "0px 4px 4px rgba(0, 0, 0, 0.05)"}
    px={isRelatedPlan ? undefined : { base: "15px", lg: "27.23px" }}
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
        duration={!(offerType === OfferTypes.BOLTON) ? (validity || '') : ''}
        countries={(planInfo && planInfo.countryList) || []}
        previewIcon={previewIcon}
        previewItems={(planInfo && planInfo.listPlanItem) || []}
        title={planInfo?.title}
        countryTitle={planInfo?.countryTitle}
        dataValue={filteredAllowanceList.formatedValue}
        isButtonDisabled={isButtonDisabled}
        onActionClick={handleAddToCart}
        buttonText={buttonLabel}
        hideButton={isRelatedPlan}
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
            {cost} {globalConfigs.currencySymbol}
          </Text>
          {!(offerType === OfferTypes.BOLTON) ? <Text as="p" fontSize={14} color="lightenPrimary.150">
            {" "}
            {`/ ${validity}`}
          </Text> : ''}
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

{!isRelatedPlan && <Divider my={3.5} />}
      <Flex
       mt={isRelatedPlan ? 3.5 : undefined}
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
          variant={isRelatedPlan ? "outline" : undefined}
        >
          {buttonLabel}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExpandableSimPlanCard;
