import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import store from './src/screens/store';
import App from './App';
import { name as appName } from './app.json';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
