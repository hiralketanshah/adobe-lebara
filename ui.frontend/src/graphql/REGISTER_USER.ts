import { gql } from "@apollo/client";

export default gql`
  mutation ($userInput: UserInput!) {
    registerUser(input: $userInput) {
      email
      msisdn
      crmId
    }
  }
`;
