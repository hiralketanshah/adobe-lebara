import { gql } from "@apollo/client";

export default gql`
  query getPlanChangeRequest($msisdn: String!) {
    getPlanChangeRequest(msisdn: $msisdn) {
      id
      msisdn
      contractId
      oldOcsOfferingId
      newOcsOfferingId
      effectiveDate
      createdAt
      statusId
    }
  }
`;
