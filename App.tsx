import React from 'react';
import { Provider } from 'react-redux';
import store from './src/screens/store'; 
import ShoppingScreen from './src/screens/ShoppingScreen';

const App = () => (
  <Provider store={store}>
    <ShoppingScreen />
  </Provider>
);

export default App;
