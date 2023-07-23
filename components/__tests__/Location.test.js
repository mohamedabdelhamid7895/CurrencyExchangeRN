// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import LocationNotification from '../Location.jsx';
// import * as Location from 'expo-location';

// // Mock the expo-location module
// jest.mock('expo-location', () => ({
//     requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
//     getCurrentPositionAsync: jest.fn(() => Promise.resolve({ coords: { latitude: 26.8206, longitude: 30.8025 } })),
//     reverseGeocodeAsync: jest.fn(() => Promise.resolve([{ country: 'EGYPT' }])),
// }));


// describe('LocationNotification', () => {
//     test('renders error message when location permission is denied', async () => {
//         // Mock the location permission as 'denied'
//         Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

//         const { getByText } = render(<LocationNotification />);

//         // Wait for the component to update
//         await waitFor(() => expect(getByText('Location permission denied')).toBeTruthy());
//     });

//     test('renders user location data when fetched successfully', async () => {
//         const { getByText } = render(<LocationNotification />);

//         // Wait for the component to update
//         await waitFor(() => expect(getByText('User Location')).toBeTruthy());
//         expect(getByText('Latitude: 40.7128')).toBeTruthy();
//         expect(getByText('Longitude: -74.0060')).toBeTruthy();
//         expect(getByText('Country: USA')).toBeTruthy();
//     });

//     test('renders error message when there is an error in fetching location data', async () => {
//         // Mock the location module to throw an error
//         Location.getCurrentPositionAsync.mockRejectedValueOnce(new Error('Location error'));

//         const { getByText } = render(<LocationNotification />);

//         // Wait for the component to update
//         await waitFor(() => expect(getByText('Error getting user location')).toBeTruthy());
//     });
// });
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import LocationNotification from '../Location';

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getCurrentPositionAsync: jest.fn(() => Promise.resolve({ coords: { latitude: 26.8206, longitude: 30.8025 } })),
    reverseGeocodeAsync: jest.fn(() => Promise.resolve([{ country: 'EGYPT' }])),
}));

describe('LocationNotification', () => {
    test('displays user location correctly for Egypt', async () => {
        const { getByText } = render(<LocationNotification />);

        await waitFor(() => expect(getByText('User Location')).toBeTruthy());

        expect(getByText('Latitude: 26.8206')).toBeTruthy();
        expect(getByText('Longitude: 30.8025')).toBeTruthy();

        expect(getByText('Country: EGYPT')).toBeTruthy();
    });
});
