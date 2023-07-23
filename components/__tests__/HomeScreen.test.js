
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

jest.mock('../Api', () => ({
  __esModule: true,
  default: () => <></>, 
}));

jest.mock('../Location', () => {
  const MockLocationNotification = () => <></>; 
  return MockLocationNotification;
});

describe('HomeScreen', () => {
  test('renders welcome message', () => {
    const { getByText } = render(<HomeScreen />);
    const welcomeMessage = getByText('Welcome to Currency Exchange');
    expect(welcomeMessage).toBeTruthy();
  });

  test('renders the image', () => {
    const { getByTestId } = render(<HomeScreen />);
    const image = getByTestId('homescreenimage');
    expect(image).toBeTruthy();
  });
})
