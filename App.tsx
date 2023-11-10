import 'react-native-gesture-handler'
import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { API_TOKEN } from '@env'
import { hasSubscription } from '@jumpn/utils-graphql'
import { NavigationContainer } from '@react-navigation/native'
import { split } from 'apollo-link'
import { StatusBar } from 'expo-status-bar'
import { Socket as PhoenixSocket } from 'phoenix'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { ChatNavigator } from './src/navigators/ChatNavigator'
import { colors } from './src/styles/colors'

export default function App() {
  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: 'https://chat.thewidlarzgroup.com/api/graphql',
  })
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : '',
      },
    }
  })
  const authedHttpLink = authLink.concat(httpLink)

  // Socket connection to the API
  const phoenixSocket = new PhoenixSocket(
    'wss://chat.thewidlarzgroup.com/socket',
    {
      params: () => {
        return { token: API_TOKEN ? API_TOKEN : '' }
      },
    },
  )
  const absintheSocket = AbsintheSocket.create(phoenixSocket)
  const websocketLink = createAbsintheSocketLink(absintheSocket)
  const cache = new InMemoryCache()
  const link = split(
    operation => hasSubscription(operation.query),
    websocketLink,
    authedHttpLink,
  )
  const client = new ApolloClient({
    link,
    cache,
  })

  return (
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <ChatNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
})
