import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';

const API_KEY = '29d0cf9d8c712b356521f578ac4ca21b';
const BASE_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=EUR`;

const CurrencyExchangeScreen = () => {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('EGP');
    const [exchangeRates, setExchangeRates] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
            const rates = data.rates;
            const currencyList = Object.keys(rates);
            setCurrencies(currencyList);
            setSelectedCurrency(currencyList[0]);
            setExchangeRates(rates);
        } catch (error) {
            console.log('Currency exchange error:', error);
        }
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const filteredCurrencies = currencies.filter((currency) =>
        currency.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 === 0 ? '#F8F8F8' : '#FFFFFF';

        return (
            <View style={[styles.dropdownMenuItem, { backgroundColor }]}>
                <Text style={styles.dropdownMenuItemText}>{item}</Text>
                <Text style={styles.exchangeRateText}>
                    {item}: {exchangeRates[item] / exchangeRates['EGP']}
                </Text>
            </View>
        );
    };

    const handleLoadMore = () => {
        if (filteredCurrencies.length >= currencies.length) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Select Currency:(Base EGP)</Text>
                <View style={styles.dropdown}>
                    <View style={styles.dropdownMenu}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Currency..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                            testID="searchInput"

                        />
                        <FlatList
                            data={filteredCurrencies}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={styles.listContainer}
                            ListFooterComponent={isLoading && <ActivityIndicator />}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.1}
                            testID="currencyList"
                        />
                    </View>
                </View>
            </View>
            <Text testID="selectedCurrency">Selected Currency: {selectedCurrency}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F4F4',
        width:'90%',
        alignSelf:'center',
        marginTop:20,
        borderTopLeftRadius :30 ,
        marginBottom:20,
    },
    dropdownContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dropdown: {
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    dropdownInput: {
        height: 40,
        paddingHorizontal: 12,
    },
    dropdownMenu: {
        marginTop: 4,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 12,
    },
    dropdownMenuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownMenuItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    exchangeRateText: {
        fontSize: 14,
        color: 'gray',
    },
    listContainer: {
        flexGrow: 1,
    },
});

export default CurrencyExchangeScreen;