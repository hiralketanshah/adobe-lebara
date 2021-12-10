import { gql } from "@apollo/client";

export default gql`
  query getOrderHistory($channel: String!, $country: String!) {
    getOrderHistory(channel: $channel, country: $country) {
      orderId
      paymentStatus
      country
      channel
      actualAmount
      discountedAmount
      epcPromotionId
      created
      orderProducts {
        productId
        productType
        status
        associatedMsisdn
        fulFilledTime
        isFulFilled
        epcPromotionId
      }
    }
  }
`;
