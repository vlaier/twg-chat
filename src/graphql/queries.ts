import { graphql } from '../gql';

export const GET_USERS_ROOMS = graphql(`
  query getRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`);
export const GET_ROOM = graphql(`
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
`);
