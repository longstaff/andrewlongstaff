import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AppReducer from './appReducer';
import Monitor from '../monitor/Monitor';
import { createStore } from 'redux';

let store = createStore(AppReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Monitor/>
      </Provider>
    );
  }
}

export default App;
