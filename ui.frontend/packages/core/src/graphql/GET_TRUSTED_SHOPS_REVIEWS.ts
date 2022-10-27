import { gql } from "@apollo/client";

export default gql`
  query getTrustedShopsReviews($page: Int, $betterThan: Int) {
    getTrustedShopsReviews(page: $page, betterThan: $betterThan) {
      creationDate
      description
      stars
    }
  }
`;
