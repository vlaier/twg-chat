import { Text, StyleSheet, View } from 'react-native'

import { Room } from '../components/Room'
import { useUsersRooms } from '../hooks/useUsersRooms'
import { colors } from '../styles/colors'

export const Rooms = () => {
  const { data, loading } = useUsersRooms()
  if (loading) return <Text>Loading...</Text>
  const ids = data?.usersRooms?.rooms?.map(room => room?.id)

  return (
    <View style={styles.container}>
      {ids?.map(id => {
        if (typeof id !== 'string') return null
        return <Room id={id} />
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightBlue,
    flex: 1,
    gap: 8,
    height: '100%',
    width: '100%',
  },
})
