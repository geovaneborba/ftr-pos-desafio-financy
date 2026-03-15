import { gql } from '@apollo/client';

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      description
      date
      amountInCents
      userId
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        icon
        color
      }
    }
  }
`;
