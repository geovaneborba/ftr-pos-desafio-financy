import { gql } from '@apollo/client';

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction(
    $transactionId: String!
    $data: UpdateTransactionInput!
  ) {
    updateTransaction(transactionId: $transactionId, data: $data) {
      type
      description
      date
      amountInCents
      categoryId
    }
  }
`;
