import { gql } from "@apollo/client";

export default gql`
  query getRelatedOffers(
    $country: String!
    $channel: String!
    $currentOfferId: String!
    $noOfOffers: Int!
  ) {
    getRelatedOffers(
      country: $country
      channel: $channel
      currentOfferId: $currentOfferId
      noOfOffers: $noOfOffers
    ) {
      offerId
      name
      validity
      cost
      allowances {
        allowanceValue
        account {
          name
          unit {
            abbreviation
          }
        }
      }
    }
  }
`;
