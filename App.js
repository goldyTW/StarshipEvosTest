// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import InfiniteScrollScreen from './Screen/InfiniteScrollScreen';
const App = createSwitchNavigator(
  {
    InfiniteScrollScreen: {
      screen:InfiniteScrollScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  }

);

export default createAppContainer(App);