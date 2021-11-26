import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import ExpandablePlanCardCheckout from "../components/ExpandablePlanCardCheckout/ExpandablePlanCardCheckout";
import Voucher from "../components/Voucher/Voucher";
import Checkbox from "../components/Checkbox/Checkbox";
import { ReduxState } from "../redux/types";
import PurchaseSummary from "../components/PurchaseSummary/PurchaseSummary";
import BuyPlanLayout from "../layouts/BuyPlanLayout";
import REMOVE_FROM_CART from "../graphql/REMOVE_FROM_CART";
import { loadInitialCart } from "../redux/actions/cartActions";
import mapMagentoProductToCartItem from "../utils/mapMagentoProductToCartItem";
import SelectedTopUpCreditCard from "../components/SelectedTopUpCreditCard/SelectedTopUpCreditCard";
import ADD_TO_CART from "../graphql/ADD_TO_CART";
import DeleteCartItemDialog from "../components/DeleteCartItemDialog/DeleteCartItemDialog";
import { selectVoucher } from "../redux/actions/selectVoucherActions";
import Select from "../components/Select/Select";
import DataFreeSimTopUpCreditCard from "../components/FreeSimTopUpCreditCard/FreeSimTopUpCreditCard";
import { OrderDetailsProps } from "../layouts/types";
import { globalConfigs as GC, globalConstants as GCST } from "../GlobalConfigs";
import {
  selectIsAuthenticated,
  selectMsisdn,
} from "../selectors/userSelectors";
import { CartItem } from "../redux/types/cartTypes";
import useMissingDetails from "../hooks/useMissingDetails";
const OrderDetailsRoute: React.FC<OrderDetailsProps> = ({ ...props }) => {
  const { selectedProductLabel, grandTotalLabel, applyVoucherLabel, enterVoucherCodeLabel, consentLabel,
    paymentButtonLabel, phoneNumberLabel, viewPlansLabel, showDetailsLabel, removeLabel, autoRenewDesc, autoRenewLabel,
    voucherCodeExpiredMessage, voucherCodeInvalidMessage, addVoucherCodeLabel, privacyPolicyLabel, privacyPolicyLink, voucherCodeDiscountLabel,
    deleteCartItemDesc, deleteCartItemTitle, deleteCartItemNoButtonLabel, deleteCartItemYesButtonLabel,
    topUpCapDesc, topUpCapLabel, topUpCreditLabel, topUpRecommendedLabel, paymentMethodLabel, selectPlanLabel,
    addonsTitle, plansTitle, personalDetailsLabel, nameLabel, emailLabel, mobileNumberLabel, shippingAddressLabel,
    editLabel, missingInfoLabel } = props;
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const dispatch = useDispatch();
  const history = useHistory();
  const userMsisdn = useSelector(selectMsisdn);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation<{
    phoneNumber?: string;
    email?: string;
    isGuest?: boolean;
    personalDetails?: any;
  }>();
  const phoneNumber = location.state?.phoneNumber || userMsisdn;
  const isGuest = location?.state?.isGuest;
  const voucherCode = useSelector(
    (state: ReduxState) => state.voucher.voucherCode
  );
  const [addToCartApi] = useMutation(ADD_TO_CART);

  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const isCartItemsLoading = useSelector(
    (state: ReduxState) => state.cart.loading
  );
  const topUpOptions = useSelector((state: ReduxState) => state.topUps.items);

  let items = cartItems.map((t) => ({
    description: t.duration.includes("Top-up") ? (topUpCreditLabel || '') : t.duration,
    amount: t.price,
  }));
  const allItemsAreFree = cartItems.every((t) => t.price === 0);
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);
  const [itemToRemove, setItemToRemove] = React.useState<{
    magentoId?: string;
    type: string;
    title: string;
    item: CartItem;
  }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const handleRemoveItemFromCart = (magentoId?: string, type?: string) =>
    removeFromCartApi({
      variables: {
        itemId: magentoId,
      },
    }).then((res) => {
      dispatch(
        loadInitialCart(
          mapMagentoProductToCartItem(res.data.removeProduct.items)
        )
      );
      if (res.data.removeProduct.items.length === 0) {
        history.replace((GC.journeyPages[GCST.EMPTY_CART] || ''), {
          selectedType: type,
        });
      }
    });
  if (voucherCode) {
    items = [
      ...items,
      {
        description: voucherCodeDiscountLabel || '',
        amount: -2,
      },
    ];
  }

  const {
    keepMobileFromAnotherOperator,
    hasPrepaid,
    personalDetails,
    hasPostpaid,
    portIn,
    postpaidPersonalDetails,
    missingDetailsForPrepaid,
    missingDetailsForPostPaid,
  } = useMissingDetails();

  const hasPrepaidData = hasPrepaid && !missingDetailsForPrepaid;
  const hasPostPaidData = hasPostpaid && !missingDetailsForPostPaid
  const handleSelectPrice = (
    magentoId?: string,
    amount?: number,
    isAutoTopUp?: boolean,
    topUpCap?: number
  ) => {
    removeFromCartApi({
      variables: {
        itemId: magentoId,
      },
    }).then(() => {
      addToCartApi({
        variables: {
          productInput: {
            recurring: isAutoTopUp,
            topUpCap,
            product: {
              sku: `${amount}`,
              name: `Top-up${amount}`,
              price: Number(amount),
            },
          },
        },
      }).then((res) => {
        dispatch(
          loadInitialCart(
            mapMagentoProductToCartItem(res.data.addProduct.items)
          )
        );
      });
    });
  };

  React.useEffect(
    () => () => {
      dispatch(selectVoucher(""));
    },
    [dispatch]
  );
  React.useEffect(() => {
    if (!isCartItemsLoading && cartItems.length === 0) {
      history.replace((GC.journeyPages[GCST.EMPTY_CART] || ''), {
        selectedType: "plan",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartItemsLoading]);

  const type =
    itemToRemove?.type === "topup"
      ? "Top Up"
      : itemToRemove?.type === "addon"
        ? "Add-on"
        : "Plan";
  return (
    <BuyPlanLayout maxW="846px" paymentButtonLabel={paymentButtonLabel} paymentMethodLabel={paymentMethodLabel}>
      <DeleteCartItemDialog
        deleteCartItemDesc={deleteCartItemDesc}
        deleteCartItemTitle={deleteCartItemTitle}
        deleteCartItemNoButtonLabel={deleteCartItemNoButtonLabel}
        deleteCartItemYesButtonLabel={deleteCartItemYesButtonLabel}
        topUpCreditLabel={topUpCreditLabel}
        isOpen={isDeleteDialogOpen}
        type={type}
        product={itemToRemove?.title}
        onConfirmDelete={() => {
          handleRemoveItemFromCart(
            itemToRemove?.magentoId,
            itemToRemove?.type
          ).then(() => {
            setIsDeleteDialogOpen(false);
          });
        }}
        onClose={() => {
          setIsDeleteDialogOpen(false);
        }}
      />
      {(hasPrepaidData || hasPostPaidData) && !isGuest && !isAuthenticated && (
        <Accordion allowToggle pt="16px">
          <AccordionItem
            borderWidth={1}
            borderColor={{ base: "white", lg: "greySuccess" }}
            borderRadius="8px"
            bg="white"
          >
            <h2>
              <AccordionButton p="16px" _focus={{ outline: "none" }}>
                <Text
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                  lineHeight="16px"
                  fontSize="16px"
                  letterSpacing="0.5px"
                >
                  {personalDetailsLabel}
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex>
                {hasPrepaidData && (
                  <Box>
                    <Text fontWeight="bold">
                      {nameLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {personalDetails.firstName} {personalDetails.lastName}
                      </Text>
                    </Text>
                    <Text fontWeight="bold">
                      {emailLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {personalDetails.email}
                      </Text>
                    </Text>
                    {portIn.mobileNumber && keepMobileFromAnotherOperator && (
                      <Text fontWeight="bold">
                        {mobileNumberLabel}{" "}
                        <Text fontWeight="normal" d="inline">
                          {portIn.mobileNumber}
                        </Text>
                      </Text>
                    )}
                    <Text fontWeight="bold">
                      {shippingAddressLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {personalDetails.houseNumber}{" "}
                        {personalDetails.streetName} {personalDetails.townCity}{" "}
                        {personalDetails.zipCode}
                      </Text>
                    </Text>
                  </Box>
                )}
                {hasPostpaid && (
                  <Box>
                    <Text fontWeight="bold">
                      {nameLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {postpaidPersonalDetails.firstName}{" "}
                        {postpaidPersonalDetails.lastName}
                      </Text>
                    </Text>
                    <Text fontWeight="bold">
                      {emailLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {postpaidPersonalDetails.email}
                      </Text>
                    </Text>
                    {postpaidPersonalDetails.portInStatus === "Yes" &&
                      postpaidPersonalDetails.portInNumber && (
                        <Text fontWeight="bold">
                          {mobileNumberLabel}{" "}
                          <Text fontWeight="normal" d="inline">
                            {postpaidPersonalDetails.portInNumber}
                          </Text>
                        </Text>
                      )}
                    <Text fontWeight="bold">
                      {shippingAddressLabel}{" "}
                      <Text fontWeight="normal" d="inline">
                        {postpaidPersonalDetails.shippingAddress.label}{" "}
                      </Text>
                    </Text>
                  </Box>
                )}

                <Spacer />
                <Button
                  variant="ghost"
                  p={0}
                  _hover={{ background: "none" }}
                  _active={{ background: "none" }}
                  _focus={{ boxShadow: "none" }}
                  color="greySuccess"
                  onClick={() => {
                    history.push(
                      hasPrepaidData
                        ? (GC.journeyPages[GCST.LEBARA_SIM_CHOICE] || '')
                        : (GC.journeyPages[GCST.POSTPAID_DETAILS] || '')
                    );
                  }}
                >
                  {editLabel}
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
      {phoneNumber && (
        <>
          <Text
            color="primary.500"
            fontWeight="bold"
            fontSize="20px"
            lineHeight="40px"
            pt="12px"
          >
            {phoneNumberLabel}
          </Text>
          <Select
            value={phoneNumber}
            options={[
              {
                key: 1,
                name: phoneNumber,
                value: phoneNumber,
              },
            ]}
          />
        </>
      )}
      <Text
        color="primary.500"
        fontWeight="bold"
        fontSize="20px"
        lineHeight="40px"
        pt="12px"
      >
        {selectedProductLabel}
      </Text>
      <Flex flexDirection="column" gridGap="14px" py="16px">
        {cartItems
          .filter((t) => t.isFreeSimTopup)
          .map((t) => (
            <DataFreeSimTopUpCreditCard
              autoRenewLabel={autoRenewLabel}
              autoRenewDesc={autoRenewDesc}
              topUpCapDesc={topUpCapDesc}
              topUpCapLabel={topUpCapLabel}
              key={t.magentoId}
              isAutoTopUp={t.isAutoTopUp}
              topUpCap={t.topUpCap || t.price}
              removeLabel={removeLabel}
              topUpCreditLabel={topUpCreditLabel}
              topUpRecommendedLabel={topUpRecommendedLabel}
              magentoId={t.magentoId}
              selectedPrice={t.price}
              //prices to be taken from AEM CF
              prices={[5, 10, 20, 30]}
              onRemove={async (magentoId) => {
                await handleRemoveItemFromCart(magentoId, "data");
              }}
            />
          ))}
        {cartItems
          .filter((t) => !t.isTopUp && !t.isFreeSimTopup)
          .map((t) => (
            <ExpandablePlanCardCheckout
              showAutoRenew={!t.isFreeSim}
              hideViewDetails={t.isFreeSim}
              title={t.duration}
              isFreeSim={t.isFreeSim}
              isPostPaid={t.isPostPaid}
              isPrepaid={t.isPrepaid}
              isAddon={t.isAddon}
              magentoId={t.magentoId}
              description={t.description}
              price={t.price}
              attributes={t.details}
              id={t.id}
              viewPlansLabel={viewPlansLabel}
              showDetailsLabel={showDetailsLabel}
              selectPlanLabel={selectPlanLabel}
              removeLabel={removeLabel}
              autoRenewDesc={autoRenewDesc}
              autoRenewLabel={autoRenewLabel}
              addonsTitle={addonsTitle}
              plansTitle={plansTitle}
              missingInfoLabel={missingInfoLabel}
              onRemove={async (magentoId, noConfirmation) => {
                if (noConfirmation) {
                  await handleRemoveItemFromCart(magentoId, "plan");
                } else {
                  setItemToRemove({
                    magentoId,
                    type: t.isAddon ? "addon" : t.isTopUp ? "topup" : "plan",
                    title: t.duration,
                    item: t,
                  });
                  setIsDeleteDialogOpen(true);
                }
              }}
            />
          ))}
        {cartItems
          .filter((t) => t.isTopUp)
          .map((t) => (
            <SelectedTopUpCreditCard
              key={t.magentoId}
              showAutoRenew={!isGuest}
              isAutoTopUp={t.isAutoTopUp}
              topUpCap={t.topUpCap || t.price}
              topUpCapDesc={topUpCapDesc}
              topUpCapLabel={topUpCapLabel}
              topUpCreditLabel={topUpCreditLabel}
              removeLabel={removeLabel}
              autoRenewLabel={autoRenewLabel}
              autoRenewDesc={autoRenewDesc}
              magentoId={t.magentoId}
              onRemove={(magentoId) => {
                // handleRemoveItemFromCart(magentoId, "data")
                setItemToRemove({
                  magentoId,
                  type: "topup",
                  title: t.duration,
                  item: t,
                });
                setIsDeleteDialogOpen(true);
              }}
              onSelectPrice={handleSelectPrice}
              selectedPrice={t.price}
              prices={topUpOptions}
            />
          ))}

        {!allItemsAreFree && <Voucher
          voucherCodeExpiredMessage={voucherCodeExpiredMessage}
          voucherCodeInvalidMessage={voucherCodeInvalidMessage}
          addVoucherCodeLabel={addVoucherCodeLabel}
          applyVoucherLabel={applyVoucherLabel}
          enterVoucherCodeLabel={enterVoucherCodeLabel}
        />}
        <PurchaseSummary items={allItemsAreFree ? [] : items} grandTotalLabel={grandTotalLabel} />
        {!isGuest && !isAuthenticated && (
          <Flex
            px={5}
            py={6}
            backgroundColor="white"
            fontWeight="500"
            borderRadius={8}
            color="grey.300"
          >
            <Checkbox
              isChecked={isMarketingEnabled}
              onChange={(e) => setIsMarketingEnabled(e.target.checked)}
            >
              <Text fontSize="14px">
                <span dangerouslySetInnerHTML={{ __html: (consentLabel && consentLabel.replace(/<p>|<\/p>/g, '')) || '' }} />
                <Link to={privacyPolicyLink} colorScheme="secondary" color="secondary.500">
                  {privacyPolicyLabel}
                </Link>
              </Text>
            </Checkbox>
          </Flex>
        )}
      </Flex>
    </BuyPlanLayout>
  );
};
export default OrderDetailsRoute;
