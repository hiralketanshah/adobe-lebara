import { gql } from "@apollo/client";

export default gql`
  query authenticateUserSPS($email: String!, $password: String!) {
    authenticateUserSPS(
      email: $email
      password: $password
      country: "DE"
      channel: "Web"
    )
  }
`;
