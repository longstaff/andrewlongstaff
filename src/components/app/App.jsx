import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import AppReducer from './appReducer';
import Monitor from '../monitor/Monitor';

const store = createStore(AppReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Monitor />
    </Provider>
  );
};

export default App;
