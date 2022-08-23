import { gql } from "@apollo/client";

export default gql`
  mutation ($itemId: String!) {
    removeProduct(item_id: $itemId) {
      id
      items {
        id
        product {
          name
          sku
          price {
            regularPrice {
              amount {
                currency
                value
              }
            }
          }
        }
        quantity
      }
    }
  }
`;
