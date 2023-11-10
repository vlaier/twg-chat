import { StackScreenProps } from '@react-navigation/stack'
import { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

import { CoreMessageFieldsFragment } from '../gql/graphql'
import { useRoom } from '../hooks/useRoom'
import { useSendMessage } from '../hooks/useSendMessage'
import { RootStackParamList, Routes } from '../navigators/types'

const convertToGiftedMessages = (messages: CoreMessageFieldsFragment[]) => {
  const giftedMessages: IMessage[] = messages.map(message => {
    return {
      _id: message.id || '',
      text: message.body || '',
      createdAt: new Date(message.insertedAt || '') || new Date(),
      user: {
        _id: message.user?.id! || '',
        name: message.user?.firstName! || '',
      },
    }
  })
  return giftedMessages
}
export const Chat = (
  props: StackScreenProps<RootStackParamList, Routes.CHAT>,
) => {
  const roomId = props.route.params.roomId
  const { data, loading } = useRoom(roomId)
  const [sendMessage] = useSendMessage()
  const handleSend = useCallback(async (messages: IMessage[]) => {
    await sendMessage({
      variables: {
        body: messages[0].text,
        roomId,
      },
    })
  }, [])
  if (loading) return <Text>Loading...</Text>
  const messages = data?.room?.messages! as CoreMessageFieldsFragment[]
  const giftedChatMessages = convertToGiftedMessages(messages)

  const userId = data?.room?.user?.id!

  return (
    <View style={styles.chatContainer}>
      <Text>CHAT: {data?.room?.name}</Text>
      <Text>{giftedChatMessages.length}</Text>
      <GiftedChat
        messages={giftedChatMessages}
        onSend={messages => handleSend(messages)}
        user={{
          _id: userId,
        }}
        keyboardShouldPersistTaps="never"
        isTyping={() => {}}
        inp
        on
      />
    </View>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
})
