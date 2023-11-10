import { useMutation } from '@apollo/client'
import { TYPING_USER } from '../graphql/queries'

export const useTypingUser = (roomId: string) => {
  return useMutation(TYPING_USER, {
    variables: {
      roomId,
    },
  })
}
