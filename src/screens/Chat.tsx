import { StackScreenProps } from '@react-navigation/stack'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat'
import TypingIndicator from 'react-native-gifted-chat/lib/TypingIndicator'

import ProfileIcon from '../../assets/profile.svg'
import SendIcon from '../../assets/send.svg'
import { CoreMessageFieldsFragment } from '../gql/graphql'
import { useRoom } from '../hooks/useRoom'
import { useSendMessage } from '../hooks/useSendMessage'
import { useTypingSubscription } from '../hooks/useTypingSubscription'
import { useTypingUser } from '../hooks/useTypingUser'
import { RootStackParamList, Routes } from '../navigators/types'
import { colors } from '../styles/colors'

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
  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.chatInputContainer}
        renderComposer={renderComposer}
        renderSend={renderSend}
      />
    )
  }
  const renderComposer = (props: ComposerProps) => {
    return (
      <Composer {...props} textInputStyle={styles.chatInput} placeholder="" />
    )
  }
  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props} containerStyle={styles.sendButton} alwaysShowSend>
        <SendIcon />
      </Send>
    )
  }
  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        renderTime={() => null}
        containerStyle={{
          left: bubbleStyles.left.container,
          right: bubbleStyles.left.container,
        }}
        wrapperStyle={{
          left: bubbleStyles.left.wrapper,
          right: bubbleStyles.right.wrapper,
        }}
        textStyle={{
          left: bubbleStyles.left.text,
          right: bubbleStyles.right.text,
        }}
      />
    )
  }
  const renderFooter = () => {
    if (isTyping)
      return (
        <View style={styles.typingIndicator}>
          <ProfileIcon height={24} width={24} style={{ marginBottom: 12 }} />
          <TypingIndicator isTyping={isTyping} />
        </View>
      )
    return null
  }

  if (loading) return <Text>Loading...</Text>
  return (
    <View style={styles.chatContainer}>
      <GiftedChat
        renderDay={() => null}
        showAvatarForEveryMessage
        renderAvatar={() => null}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        messages={giftedChatMessages}
        onSend={messages => handleSend(messages)}
        user={{
          _id: userId || '',
        }}
        keyboardShouldPersistTaps="never"
        onInputTextChanged={debouncedTextChangeHandler}
        minInputToolbarHeight={102}
        renderFooter={renderFooter}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: colors.veryLightBlue,
  },
  chatInputContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 102,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  chatInput: {
    borderRadius: 12,
    borderBottomRightRadius: 0,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: colors.white,
    flex: 1,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  sendButton: {
    width: 44,
    height: 44,
    color: colors.white,
    marginLeft: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 24,
    alignItems: 'flex-end',
    gap: 12,
  },
})
const bubbleStyles = {
  left: StyleSheet.create({
    container: {
      marginVertical: 6,
      paddingLeft: 52,
    },
    wrapper: {
      width: 245,

      borderRadius: 12,
      borderBottomLeftRadius: 0,
      backgroundColor: colors.white,
      padding: 12,
    },
    text: {
      color: colors.black,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 20,
    },
  }),
  right: StyleSheet.create({
    wrapper: {
      borderRadius: 12,
      borderBottomRightRadius: 0,
      backgroundColor: colors.lightPlum,
      padding: 12,
    },
    text: {
      color: colors.white,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 20,
    },
  }),
}
