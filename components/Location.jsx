import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const LocationNotification = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userCountry, setUserCountry] = useState(null);

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Location permission denied');
                    return;
                }

                const locationData = await Location.getCurrentPositionAsync();
                setLocation(locationData);

                const addressResponse = await Location.reverseGeocodeAsync({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                });

                // Assuming the country name is at the first index in addressResponse
                const country = addressResponse.length > 0 ? addressResponse[0].country : 'Unknown';
                setUserCountry(country);
            } catch (error) {
                setErrorMsg('Error getting user location');
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <View style={styles.container}>
            {location ? (
                <>
                    <Text style={styles.title}>User Location</Text>
                    <Text style={styles.locationText}>Latitude: {location.coords.latitude}</Text>
                    <Text style={styles.locationText}>Longitude: {location.coords.longitude}</Text>
                    <Text style={styles.locationText}>Country: {userCountry}</Text>
                </>
            ) : (
                <Text style={styles.errorText}>{errorMsg}</Text>
            )}
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
    locationText: {
        fontSize: 18,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default LocationNotification;
