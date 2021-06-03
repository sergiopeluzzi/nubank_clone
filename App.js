import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home'

const Stack = createStackNavigator();

function App() {
  return (
    <Home></Home>
    
    /*
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={
          {
            title: 'nuBank',
            headerStyle: {
              backgroundColor: '#8B10AE'
            },
            headerTitleStyle: {
              color: '#fff'
            }
          }
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  */
  
  );
  
}

export default App;