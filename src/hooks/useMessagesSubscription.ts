import { useEffect } from 'react'

import { useRoom } from './useRoom'
import { MESSAGES_SUBSCRIPTION } from '../graphql/queries'

export const useMessagesSubscription = (roomId: string) => {
  const { subscribeToMore, loading } = useRoom(roomId)
  return useEffect(() => {
    !loading &&
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newMessage = subscriptionData.data.messageAdded
          const oldMessages = prev.room?.messages || []
          return Object.assign({}, prev, {
            room: {
              ...prev.room,
              messages: [newMessage, ...oldMessages],
            },
          })
        },
        onError: err => console.error(err),
      })
    return () => {}
  }, [subscribeToMore, loading])
}
