import { gql } from "@apollo/client";
import { globalConfigs } from "@lebara/core/configs/globalConfigs";

export default gql`
  query authenticateUserSPS($email: String!, $password: String!) {
    authenticateUserSPS(
      email: $email
      password: $password
      country: "${globalConfigs.country}"
      channel: "Web"
    )
    {
      msisdn
      crmId
    }
  }
`;
