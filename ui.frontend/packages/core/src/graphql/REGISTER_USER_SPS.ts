import { gql } from "@apollo/client";
import { globalConfigs } from "@lebara/core/configs/globalConfigs";

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
