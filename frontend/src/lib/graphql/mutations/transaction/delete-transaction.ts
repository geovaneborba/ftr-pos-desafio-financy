import { gql } from '@apollo/client';

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(transactionId: $transactionId)
  }
`;
