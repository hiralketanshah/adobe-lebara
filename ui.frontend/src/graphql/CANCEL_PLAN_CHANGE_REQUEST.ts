import { gql } from "@apollo/client";

export default gql`
  mutation cancelPlanChangeRequest($requestId: Int) {
    cancelPlanChangeRequest(requestId: $requestId)
  }
`;
