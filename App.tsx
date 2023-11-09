import 'react-native-gesture-handler';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_TOKEN } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ChatNavigator } from './src/navigators/ChatNavigator';
import { colors } from './src/styles/colors';

export default function App() {
  const httpLink = createHttpLink({
    uri: 'https://chat.thewidlarzgroup.com/api/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : '',
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
});
