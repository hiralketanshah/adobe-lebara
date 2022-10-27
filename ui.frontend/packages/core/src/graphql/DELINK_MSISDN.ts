import { gql } from "@apollo/client";

export default gql`
  mutation delinkMsisdn($msisdn: String) {
    delinkMsisdn(msisdn: $msisdn, channel: "Web", country: "DE") {
      token
    }
  }
`;
