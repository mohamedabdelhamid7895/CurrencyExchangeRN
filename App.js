import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrencyChartScreen from './components/screens/ChartScreen'; 
import HomeScreen from './components/screens/HomeScreen'; 
import NotificationsScreen from './components/screens/NotificationScreen';
import { FontAwesome } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Chart"
          component={CurrencyChartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="line-chart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
