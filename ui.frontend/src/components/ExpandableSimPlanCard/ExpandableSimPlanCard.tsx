import { Box, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ExpandableSimPlanCardProps } from "./types";
import OfferTypes from "./types";
import Button from "@lebara/ui/src/components/Button/Button";
import PlanDetailsDialog from "../PlanDetailsDialog/PlanDetailsDialog";
import { allowanceListProps } from "../ExpandablePlanCard/types";
import { useHistory } from "@lebara/ui/src/hooks/useHistory";
import useAddToCart from "@lebara/ui/src/hooks/useAddToCart";
import { globalConfigs } from "@lebara/ui/src/configs/globalConfigs";
import LebaraText from "@lebara/ui/src/components/LebaraText/LebaraText";
import PdfDialog from "@lebara/ui/src/components/PdfDialog/PdfDialog";
import { useMutation } from "@apollo/client";
import REMOVE_FROM_CART from "../../graphql/REMOVE_FROM_CART";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectMsisdn,
} from "@lebara/ui/src/redux/selectors/userSelectors";
const ExpandableSimPlanCard: React.FC<ExpandableSimPlanCardProps> = ({
  planName,
  previewIcon,
  showProductInformationButton,
  showAddToCart,
  productInformationFile,
  productInformationButtonLabel,
  ctaSelectLabel,
  ctaAddToCartLabel,
  ctaCloseLabel,
  ctaDownloadLabel,
  allowanceList,
  allowanceType,
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
  promotionID,
  promotionMessage,
  promotionPrice,
  promotionData,
  isRemoveFromCart,
  onClose,
  minutesLabel,
  isResponsivePlan
}) => {
  const history = useHistory();
  const [addItemToCart] = useAddToCart();
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const toast = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const msisdn = useSelector(selectMsisdn);
  const handleViewCartClick = () => {
    history.push(isAuthenticated && msisdn ? "/order-details" : "/login");
  };

  let filteredAllowanceList: allowanceListProps = {};
  if ((!allowanceType || allowanceType === '' || allowanceType?.toLowerCase() === 'data')) {
    filteredAllowanceList = (allowanceList && allowanceList.find((list) => list.name && list.name.toLowerCase().includes('data'))) || {};
  } else if (allowanceType && (allowanceType?.toLowerCase() === 'minutes')) {
    filteredAllowanceList = (allowanceList && allowanceList.find((list) => list.name && (!list.name.toLowerCase().includes('data') || !list.name.toLowerCase().includes('national_voice')
      || !list.name.toLowerCase().includes('l2l')))) || {};
    filteredAllowanceList['formatedValue'] = filteredAllowanceList['value'] + ' ' + minutesLabel;
  }

  const handleAddToCart = async () => {
    const description: string | undefined = additionalOffers?.match(/<li>.*?<\/li>/g)?.length ? additionalOffers.replaceAll('\n', '').replaceAll('&nbsp;', '').match(/<li>.*?<\/li>/g)?.map(list => list?.replaceAll(/<li>|<\/li>/g, ''))?.join('+') : additionalOffers;
    setIsButtonDisabled(true);
    if (isRemoveFromCart) {
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
        try {
          await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), Number(cost?.replaceAll(',','.') || ''), "addon");
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
        }catch(e){

        }
        break;
      }
      case OfferTypes.PREPAID:
      case OfferTypes.POSTPAID: {
        try {
          isRemoveFromCart && onClose ? onClose() : history.push(isAuthenticated && msisdn ? "/order-details" : "/lebara-sim-choice");
          await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), Number(cost?.replaceAll(',', '.') || ''), "plan");
        }catch(e){
          
        }
      }
    }
    setIsButtonDisabled(false);
  };
  return (
    <>
      {promotionMessage && (
        <Box
          bgColor="#FF3182"
          color="white"
          px="32px"
          py="12px"
          textAlign="center"
          borderTopRightRadius="md"
          borderTopLeftRadius="md"
        >
          <LebaraText type="caption" fontWeight="500" fontSize="12px">
            {promotionMessage}
          </LebaraText>
        </Box>
      )}
      <Flex
        flexDirection="column"
        background="white"
        borderRadius={isRelatedPlan || promotionPrice ? undefined : "lg"}
        borderBottomRadius={promotionPrice ? "lg" : undefined}
        boxShadow={
          isRelatedPlan ? undefined : "0px 4px 4px rgba(0, 0, 0, 0.05)"
        }
        px={isRelatedPlan ? undefined : { base: "15px", lg: "27.23px" }}
        pt={promotionPrice ? "8px" : "12px"}
        pb="8px"
      >
        <Box>
          {planName && (
            <Text color="primary.500" fontWeight="bold" textAlign="left">
              {planName}
            </Text>
          )}
        </Box>
        <PdfDialog
          fileName={productInformationFile || ""}
          isOpen={isPdfDialogOpen}
          onClose={() => setIsPdfDialogOpen(false)}
          ctaCloseLabel={ctaCloseLabel}
          ctaDownloadLabel={ctaDownloadLabel}
        />

        <PlanDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          planName={planName}
          price={(cost || '')}
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
        <Flex justifyContent="space-between"
            direction={promotionPrice ? "row" : "row"}
            alignItems={promotionData ? "flex-end" : "initial"}>
          <Flex
            justifyContent="space-between"
            gridGap="12px"
            direction={promotionData ? "row" : "column"}
            alignItems={promotionData ? "flex-end" : "flex-start"}
            width={
              isResponsivePlan ? { base: "initial", lg: "275px" } : "initial"
            }
          >
            <Box
              display={promotionData ? "flex" : "initial"}
              alignItems={"center"}
            >
              {promotionData && (
                <Text
                  as="h3"
                  fontSize={32}
                  pr="6px"
                  pl="2px"
                  fontWeight="bold"
                  color="secondary.500"
                  fontFamily="Chiswick Grotesque Lebara"
                >
                  {promotionData}
                </Text>
              )}
              <Text
                as="h3"
                fontSize={promotionData ? "16px" : "32px"}
                pr="6px"
                pl="2px"
                fontWeight={promotionData ? "normal" : "bold"}
                color="secondary.500"
                textDecoration={promotionData ? "line-through" : "initial"}
                fontFamily="Chiswick Grotesque Lebara"
              >
                {filteredAllowanceList.formatedValue}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="baseline" color="primary.600" direction="column" paddingTop={"7px"}>
            {promotionPrice && (
              <Text
                as="h3"
                fontSize={16}
                pr="6px"
                pl="2px"
                color="secondary.500"
                fontWeight="normal"
                textDecoration="line-through"
              >
                {cost} {globalConfigs.currencySymbol}
              </Text>
            )}
            <Box display="flex" alignItems="center">
              {promotionPrice ? (
                <Text
                  as="h3"
                  fontSize={24}
                  pr="6px"
                  pl="2px"
                  color="secondary.500"
                  fontWeight={500}
                >
                  {promotionPrice} {globalConfigs.currencySymbol}
                </Text>
              ) : (
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
              )}
              {!(offerType === OfferTypes.BOLTON) ? <Text as="p" fontSize={14} color="lightenPrimary.150">
                {" "}
                {validity && `/ ${validity}`}
              </Text> : ''}
            </Box>
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
        {productInformationFile && productInformationButtonLabel && (offerType !== OfferTypes.BOLTON) && (
          <Text
            onClick={() => setIsPdfDialogOpen(true)}
            cursor="pointer"
            color="grey.200"
            textDecorationLine="underline"
            fontSize={12}
            lineHeight="17px"
            pt={promotionMessage ? "10px" : "59px"}
          >
            {productInformationButtonLabel}
          </Text>
        )}

        {!isRelatedPlan && <Divider my={3.5} pb={!promotionID && showAddToCart ? "52px" : 0}/>}
        <Flex
          mt={isRelatedPlan ? 3.5 : undefined}
          justifyContent="space-between"
          alignItems="center"
          color="primary"
          gridGap="16px"
          direction={isResponsivePlan ? { base: "row", lg: "column" } : "row"}
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
    </>
  );
};

export default ExpandableSimPlanCard;
