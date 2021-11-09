import { gql } from "@apollo/client";
import { globalConfigs } from "../GlobalConfigs";

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
