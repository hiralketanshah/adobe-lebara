import { gql } from "@apollo/client";

export default gql`
  mutation ($item_id: String!, $recurring: Boolean!, $topUpCap: Int) {
    setProductAsRecurring(
      item_id: $item_id
      recurring: $recurring
      topUpCap: $topUpCap
    ) {
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
        recurring
        topUpCap
      }
    }
  }
`;
