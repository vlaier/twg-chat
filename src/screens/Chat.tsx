import { StackScreenProps } from '@react-navigation/stack'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import debounce from 'lodash.debounce'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

import { CoreMessageFieldsFragment } from '../gql/graphql'
import { useRoom } from '../hooks/useRoom'
import { useSendMessage } from '../hooks/useSendMessage'
import { RootStackParamList, Routes } from '../navigators/types'
import { useTypingUser } from '../hooks/useTypingUser'
import { useTypingSubscription } from '../hooks/useTypingSubscription'

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
  const [userTyping] = useTypingUser(roomId)
  const { data: typingData } = useTypingSubscription(roomId)
  const timerRef = useRef<null | NodeJS.Timeout>(null)
  const [isTyping, setIsTyping] = useState(false)
  const userId = data?.room?.user?.id
  useEffect(() => {
    if (
      typingData &&
      typingData.typingUser?.id !== userId &&
      !timerRef.current
    ) {
      setIsTyping(true)
      timerRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = null
    }
  }, [typingData])
  const handleSend = useCallback((messages: IMessage[]) => {
    sendMessage({
      variables: {
        body: messages[0].text,
        roomId,
      },
    })
  }, [])

  const messages = data?.room?.messages! as CoreMessageFieldsFragment[]
  const giftedChatMessages = convertToGiftedMessages(messages)
  const handleTextChange = (text: string) => {
    userTyping({
      variables: {
        roomId,
      },
    })
  }
  const debouncedTextChangeHandler = useMemo(
    () => debounce(handleTextChange, 300),
    [],
  )

  if (loading) return <Text>Loading...</Text>
  return (
    <View style={styles.chatContainer}>
      <Text>CHAT: {data?.room?.name}</Text>
      <Text>{giftedChatMessages.length}</Text>
      <GiftedChat
        messages={giftedChatMessages}
        onSend={messages => handleSend(messages)}
        user={{
          _id: userId || '',
        }}
        keyboardShouldPersistTaps="never"
        isTyping={isTyping}
        onInputTextChanged={debouncedTextChangeHandler}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
})
