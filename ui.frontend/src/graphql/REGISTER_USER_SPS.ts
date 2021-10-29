import { gql } from "@apollo/client";

export default gql`
  mutation registerUserSPS($email: String!, $password: String!) {
    registerUserSPS(
      email: $email
      password: $password
      channel: "Web"
      country: "DE"
    )
  }
`;
