import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Main } from './navigation/Main';
import store from './redux';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}
