import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter} from 'react-router-native';
import {ApolloProvider} from '@apollo/react-hooks';
import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
  return (<NativeRouter>
<ApolloProvider client={apolloClient}>
  <Main/>
</ApolloProvider>  
  </NativeRouter>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
