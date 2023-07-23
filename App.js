// import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// // import LocationComponent from './Location';

// // import CurrencyExchangeScreen from './Api';
// // import CurrencyChart from './Chart';
// import { registerForPushNotificationsAsync } from './Notification'; // Create this file later

// export default function App() {
//   useEffect(() => {
//     // Request permission on app startup
//     registerForPushNotificationsAsync();
//   }, []);
//   return (
//     <ScrollView>

//     <View style={styles.container}>
//       {/* <LocationComponent /> */}
//         {/* <CurrencyExchangeScreen/> */}
//         {/* <CurrencyChart/> */}

//       <StatusBar style="auto" />
//     </View>
//     </ScrollView>
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





// import { LineChart } from "react-native-gifted-charts";
// export default function App (){
//   const lineData = [
//     { value: 0, dataPointText: '0' },
//     { value: 10, dataPointText: '10' },
//     { value: 8, dataPointText: '8' },
//     { value: 58, dataPointText: '58' },
//     { value: 56, dataPointText: '56' },
//     { value: 78, dataPointText: '78' },
//     { value: 74, dataPointText: '74' },
//     { value: 98, dataPointText: '98' },
//   ];

//   const lineData2 = [
//     { value: 0, dataPointText: '0' },
//     { value: 20, dataPointText: '20' },
//     { value: 18, dataPointText: '18' },
//     { value: 40, dataPointText: '40' },
//     { value: 36, dataPointText: '36' },
//     { value: 60, dataPointText: '60' },
//     { value: 54, dataPointText: '54' },
//     { value: 85, dataPointText: '85' },
//   ];
//   return (
//     <View>
//       <LineChart
//         data={lineData}
//         data2={lineData2}
//         height={250}
//         showVerticalLines
//         spacing={44}
//         initialSpacing={0}
//         color1="skyblue"
//         color2="orange"
//         textColor1="green"
//         dataPointsHeight={6}
//         dataPointsWidth={6}
//         dataPointsColor1="blue"
//         dataPointsColor2="red"
//         textShiftY={-2}
//         textShiftX={-5}
//         textFontSize={13}
//       />
//     </View>
//   );
// };



// import { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


// // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
//   console.log(message)
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }

//     const projectId = 'ab921e2f-f07e-493a-bd08-65022c74396a';
//     token = (await Notifications.getExpoPushTokenAsync(projectId)).data;


//     console.log(token);
//     //  token = await expo.push.getPushTokenAsync(projectId);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// };



// import { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }



// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title}</Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button title="Press to schedule a notification" onPress={async () => await schedulePushNotification()} />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 1 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync('ab921e2f-f07e-493a-bd08-65022c74396a')).data;
//     console.log(token);
//   } else {
//     alert('Must use a physical device for Push Notifications');
//   }

//   return token;
// }





// import React from 'react';
// import { View, Text } from 'react-native';
// // import Notification from './components/Notification';
// import CurrencyExchangeScreen from './components/screens/Api';
// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>My App</Text>
//       <CurrencyExchangeScreen />
//     </View>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrencyChartScreen from './components/screens/ChartScreen'; // Import the CurrencyExchangeScreen component
import HomeScreen from './components/screens/HomeScreen'; // Import the HomeScreen component
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
