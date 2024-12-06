// src/navigation/AuthStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AppNavigator from './AppNavigator'; // Import the Drawer Navigator

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={AppNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthStack;
