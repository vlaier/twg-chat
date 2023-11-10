import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

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
  const lastMessage =
    data?.room?.messages && data.room.messages[data.room.messages.length - 1]

  return (
    <TouchableOpacity style={styles.room} onPress={handlePress}>
      {loading ? <Text>Loading...</Text> : <Text>TEST</Text>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  room: {
    width: '100%',
    height: 88,
    backgroundColor: colors.plum,
    borderRadius: 12,
  },
})
