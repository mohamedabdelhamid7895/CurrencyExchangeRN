import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Notification from '../Notification';

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications Screen</Text>
            <Image
                source={require('../../assets/notification-cute.png')} 
                style={styles.image}
                resizeMode="contain"
            />
            <Notification />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
});

export default NotificationsScreen;
