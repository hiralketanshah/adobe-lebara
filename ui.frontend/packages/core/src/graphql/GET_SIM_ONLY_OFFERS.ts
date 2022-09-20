import { gql } from "@apollo/client";

export default gql`
  query getSimOnlyOffers($country: String!) {
    getSimOnlyOffers(channel: "Web", country: $country) {
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
