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
