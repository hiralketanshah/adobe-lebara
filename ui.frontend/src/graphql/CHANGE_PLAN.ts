import { gql } from "@apollo/client";

export default gql`
  mutation changePlan($msisdn: String!, $existingPlan: Int!, $newPlan: Int!) {
    changePlan(
      msisdn: $msisdn
      existingPlan: $existingPlan
      newPlan: $newPlan
      channel: "Web"
    ) {
      id
    }
  }
`;
