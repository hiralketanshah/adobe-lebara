import { gql } from "@apollo/client";

export default gql`
  query ($code: String!) {
    validateVoucher(code: $code) {
      status
      discountValue
    }
  }
`;
