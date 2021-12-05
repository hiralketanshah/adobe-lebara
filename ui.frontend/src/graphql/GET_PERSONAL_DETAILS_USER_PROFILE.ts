import { gql } from "@apollo/client";

export default gql`
  query getPersonalDetails($msisdn: String!, $country: String!) {
    getPersonalDetails(msisdn: $msisdn, country: $country) {
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
