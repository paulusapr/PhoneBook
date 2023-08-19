'use client';
import { query } from 'services/apolloClient'
import { gql } from '@apollo/client'

export const CONTACT_QUERY = gql`
  query GetContactList (
    $distinct_on: [contact_select_column!], 
    $limit: Int, 
    $offset: Int, 
    $order_by: [contact_order_by!], 
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on, 
      limit: $limit, 
      offset: $offset, 
      order_by: $order_by, 
      where: $where
    ){
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export type PhoneType = {
  number: string;
};

export type PersonType = {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: PhoneType[];
};

export const getContact = () => {
  return query<{ contact: PersonType }>(CONTACT_QUERY);
};
