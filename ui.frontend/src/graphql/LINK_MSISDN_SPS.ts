import { gql } from "@apollo/client";

export default gql`
  mutation sendSMSOTP($msisdn: String!) {
    sendSMSOTP(msisdn: $msisdn, channel: "Web", country: "DE")
  }
`;
