import { GET_ROOM } from '../graphql/queries.graphql';
import { useQuery } from '@apollo/client';

export const useRoom = (id: string) => {
  return useQuery(GET_ROOM, {
    variables: {
      id,
    },
  });
};
