import { gql } from "@apollo/client";

export default gql`
  mutation changeEmail($crmId: String!, $newEmail: String!) {
    changeEmail(crmId: $crmId, newEmail: $newEmail)
  }
`;
