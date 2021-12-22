import { gql } from "@apollo/client";

export default gql`
  query getPersonalDetails($country: String!) {
    getPersonalDetails(country: $country) {
      name {
        firstName
        lastName
      }
      addresses {
        street
        city
        postCode
        houseNumber
      }
      contact
      marketingConsent {
        phone
        sms
        email
      }
    }
  }
`;
