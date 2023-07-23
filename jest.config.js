module.exports = {
    preset: 'jest-expo',
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};