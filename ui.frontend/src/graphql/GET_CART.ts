import { gql } from "@apollo/client";

export default gql`
  query Cart {
    getCart {
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
