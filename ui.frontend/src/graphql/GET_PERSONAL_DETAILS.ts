import { gql } from "@apollo/client";

export default gql`
  query {
    getPersonalDetails(country: "DE") {
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
      dateOfBirth
    }
  }
`;
