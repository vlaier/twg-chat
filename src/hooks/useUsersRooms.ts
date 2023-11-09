import { useQuery } from '@apollo/client'

import { GET_USERS_ROOMS } from '../graphql/queries'

export const useUsersRooms = () => {
  return useQuery(GET_USERS_ROOMS)
}
