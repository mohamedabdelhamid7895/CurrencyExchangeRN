import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Notification from '../Notification.jsx';
import * as Notifications from 'expo-notifications';

// Mock the expo-notifications methods
jest.mock('expo-notifications', () => ({
    ...jest.requireActual('expo-notifications'),
    scheduleNotificationAsync: jest.fn(() => Promise.resolve()),
    getExpoPushTokenAsync: jest.fn(() => Promise.resolve({ data: 'mocked-token' })),
    getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
}));

describe('Notification', () => {
    it('renders without errors', () => {
        const { getByText } = render(<Notification />);
        const pushTokenText = getByText('Your expo push token:');
        const button = getByText('Press to schedule a notification');

        expect(pushTokenText).toBeTruthy();
        expect(button).toBeTruthy();
    });

    it('displays the expo push token', async () => {
        const { getByText } = render(<Notification />);
        const pushTokenText = getByText('Your expo push token:');

        await waitFor(() => {
            expect(pushTokenText.props.children).toContain('mocked-token');
        });
    });

    it('schedules a notification when the button is pressed', async () => {
        const { getByText } = render(<Notification />);
        const button = getByText('Press to schedule a notification');

        fireEvent.press(button);

        await waitFor(() => {
            expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
        });
    });

    it('displays the notification data after scheduling', async () => {
        const { getByText } = render(<Notification />);
        const button = getByText('Press to schedule a notification');

        fireEvent.press(button);

        await waitFor(() => {
            const titleText = getByText('Title:');
            const bodyText = getByText('Body:');
            const dataText = getByText('Data:');
            expect(titleText.props.children).toContain('first title');
            expect(bodyText.props.children).toContain('my  notification body');
            expect(dataText.props.children).toContain('{"data":"hello"}');
        });
    });
});
