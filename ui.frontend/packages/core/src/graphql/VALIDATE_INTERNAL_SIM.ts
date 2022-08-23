import { gql } from "@apollo/client";

export default gql`
  query validateGuestLogin($msisdn: String!, $country: String!) {
    validateGuestLogin(msisdn: $msisdn, country: $country)
  }
`;
