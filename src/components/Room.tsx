import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatDistance, subMinutes } from 'date-fns'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Profile from '../../assets/profile.svg'
import { useMessagesSubscription } from '../hooks/useMessagesSubscription'
import { useRoom } from '../hooks/useRoom'
import { RootStackParamList, Routes } from '../navigators/types'
import { colors } from '../styles/colors'

type RoomProps = {
  id: string
}
export const Room = (props: RoomProps) => {
  const { data, loading } = useRoom(props.id)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  useMessagesSubscription(props.id)

  const handlePress = () => {
    if (data?.room?.id)
      navigation.push(Routes.CHAT, {
        roomId: data?.room?.id,
      })
  }
  const lastMessage = data?.room?.messages && data.room.messages[0]

  const timeSinceLastMessage = lastMessage?.insertedAt
    ? formatDistance(
        subMinutes(new Date(lastMessage?.insertedAt), 0),
        new Date(),
      )
    : ''

  return (
    <TouchableOpacity style={styles.room} onPress={handlePress}>
      <View style={styles.internalContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Profile />
            <View style={styles.textContainer}>
              <Text
                style={styles.roomHeader}
                numberOfLines={1}
                ellipsizeMode="tail">
                {data?.room?.name}
              </Text>
              <Text
                style={styles.roomText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {lastMessage?.body}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeSinceLastMessage}</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  room: {
    width: '100%',
    height: 88,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 37,
    marginBottom: 12,
  },
  internalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    width: 160,
  },
  roomHeader: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  roomText: {
    fontSize: 14,
    fontWeight: '400',
  },
  timeContainer: {
    alignSelf: 'flex-start',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.lightGray,
  },
})
