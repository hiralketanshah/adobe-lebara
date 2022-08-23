import { gql } from "@apollo/client";

export default gql`
  query getSessionStatus {
    getSessionStatus {
      email
      msisdn
      crmId
    }
  }
`;
