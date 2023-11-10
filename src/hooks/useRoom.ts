import { useQuery } from '@apollo/client'

import { GET_ROOM } from '../graphql/queries'

export const useRoom = (roomId: string) => {
  return useQuery(GET_ROOM, {
    variables: {
      roomId,
    },
  })
}
