import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import ProgressStep from "../components/ProgressStep/ProgressStep";
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

const OrderDetailsRoute: React.FC<OrderDetailsProps> = ({ ...props }) => {
  const { selectedProductLabel, grandTotalLabel, applyVoucherLabel, enterVoucherCodeLabel, consentLabel, steps,
    paymentButtonLabel, phoneNumberLabel, viewPlansLabel, showDetailsLabel, removeLabel, autoRenewDesc, autoRenewLabel,
    voucherCodeExpiredMessage, voucherCodeInvalidMessage, addVoucherCodeLabel, privacyPolicyLabel, privacyPolicyLink, voucherCodeDiscountLabel,
    emptyCartLink, deleteCartItemDesc, deleteCartItemTitle, deleteCartItemNoButtonLabel, deleteCartItemYesButtonLabel,
    topUpCapDesc, topUpCapLabel, topUpCreditLabel, topUpRecommendedLabel } = props;
  const [removeFromCartApi] = useMutation(REMOVE_FROM_CART);
  const dispatch = useDispatch();
  const history = useHistory();
  const location =
    useLocation<{ phoneNumber?: string; email?: string; isGuest?: boolean }>();
  const phoneNumber = location.state?.phoneNumber;
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
  const [itemToRemove, setItemToRemove] =
    React.useState<{ magentoId?: string; type: string; title: string }>();
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
        history.replace((emptyCartLink || ''), {
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
  const handleSelectPrice = (magentoId?: string, amount?: number) => {
    removeFromCartApi({
      variables: {
        itemId: magentoId,
      },
    }).then(() => {
      addToCartApi({
        variables: {
          productInput: {
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
      history.replace((emptyCartLink || ''), {
        selectedType: "plan",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartItemsLoading]);

  const type =
    itemToRemove?.type === "data"
      ? "Top Up"
      : itemToRemove?.title === "Bolt-on"
        ? "Add-on"
        : "Plan";
  if (isCartItemsLoading) {
    return null;
  }
  return (
    <BuyPlanLayout maxW="846px" paymentButtonLabel={paymentButtonLabel}>
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
      <ProgressStep
        activeStepIndex={0}
        steps={steps || []}
      />
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
              isAddon={t.isAddon}
              magentoId={t.magentoId}
              description={t.description}
              price={t.price}
              attributes={t.details}
              id={t.id}
              viewPlansLabel={viewPlansLabel}
              showDetailsLabel={showDetailsLabel}
              removeLabel={removeLabel}
              autoRenewDesc={autoRenewDesc}
              autoRenewLabel={autoRenewLabel}
              onRemove={async (magentoId, noConfirmation) => {
                if (noConfirmation) {
                  await handleRemoveItemFromCart(magentoId, "plan");
                } else {
                  setItemToRemove({
                    magentoId,
                    type: "plan",
                    title: t.duration,
                  });
                  setIsDeleteDialogOpen(true);
                }
              }}
              //should be replaced by AEM CF data
              options={[
                [
                  {
                    title: "100 International minutes",
                    description: "41 Countries",
                  },
                ],
                [
                  {
                    title: "Lebara to Lebara",
                    description:
                      "Unlimited mins and texts to UK Lebara numbers",
                  },
                ],
              ]}
            />
          ))}
        {cartItems
          .filter((t) => t.isTopUp)
          .map((t) => (
            <SelectedTopUpCreditCard
              topUpCapDesc={topUpCapDesc}
              topUpCapLabel={topUpCapLabel}
              topUpCreditLabel={topUpCreditLabel}
              removeLabel={removeLabel}
              autoRenewLabel={autoRenewLabel}
              autoRenewDesc={autoRenewDesc}
              magentoId={t.magentoId}
              onRemove={(magentoId) => {
                // handleRemoveItemFromCart(magentoId, "data")
                setItemToRemove({ magentoId, type: "data", title: t.duration });
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
      </Flex>
    </BuyPlanLayout>
  );
};
export default OrderDetailsRoute;
