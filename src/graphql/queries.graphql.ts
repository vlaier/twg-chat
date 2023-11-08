import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query getRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;
export const GET_ROOM = gql`
  query getRoom($id: ID!) {
    room(id: $id) {
      name
      user {
        email
        firstName
        lastName
        role
      }
      messages {
        id
        body
        user {
          id
          email
          firstName
          lastName
          role
        }
      }
    }
  }
`;
