import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StatusBar,
  SafeAreaView,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';

const Stack = createStackNavigator();

class App extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
