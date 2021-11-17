import { gql } from "@apollo/client";
import { globalConfigs } from "../GlobalConfigs";

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
