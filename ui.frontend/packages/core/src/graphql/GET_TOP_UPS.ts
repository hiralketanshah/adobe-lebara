import { gql } from "@apollo/client";

export default gql`
  query getCurrentOffers($country: String!) {
    getTopUps(channel: "Web", country: $country)
  }
`;
