import { useSubscription } from '@apollo/client'
import { TYPING_SUBSCRIPTION } from '../graphql/queries'

export const useTypingSubscription = (roomId: string) => {
  return useSubscription(TYPING_SUBSCRIPTION, {
    variables: { roomId },
  })
}
