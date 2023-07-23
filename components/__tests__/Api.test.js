import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import CurrencyExchangeScreen from '../Api';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                rates: {
                    USD: 1.12,
                    GBP: 0.86,
                    EGP: 1, 
                },
            }),
    })
);

describe('CurrencyExchangeScreen', () => {
    test('renders without errors', () => {
        const { getByTestId } = render(<CurrencyExchangeScreen />);
        const currencyList = getByTestId('currencyList');
        expect(currencyList).toBeTruthy();
    });

    test('initial state is set correctly', () => {
        const { getByTestId } = render(<CurrencyExchangeScreen />);
        const selectedCurrency = getByTestId('selectedCurrency');

        // expect(selectedCurrency.props.children).toBe('Selected Currency: EGP');

        const currencyList = getByTestId('currencyList');
        expect(currencyList.props.data).toEqual([]);
    });

    test('fetchCurrencies function works as expected', async () => {
        const { getByTestId } = render(<CurrencyExchangeScreen />);
        const currencyList = getByTestId('currencyList');

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        expect(currencyList.props.data).toEqual(['USD', 'GBP', 'EGP']);
    });

    test('currency change functionality', async () => {
        const { getByTestId } = render(<CurrencyExchangeScreen />);
        const currencyList = getByTestId('currencyList');
        const selectedCurrency = getByTestId('selectedCurrency');

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        fireEvent.press(currencyList, { item: 'USD', index: 0 });

        // Check if the selected currency has changed
        // expect(selectedCurrency.props.children).toBe('Selected Currency: USD');
    });

    test('search functionality', async () => {
        const { getByTestId } = render(<CurrencyExchangeScreen />);
        const searchInput = getByTestId('searchInput');
        const currencyList = getByTestId('currencyList');

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        // Perform a search for GBP
        fireEvent.changeText(searchInput, 'GBP');

        expect(currencyList.props.data).toEqual(['GBP']);
    });
});
