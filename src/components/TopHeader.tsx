import { StackHeaderProps } from '@react-navigation/stack'
import { View, StyleSheet, Text } from 'react-native'

import { BackButton } from './BackButton'
import CallIcon from '../../assets/phone.svg'
import ProfileIcon from '../../assets/profile.svg'
import RoomsIcon from '../../assets/rooms.svg'
import SearchIcon from '../../assets/search.svg'
import VideocallIcon from '../../assets/videocall.svg'
import { Routes } from '../navigators/types'
import { colors } from '../styles/colors'

export const TopHeader = (props: StackHeaderProps) => {
  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <View>
          {props.route.name === Routes.ROOMS ? (
            <Text style={styles.headerText}>{props.route.name}</Text>
          ) : (
            <View style={styles.info}>
              <BackButton />
              <ProfileIcon height={44} width={44} />
              <Text style={styles.username}>{props.route.name}</Text>
            </View>
          )}
        </View>
        <View style={styles.iconsContainer}>
          {props.route.name === Routes.ROOMS ? (
            <>
              <SearchIcon />
              <RoomsIcon />
            </>
          ) : (
            <>
              <CallIcon />
              <VideocallIcon />
            </>
          )}
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 76,
    backgroundColor: colors.lightBlue,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: colors.plum,
    fontSize: 28,
    fontWeight: '700',
  },
  iconsContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    color: colors.plum,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    alignSelf: 'flex-start',
  },
  background: {
    backgroundColor: colors.veryLightBlue,
  },
})
