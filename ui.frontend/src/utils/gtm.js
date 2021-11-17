import { glocalConfigs as GC } from "../GlobalConfigs";
export function googleAnalytics(event, obj) {
   event
    ? window?.dataLayer.push({
        event,
        ecommerce: obj,
      })
    : window?.dataLayer.push(obj);
}
export function googleAnalyticsCheckout(step, cartItems) {
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
    }/${product?.duration}///${
      product?.isPrepaid || product?.isPostPaid
        ? product.details[1]
        : product?.isAddon === "addon"
        ? product.details[1]
        : ""
    }`,
    variant: "DE",
    quantity: 1,
  }));
  try {
    return window?.dataLayer.push({
      event: "EEcheckout",
      ecommerce: {
        checkout: {
          actionField: { step },
          products,
        },
      },
    });
  } catch (err) {
    return null;
  }
}
export function googleAnalyticsTransaction(
  products,
  orderId,
  voucherCode,
  paymentMethod
) {
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
      currencyCode: GC.currencyCode,
      purchase: {
        actionField: {
          id: `ML${orderId}`, // transaction ID - mandatory
          affiliation: "", // Can be left blank
          revenue: totalPrice, // total including tax and shipping
          tax: "0", // constant leave as 0
          shipping: "0", // constant leave as 0
          coupon: voucherCode, // if a coupon code was used for this order
          dimension15: isAnyFreeSim ? "FreeSim" : "NoSim",
          dimension16: paymentMethod,
        },
        products: transactionProducts,
      },
    },
  });
}
