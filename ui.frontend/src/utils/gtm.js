export function googleAnalytics(event, obj, disableEcommerce) {
  if (process.env.REACT_APP_DISABLE_GOOGLE_ANALYTICS === "true") {
    return undefined;
  }
  if (disableEcommerce) {
    return window?.dataLayer?.push({
      event,
      ...obj,
    });
  }
  return event
    ? window?.dataLayer?.push({
        event,
        ecommerce: obj,
      })
    : window?.dataLayer?.push(obj);
}
function getTypes(products){
  return products.map((t) =>
    t.isPostPaid
      ? "Post Paid"
      : t.isPrepaid && t.isAutoRenew
      ? "SIMO"
      : t.isPrepaid && !t.isAutoRenew
      ? "Bundle"
      : t.isAddon
      ? "Add Ons"
      : t.isTopUp || t.isFreeSimTopup || t.isFreeSimTopup
      ? "PAYG"
      : t.isFreeSim
      ? "Free SIM"
      : "Other"
  );
}
export function googleAnalyticsCheckout(eventName, step, cartItems) {
  if (process.env.REACT_APP_DISABLE_GOOGLE_ANALYTICS === "true") {
    return undefined;
  }

  const products = cartItems?.map((product) => ({
    id: product?.id,
    name: product?.duration,
    price: product?.price,
    brand: "Lebara", //  Constant
    category: `${
      product?.isPrepaid || product?.isPostPaid
        ? "plan"
        : product?.isFreeSim
        ? "sim"
        : product?.isTopUp
        ? "topup"
        : "bolton"
    }/${product?.duration}//${product.promotionId}/${
      product?.isPrepaid || product?.isPostPaid
        ? `${product.details[1]}`?.split("+")?.[0].concat(` - ${product.details?.[2]} - ${product.details?.[3]}`)
        : product?.isAddon
        ? `${product.details?.[1]}`.split("+")?.[0]
        : ""
    }`,
    variant: getTypes(cartItems).join(" - "),
    position: 1,
  }));

  return window?.dataLayer?.push({
    event: eventName,
    ecommerce: {
      currencyCode: "EUR",
      checkout: {
        actionField: { step },
        products,
      },
    },
  });
}
export function googleAnalyticsTransaction(
  products,
  orderId,
  voucherCode,
  paymentMethod,
  isNewNumber
) {
  if (process.env.REACT_APP_DISABLE_GOOGLE_ANALYTICS === "true") {
    return undefined;
  }

  let totalPrice = 0.0;
  const isAnyFreeSim = products?.some((t) => t.isFreeSim);
  const transactionProducts = products?.map((product) => {
    totalPrice += product.price;
    return {
      id: product.id, // Product SKU
      name: product.duration,
      price: product.price,
      brand: "Lebara",
      category: `${
        product.isPrepaid || product.isPostPaid
          ? "plan"
          : product.isFreeSim
          ? "sim"
          : product.isTopUp || product.isFreeSimTopup
          ? "topup"
          : "bolton"
      }/${product.duration}//${product.promotionId}/${
        product.isPrepaid
          ? `${product.details[1]}`?.split("+")?.[0].concat(` - ${product.details?.[2]} - ${product.details?.[3]}`)
          : product.isAddon
          ? `${product.details?.[1]}`.split("+")?.[0]
          : ""
      }`,
      variant: getTypes(products).join(" - "),
      position: 1,
    };
  });
  return window?.dataLayer?.push({
    event: "EEtransaction",
    ecommerce: {
      currencyCode: "EUR",
      purchase: {
        actionField: {
          id: `ML${orderId}`, // transaction ID - mandatory
          affiliation: "", // Can be left blank
          revenue: totalPrice, // total including tax and shipping
          tax: "0", // constant leave as 0
          shipping: "0", // constant leave as 0
          coupon: voucherCode, // if a coupon code was used for this order
          dimension15:
            (isAnyFreeSim || isNewNumber) && totalPrice > 0
              ? "Paid Sim"
              : isAnyFreeSim
              ? "Free Sim"
              : "No Sim",
          dimension16: paymentMethod,
          dimension17: getTypes(products).join(" - "),
        },
        products: transactionProducts,
      },
    },
  });
}
