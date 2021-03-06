import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/App';
import AppReducer from './components/app/appReducer';
import registerServiceWorker from './registerServiceWorker';
import { loadConfig, saveConfig } from './utils/localStorage';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-17825439-1');
ReactGA.pageview('/');

const prevState = loadConfig();
// To fix crash while loading bugs
if (prevState && prevState.monitor) {
  prevState.monitor.loader = false;
}

const hadPrevState = prevState !== undefined;
const middleware = [
  thunk
];

const store = createStore(AppReducer, prevState, applyMiddleware(...middleware));
store.subscribe(() => {
  saveConfig(store.getState());
});

ReactDOM.render(
  <Provider store = {store}>
    <App
      restart = {hadPrevState}
    />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
