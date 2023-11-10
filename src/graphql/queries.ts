import { graphql } from '../gql'

// eslint-disable-next-line
const CORE_MESSAGE_FIELDS = graphql(`
  fragment CoreMessageFields on Message {
    id
    body
    insertedAt
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
`)
export const GET_USERS_ROOMS = graphql(`
  query getRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`)
export const GET_ROOM = graphql(`
  query getRoom($roomId: ID!) {
    room(id: $roomId) {
      name
      id
      user {
        id
        email
        firstName
        lastName
        role
      }
      messages {
        id
        body
        insertedAt
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
`)

export const MESSAGES_SUBSCRIPTION = graphql(`
  subscription onMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      ...CoreMessageFields
    }
  }
`)

export const SEND_MESSAGE = graphql(`
  mutation onMessageSend($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
      id
    }
  }
`)

export const TYPING_USER = graphql(`
  mutation onTypingUser($roomId: String!) {
    typingUser(roomId: $roomId) {
      email
      firstName
      id
      lastName
      role
    }
  }
`)

export const TYPING_SUBSCRIPTION = graphql(`
  subscription onTypingSubscription($roomId: String!) {
    typingUser(roomId: $roomId) {
      id
    }
  }
`)
