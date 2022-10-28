import { gql } from "@apollo/client";

export default gql`
  mutation changePassword(
    $channel: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      channel: $channel
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;
