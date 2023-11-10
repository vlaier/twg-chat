export enum Routes {
  ROOMS = 'Rooms',
  CHAT = 'Chat',
}
export type RootStackParamList = {
  [Routes.ROOMS]: undefined
  [Routes.CHAT]: { roomId: string }
}
