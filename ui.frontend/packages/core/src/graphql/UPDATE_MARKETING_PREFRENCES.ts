import { gql } from "@apollo/client";

export default gql`
  mutation updateMarketingPrefrences(
    $marketingPrefrences: MarketingPrefrencesInput
  ) {
    updateMarketingPrefrences(
      country: "DE"
      channel: "Web"
      marketingPrefrences: $marketingPrefrences
    ) {
      status
      exceptionCode
      exceptionDetails
    }
  }
`;
