import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';

const API_KEY = '29d0cf9d8c712b356521f578ac4ca21b';


const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const subtractTimeframeFromDate = (timeframe, date) => {
  const newDate = new Date(date);
  switch (timeframe) {
    case '1M':
      newDate.setMonth(newDate.getMonth() - 1);
      break;
    case '3M':
      newDate.setMonth(newDate.getMonth() - 3);
      break;
    case '1Y':
      newDate.setFullYear(newDate.getFullYear() - 1);
      break;
    case '5Y':
      newDate.setFullYear(newDate.getFullYear() - 5);
      break;
    default:
      break;
  }
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CurrencyChartScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState();
  const [targetCurrency, setTargetCurrency] = useState();
  const [chartData, setChartData] = useState([]);
  const [chartTimeframe, setChartTimeframe] = useState();
  const currentDate = getCurrentDate();

  useEffect(() => {
    fetchChartData();
  }, [baseCurrency, targetCurrency, chartTimeframe]);

  const fetchChartData = async () => {
    try {
      const startDate = subtractTimeframeFromDate(chartTimeframe, currentDate);
      const response = await fetch(
        `http://data.fixer.io/api/${startDate}?access_key=${API_KEY}&base=${baseCurrency}&symbols=${targetCurrency}`
      );
      const data = await response.json();

      if (data.success) {
        const { rates } = data;
        const chartData = Object.keys(rates).map((currency) => ({
          x: new Date(data.date),
          y: rates[currency],
        }));
        console.log(chartData);
        setChartData(chartData);
      } else {
        console.log('Error fetching chart data:', data.error);
      }
    } catch (error) {
      console.log('Error fetching chart data:', error);
    }
  };




  const handleTimeframeChange = (timeframe) => {
    setChartTimeframe(timeframe);
  };

  const renderDropdownItem = ({ item }) => {
    const isBaseSelected = baseCurrency === item;
    const isTargetSelected = targetCurrency === item;

    return (
      <TouchableOpacity
        style={[
          styles.dropdownItem,
          isBaseSelected && styles.selectedDropdownItem,
          isTargetSelected && styles.selectedDropdownItem,
          isBaseSelected && isTargetSelected && styles.disabledDropdownItem,
        ]}
        onPress={() => {
          if (isBaseSelected && isTargetSelected) {
            setBaseCurrency('');
            setTargetCurrency('');
          } else if (isBaseSelected) {
            setBaseCurrency('');
          } else if (isTargetSelected) {
            setTargetCurrency('');
          } else if (!baseCurrency) {
            setBaseCurrency(item);
          } else if (!targetCurrency) {
            setTargetCurrency(item);
          }
        }}
      >
        <Text style={[styles.dropdownLabel, (isBaseSelected || isTargetSelected) && styles.selectedDropdownLabel]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Base Currency:</Text>
        <FlatList
          data={['EUR', 'USD', 'GBP']}
          renderItem={renderDropdownItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dropdownList}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Target Currency:</Text>
        <FlatList
          data={['USD', 'GBP', 'EUR']}
          renderItem={renderDropdownItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dropdownList}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Text style={styles.label}>Timeframe:</Text>
        <TouchableOpacity
          style={[styles.button, chartTimeframe === '1D' && styles.selectedButton]}
          onPress={() => handleTimeframeChange('1D')}
        >
          <Text style={styles.buttonText}>1D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, chartTimeframe === '1M' && styles.selectedButton]}
          onPress={() => handleTimeframeChange('1M')}
        >
          <Text style={styles.buttonText}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, chartTimeframe === '3M' && styles.selectedButton]}
          onPress={() => handleTimeframeChange('3M')}
        >
          <Text style={styles.buttonText}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, chartTimeframe === '1Y' && styles.selectedButton]}
          onPress={() => handleTimeframeChange('1Y')}
        >
          <Text style={styles.buttonText}>1Y</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, chartTimeframe === '5Y' && styles.selectedButton]}
          onPress={() => handleTimeframeChange('5Y')}
        >
          <Text style={styles.buttonText}>5Y</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {chartData.length > 0 ? (
          <VictoryChart theme={VictoryTheme.grayscale} width={300} height={500}>
            <VictoryAxis
              key="xa"
              dependentAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tickFormat={(tick) => `${tick}`} 
            />
            <VictoryAxis
              key="ya"
              tickValues={['24H', '12M', '1YEAR', '5years']}
              tickFormat={(tick) => `${tick}`}
            />

            <VictoryLine
              data={chartData}
              x="x"
              y="y"
              style={{
                data: { stroke: 'blue' },
              }}
            />

            <VictoryScatter
              data={chartData}
              x="x"
              y="y2" 
              size={0.8}
              style={{
                data: { fill: 'red' }
              }}
            />
          </VictoryChart>
        ) : (
          <Text key="no-data">No data available</Text>
        )}
      </View>

    {/* <View style={styles.chartContainer}>
  {chartData.length > 0 ? (
    <LineChart
      data={{
        labels: chartData.map((dataPoint) => dataPoint.x),
        datasets: [
          {
            data: chartData
              .filter((dataPoint) => dataPoint.currency === baseCurrency)
              .map((dataPoint) => dataPoint.y),
            color: (opacity = 1) => `rgba(0, 102, 255, ${opacity})`, // Blue color with full opacity
            withDots: false,
          },
          {
            data: chartData
              .filter((dataPoint) => dataPoint.currency === targetCurrency)
              .map((dataPoint) => dataPoint.y),
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color with full opacity
            withDots: false,
          },
        ],
      }}
      width={300}
      height={400}
      yAxisInterval={1}
      yAxisSuffix="€"
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLines={false}
      withHorizontalLines={false}
      chartConfig={{
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color with full opacity
      }}
    />
  ) : (
    <Text>No data available</Text>
  )}
</View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdownList: {
    alignItems: 'flex-start',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedDropdownItem: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  disabledDropdownItem: {
    opacity: 0.1, 
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#000000',
  },
  selectedDropdownLabel: {
    color: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#CCCCCC',
  },
  selectedButton: {
    backgroundColor: '#0066FF',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
});

export default CurrencyChartScreen;
