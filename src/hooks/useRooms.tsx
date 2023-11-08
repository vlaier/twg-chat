import { useQuery } from '@apollo/client';

import { GET_ROOMS } from '../graphql/queries.graphql';

export const useRooms = () => {
  return useQuery(GET_ROOMS);
};
