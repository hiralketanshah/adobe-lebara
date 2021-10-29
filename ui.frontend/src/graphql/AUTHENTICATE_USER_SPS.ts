import { gql } from "@apollo/client";

export default gql`
  query authenticateUserSPS($email: String!, $password: String!) {
    authenticateUserSPS(email: $email, password: $password) {
      accessToken
      refreshToken
      expiresIn
      email
      msisdn
      crmId
    }
  }
`;
