import { gql } from "@apollo/client";

export default gql`
  mutation verifyOTPAndLinkMsisdn($otpCode: String!, $msisdn: String!) {
    verifyOTPAndLinkMsisdn(
      otpCode: $otpCode
      msisdn: $msisdn
      channel: "Web"
      country: "DE"
    )
  }
`;
