import { query, mutation } from 'services/apolloClient'
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

export const getContact = (page: number) => {
  return query<{ contact: PersonType[] }>(CONTACT_QUERY, { limit: 15, offset: page, order_by: { created_at: 'desc' }});
};

export const ADD_CONTACT_QUERY = gql`
  mutation AddContactWithPhones(
    $first_name: String!,
    $last_name: String!,
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name,
        last_name: $last_name,
        phones: {
          data: $phones
        }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export type PayloadTypes = {
  first_name: string;
  last_name: string;
  phones?: PhoneType[];
}

export const addContact = () => {
  return mutation<any, PayloadTypes>(ADD_CONTACT_QUERY);
};

export const CONTACT_DETAIL_QUERY = gql`
  query GetContactDetail (
    $id: Int!
  ) {
    contact_by_pk(
      id: $id
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

export const getDetailContact = (id: number) => {
  return query<{ contact_by_pk: PersonType }>(CONTACT_DETAIL_QUERY, { id });
};

export const EDIT_CONTACT_QUERY = gql`
  mutation EditContactById(
    $id: Int!,
    $_set: contact_set_input
  ) {
    update_contact_by_pk(
      pk_columns: {id: $id},
      _set: $_set
    ) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export type EditPayloadTypes = {
  id: number;
  _set: PayloadTypes;
}

export const editContact = () => {
  return mutation<any, EditPayloadTypes>(EDIT_CONTACT_QUERY);
};

export const EDIT_PHONE_QUERY = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!,
    $new_phone_number:String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns,
      _set: {number: $new_phone_number}
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

export type EditPhonePayloadTypes = {
  pk_columns: {
    number: string;
    contact_id: number;
  };
  new_phone_number: string;
}

export const editPhoneNumber = () => {
  return mutation<any, EditPhonePayloadTypes>(EDIT_PHONE_QUERY);
};

export const ADD_PHONE_QUERY = gql`
  mutation AddNumberToContact(
    $contact_id: Int!,
    $phone_number:String!
  ) {
    insert_phone(
      objects: {
        contact_id: $contact_id,
        number: $phone_number
      }
    ) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

export type AddPhonePayloadTypes = {
  contact_id: number;
  phone_number: string;
}

export const addPhoneNumber = () => {
  return mutation<any, AddPhonePayloadTypes>(ADD_PHONE_QUERY);
};

export const DELETE_CONTACT_QUERY = gql`
  mutation MyMutation(
    $id: Int!
  ) {
    delete_contact_by_pk(
      id: $id
    ) {
      first_name
      last_name
      id
    }
  }
`;

export const deleteContact = () => {
  return mutation<any, { id: number }>(DELETE_CONTACT_QUERY);
};
