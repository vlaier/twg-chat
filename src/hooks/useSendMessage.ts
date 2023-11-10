import { useMutation } from '@apollo/client'

import { SEND_MESSAGE } from '../graphql/queries'

export const useSendMessage = () => {
  return useMutation(SEND_MESSAGE)
}
