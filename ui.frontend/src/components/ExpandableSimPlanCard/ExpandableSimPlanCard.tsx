import { Box, Divider, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ExpandableSimPlanCardProps } from "./types";
import OfferTypes from "./types";
import Button from "@lebara/ui/src/components/Button/Button";
import PlanDetailsDialog from "../PlanDetailsDialog/PlanDetailsDialog";
import { allowanceListProps } from "../ExpandablePlanCard/types";
import { useHistory, useLocation } from "@lebara/ui/src/hooks/useHistory";
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
  selectEmail,
  selectLogout,
} from "@lebara/ui/src/redux/selectors/userSelectors";
import { useApolloClient } from "@apollo/client";
import GET_PERSONAL_DETAILS from "@lebara/ui/src/graphql/GET_PERSONAL_DETAILS";
import { hasMissingDetails } from "@lebara/ui/src/components/NewPostpaidNumber/utils";
import moment from "moment";
import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import { useDispatch } from "react-redux";
import { ReduxState } from "@lebara/ui/src/redux/types";
import PlanNotEligibleDialog from "@lebara/ui/src/components/PlanNotEligibleDialog/PlanNotEligibleDialog";
import { isPromotionalAmount } from "@lebara/ui/src/redux/actions/cartActions";
import AttachSimModels from "@lebara/ui/src/components/AttachSim/AttachSimModels";
import { selectIsLoading } from "@lebara/ui/src/redux/selectors/loadingSelectors";
const ExpandableSimPlanCard: React.FC<ExpandableSimPlanCardProps> = ({
  planName,
  previewIcon,
  channels,
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
  isResponsivePlan,
  autoRenew,
  textAlignment,
  showModelOnAddtoCart
}) => {
  const history = useHistory();
  const location = useLocation<{}>();
  const [addItemToCart] = useAddToCart();
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const toast = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const [isFailedtoAddOpen, setIsFailedtoAddOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const msisdn = useSelector(selectMsisdn);
  const isLoading = useSelector(selectIsLoading);
  const isLogout = useSelector(selectLogout);
  const [isAttachSim, setAttachSim] = useState(false);
  const client = useApolloClient();
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: ReduxState) => state?.cart?.items);
  const handleViewCartClick = () => {
    history.push(isAuthenticated && msisdn ? "/order-details" : "/login");
  };
  const isCenterAligned: boolean = (textAlignment === "center");
  let filteredAllowanceList: allowanceListProps = {};
  const dataAllowanceType: allowanceListProps | undefined = allowanceList && allowanceList.find((list) => list.name && list.name.toLowerCase().includes('data'));
  if (dataAllowanceType) {
    filteredAllowanceList = dataAllowanceType;
  } else {
    filteredAllowanceList = (allowanceList && allowanceList.find((list) => list.name && (!list.name.toLowerCase().includes('data') || !list.name.toLowerCase().includes('national_voice')
      || !list.name.toLowerCase().includes('l2l')))) || {};
  }
  const handleToastView = async (description: string) => {
    const updatedAddtoCart: string = addedtoCartLabel?.replace('{0}', planName) || '';
    try {
      await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), Number(cost?.replaceAll(',', '.') || ''), "addon");
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
              style={{ whiteSpace: "normal" }}
              colorScheme="secondary"
              onClick={handleViewCartClick}
            >
              {viewCartLabel}
            </Button>
          </Flex>
        ),
      });
    } catch (e) {

    }
  };
  const handleAddToCart = async () => {
    const isLoggedInUser: boolean = !!(isAuthenticated && msisdn);
    const description: string | undefined = additionalOffers?.match(/<li>.*?<\/li>/g)?.length ? additionalOffers.replaceAll('\n', '').replaceAll('&nbsp;', '').match(/<li>.*?<\/li>/g)?.map(list => list?.replaceAll(/<(.|\n)*?>/g, ''))?.join(' + ') : additionalOffers;
    setAttachSim(false);
    setIsButtonDisabled(true);
    if (isAuthenticated && !isLoading && !msisdn && !isLogout && showModelOnAddtoCart) {
      setAttachSim(true);
      setIsButtonDisabled(false);
      return;
    }
    setAttachSim(false);
    if (isRemoveFromCart) {
      await removeFromCartApi({
        variables: {
          itemId: id,
        },
      });
    }
    dispatch(isPromotionalAmount(promotionPrice));
    switch (offerType) {
      case OfferTypes.BOLTON: {
        if (cartItems?.some(item => !!item.isPostPaid)) {
          setIsFailedtoAddOpen(true);
        } else {
          handleToastView(description || "");
        }
        break;
      }
      case OfferTypes.TOPUP: {
        handleToastView(description || "");
        break;
      }
      case OfferTypes.PREPAID: {
        try {
          await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), Number(cost?.replaceAll(',', '.') || ''), "plan", true, undefined, undefined, autoRenew);
          isRemoveFromCart && onClose ? onClose() : history.push(isLoggedInUser ? "/order-details" : new URLSearchParams(location.search).has("aid") ? "/mobile-number-from-another-operator-choice" : "/lebara-sim-choice");
        } catch (e) {

        }
        break;
      }
      case OfferTypes.POSTPAID: {
        try {
          await addItemToCart(parseInt(id || ''), planName, (JSON.stringify(description || '')), Number(cost?.replaceAll(',', '.') || ''), "postpaid", true, undefined, undefined, autoRenew);
          isRemoveFromCart && onClose ? onClose() : isLoggedInUser ? client
            .query({ query: GET_PERSONAL_DETAILS })
            .then((personalDetailsRes) => {
              const personalDetails =
                personalDetailsRes.data.getPersonalDetails;
              if (hasMissingDetails(personalDetails)) {
                history.push("/postpaid-missing-details");
                return;
              }

              history.push("/postpaid/preview", {
                personalDetails: {
                  firstName: personalDetails?.name?.firstName,
                  lastName: personalDetails?.name?.lastName,
                  emailId: email,
                  streetName: personalDetails?.addresses[0].street || "",
                  houseNumber:
                    personalDetails?.addresses[0].houseNumber || "",
                  townCity: personalDetails?.addresses[0].city || "",
                  zipCode: personalDetails?.addresses[0].postCode || "",
                  addressLabel:
                    personalDetails?.addresses?.length > 0
                      ? `${personalDetails.addresses[0].street} ${
                          personalDetails?.addresses[0].houseNumber || ""
                        }, ${personalDetails.addresses[0].city}, ${
                          personalDetails.addresses[0].postCode
                        }, Germany`
                      : undefined,
                },
                portIn: {
                  dob: personalDetails?.dateOfBirth
                    ? moment
                        .utc(personalDetails?.dateOfBirth)
                        .format("DD/MM/YYYY")
                    : "",
                },
              });
            })
            .finally(() => {
              dispatch(setLoading(false));
            }) : history.push("/postpaid/details");
        } catch (e) {

        }
      }
    }
    setIsButtonDisabled(false);
  };
  if(channels?.length === 1 && channels?.includes("app")){
    return <></>;
  }
  return (
    <>
    {isAttachSim && showModelOnAddtoCart && <AttachSimModels />}
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
        minH={promotionMessage ? '86.7%': '100%'}
      >
        <Box>
          {planName && (
            <Text color="primary.500" fontWeight="bold" textAlign={textAlignment || "left"}>
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
        <PlanNotEligibleDialog
          open={isFailedtoAddOpen}
          onClose={() => setIsFailedtoAddOpen(false)}
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
            {...isCenterAligned ? {flexDirection:"column"} : {}}
            direction={promotionPrice ? "row" : "row"}
            alignItems={promotionData ? "flex-end" : isCenterAligned ? "center" : "initial"}>
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
                  whiteSpace={'nowrap'}
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
                whiteSpace={'nowrap'}
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
                whiteSpace={'nowrap'}
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
                  whiteSpace={'nowrap'}
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
                  whiteSpace={'nowrap'}
                  pl="2px"
                  color="secondary.500"
                  fontWeight={500}
                >
                  {cost} {globalConfigs.currencySymbol}
                </Text>
              )}
              {!(offerType === OfferTypes.BOLTON) ? <Text as="p" fontSize={14}  whiteSpace={'nowrap'} color="lightenPrimary.150">
                {" "}
                {validity && `/ ${validity}`}
              </Text> : ''}
            </Box>
          </Flex>
        </Flex>
        {additionalOffers && (
          <Box mt="7px" color="primary.700" flexGrow={1}>
            {additionalOffers.match(/<li>.*?<\/li>/g)?.length ? additionalOffers.match(/<li>.*?<\/li>/g)?.map((t) => (
              <Flex width="100%" alignItems="center" mb={1}>
                {previewIcon}
                <Text ml="8px" textAlign="left" dangerouslySetInnerHTML={{ __html: t.replace(/<li>|<\/li>/g, '') }}></Text>
              </Flex>
            )) : <Flex width="100%" alignItems="center" mb={1}>
              <Text ml="8px" textAlign="left" dangerouslySetInnerHTML={{ __html: additionalOffers }}></Text>
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
          {...isCenterAligned ? {flexDirection:"column"} : {}}
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
