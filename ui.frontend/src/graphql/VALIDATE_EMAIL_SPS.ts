import { gql } from "@apollo/client";

export default gql`
  query validateEmailSPS($email: String!) {
    validateEmailSPS(email: $email, channel: "Web")
  }
`;
