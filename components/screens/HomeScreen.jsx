import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import CurrencyExchangeScreen from '../Api';
import LocationNotification from '../Location';
const HomeScreen = () => {
    return (
<ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Currency Exchange</Text>
        <Image
          source={require('../../assets/Homee.png')}
          style={styles.image}
          resizeMode="cover"
          testID="homescreenimage"
        />
        <LocationNotification testID="locationnotification" />
        <View style={styles.currencyExchangeContainer}>
            <CurrencyExchangeScreen testID="currencyscreen" />
        </View>
      </View>
    </ScrollView>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 350,
        height: 200,
        marginBottom: 30,
    },
    currencyExchangeContainer: {
        flex: 1,
        width: '100%',
    },
});

export default HomeScreen;
