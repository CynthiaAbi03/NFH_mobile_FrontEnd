import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DashboardScreen from './src/screens/DashBoardScreen/DashBoardScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ path: '/' }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          initialParams={{ path: '/Dashboard' }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </SafeAreaProvider>
   
      
  );
}

export default App;
