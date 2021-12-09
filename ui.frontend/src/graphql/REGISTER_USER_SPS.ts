import { gql } from "@apollo/client";
import { globalConfigs } from "@lebara/ui/src/configs/globalConfigs.js";

export default gql`
  mutation registerUserSPS($email: String!, $password: String!) {
    registerUserSPS(
      email: $email
      password: $password
      channel: "Web"
      country: "${globalConfigs.country}"
    )
  }
`;
