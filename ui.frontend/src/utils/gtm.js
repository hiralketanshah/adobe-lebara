export function googleAnalytics(event, obj) {
  return event
    ? window?.dataLayer.push({
        event,
        ecommerce: obj,
      })
    : window?.dataLayer.push(obj);
}
export function googleAnalyticsCheckout(step) {
  return window?.dataLayer.push({
    event: "EEcheckout",
    ecommerce: {
      checkout: {
        actionField: { step },
      },
    },
  });
}
export function googleAnalyticsTransaction(products, orderId, voucherCode) {
  let totalPrice = 0.0;
  let isAnyFreeSim = false;
  const transactionProducts = products?.map((product) => {
    totalPrice += product.price;
    isAnyFreeSim = product.isFreeSim ? true : isAnyFreeSim;
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
      }/${product.duration}///${
        product.isPrepaid
          ? `${product.details[1]} - ${product.details[2]} - ${product.details[3]}`
          : ""
      }`,
      variant: "DE",
      quantity: 1,
    };
  });
  return window?.dataLayer.push({
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
          dimension15: isAnyFreeSim ? "FreeSim" : "NoSim",
        },
        products: transactionProducts,
      },
    },
  });
}
